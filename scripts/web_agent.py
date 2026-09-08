#!/usr/bin/env python3
import sys, io
# Fix Windows console encoding for emoji/unicode output
if sys.stdout.encoding != "utf-8":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

"""
╔══════════════════════════════════════════════════════════════════════╗
║                    ZYPHUEL WEB AGENT v2.0                           ║
║          Universal Website Data Fetcher & News Extractor            ║
║                                                                      ║
║  Features:                                                           ║
║  • Fetches ANY website (static + JavaScript-rendered)                ║
║  • Extracts main article content (removes ads, nav, clutter)         ║
║  • Grabs metadata (title, author, date, description, images)         ║
║  • Headlines mode — extract all news headlines from any page         ║
║  • Link discovery — find all links on a page                        ║
║  • Multi-URL batch processing                                        ║
║  • JSON / Text / CSV output                                          ║
║  • Retry logic with exponential backoff                              ║
║  • Rotating User-Agents to avoid blocks                              ║
║  • Selenium fallback for JS-heavy sites                              ║
╚══════════════════════════════════════════════════════════════════════╝
"""

import sys
import os
import json
import time
import random
import logging
import argparse
import hashlib
import re
from datetime import datetime
from typing import Dict, Optional, List, Any
from urllib.parse import urlparse, urljoin

import requests
from bs4 import BeautifulSoup, Comment
from readability import Document

# ── Logging Setup ───────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s │ %(levelname)-7s │ %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger("WebAgent")

# ── Rotating User-Agent Pool ───────────────────────────────────────
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
]


# ════════════════════════════════════════════════════════════════════
#  CORE WEB AGENT CLASS
# ════════════════════════════════════════════════════════════════════
class WebAgent:
    """
    Universal Web Agent — fetches any website and extracts structured data.

    Modes:
      • article  — extract main article text + metadata (default)
      • headlines — extract all news headlines & links
      • links    — extract all links from the page
      • raw      — return raw cleaned text
    """

    def __init__(
        self,
        use_selenium: bool = False,
        timeout: int = 15,
        retries: int = 3,
        delay: float = 1.0,
        proxy: Optional[str] = None,
    ):
        self.use_selenium = use_selenium
        self.timeout = timeout
        self.retries = retries
        self.delay = delay
        self.proxy = proxy

        # Persistent session with connection pooling
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": random.choice(USER_AGENTS),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9,ur;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
        })

        if proxy:
            self.session.proxies = {"http": proxy, "https": proxy}

    # ── Fetching Methods ───────────────────────────────────────────

    def _fetch_static(self, url: str) -> Optional[str]:
        """Fetch page with requests (fast, lightweight)."""
        for attempt in range(1, self.retries + 1):
            try:
                # Rotate user-agent on each retry
                self.session.headers["User-Agent"] = random.choice(USER_AGENTS)

                response = self.session.get(url, timeout=self.timeout, allow_redirects=True)
                response.raise_for_status()

                # Handle encoding properly
                if response.encoding and response.encoding.lower() != "utf-8":
                    response.encoding = response.apparent_encoding

                content_type = response.headers.get("Content-Type", "")
                if "text/html" not in content_type and "application/xhtml" not in content_type:
                    logger.warning(f"Non-HTML content ({content_type}) from {url}")

                logger.info(f"✅ Fetched [{response.status_code}] {url} ({len(response.text):,} bytes)")
                return response.text

            except requests.exceptions.Timeout:
                logger.warning(f"⏱️  Timeout (attempt {attempt}/{self.retries}): {url}")
            except requests.exceptions.ConnectionError:
                logger.warning(f"🔌 Connection error (attempt {attempt}/{self.retries}): {url}")
            except requests.exceptions.HTTPError as e:
                status = e.response.status_code if e.response else "?"
                logger.warning(f"❌ HTTP {status} (attempt {attempt}/{self.retries}): {url}")
                if status == 403:
                    logger.info("   → 403 Forbidden — will try Selenium fallback")
                    return None  # Skip to Selenium
                if status == 404:
                    logger.error(f"   → 404 Not Found: {url}")
                    return None
            except requests.exceptions.RequestException as e:
                logger.warning(f"⚠️  Request error (attempt {attempt}/{self.retries}): {e}")

            if attempt < self.retries:
                wait = min(2 ** attempt + random.uniform(0, 1), 10)
                logger.info(f"   ⏳ Retrying in {wait:.1f}s...")
                time.sleep(wait)

        return None

    def _fetch_dynamic(self, url: str) -> Optional[str]:
        """Fetch page using headless Chrome (for JS-rendered sites)."""
        try:
            from selenium import webdriver
            from selenium.webdriver.chrome.options import Options
            from selenium.webdriver.chrome.service import Service
            from selenium.common.exceptions import WebDriverException
        except ImportError:
            logger.error("Selenium not installed. Run: pip install selenium")
            return None

        options = Options()
        options.add_argument("--headless=new")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1920,1080")
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_argument(f"--user-agent={random.choice(USER_AGENTS)}")
        options.add_argument("--log-level=3")
        options.add_experimental_option("excludeSwitches", ["enable-automation"])

        driver = None
        try:
            driver = webdriver.Chrome(options=options)
            driver.set_page_load_timeout(self.timeout + 10)
            driver.get(url)

            # Wait for dynamic content to render
            time.sleep(3)

            # Scroll down to trigger lazy-loaded content
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight / 2);")
            time.sleep(1)
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1)

            html = driver.page_source
            logger.info(f"✅ Selenium fetched {url} ({len(html):,} bytes)")
            return html

        except WebDriverException as e:
            logger.error(f"❌ Selenium error: {e}")
            return None
        except Exception as e:
            logger.error(f"❌ Unexpected Selenium error: {e}")
            return None
        finally:
            if driver:
                try:
                    driver.quit()
                except Exception:
                    pass

    def fetch_html(self, url: str) -> Optional[str]:
        """Smart fetch: tries requests first, falls back to Selenium if needed."""
        if not self.use_selenium:
            html = self._fetch_static(url)
            if html:
                # Check if the page is mostly empty (JS-rendered)
                soup = BeautifulSoup(html, "lxml")
                body_text = soup.body.get_text(strip=True) if soup.body else ""
                if len(body_text) < 100:
                    logger.info("📄 Page content too thin — trying Selenium...")
                else:
                    return html

        logger.info("🌐 Using Selenium for dynamic content...")
        return self._fetch_dynamic(url)

    # ── Extraction Methods ─────────────────────────────────────────

    def extract_article(self, html: str, url: str) -> Dict[str, Any]:
        """Extract main article content using readability + BeautifulSoup."""
        if not html:
            return {"url": url, "error": "No HTML content to parse"}

        try:
            doc = Document(html)
            title = doc.short_title()
            article_html = doc.summary()
        except Exception as e:
            logger.warning(f"Readability failed: {e}, falling back to basic extraction")
            title = ""
            article_html = html

        # Parse article content
        article_soup = BeautifulSoup(article_html, "lxml")
        paragraphs = article_soup.find_all(["p", "h1", "h2", "h3", "h4", "li"])
        text_parts = []
        for tag in paragraphs:
            txt = tag.get_text(strip=True)
            if txt and len(txt) > 10:  # Skip tiny fragments
                text_parts.append(txt)
        main_text = "\n\n".join(text_parts)

        # If readability gave too little, try raw extraction
        if len(main_text) < 200:
            full_soup = BeautifulSoup(html, "lxml")
            # Remove unwanted elements
            for el in full_soup.find_all(["script", "style", "nav", "header", "footer",
                                          "aside", "noscript", "iframe", "form"]):
                el.decompose()
            for comment in full_soup.find_all(string=lambda t: isinstance(t, Comment)):
                comment.extract()

            body = full_soup.body
            if body:
                paragraphs = body.find_all(["p", "h1", "h2", "h3", "h4", "h5", "article", "section", "li"])
                text_parts = [p.get_text(strip=True) for p in paragraphs if len(p.get_text(strip=True)) > 15]
                main_text = "\n\n".join(text_parts)

        # Extract metadata from original HTML
        meta_soup = BeautifulSoup(html, "lxml")
        result = {
            "url": url,
            "domain": urlparse(url).netloc,
            "title": title or self._get_meta(meta_soup, "og:title") or self._get_tag_text(meta_soup, "title"),
            "description": self._get_meta(meta_soup, "description", "og:description"),
            "author": self._get_meta(meta_soup, "author", "article:author"),
            "published_date": self._get_meta(meta_soup, "article:published_time", "pubdate",
                                              "date", "datePublished"),
            "language": self._get_html_lang(meta_soup),
            "word_count": len(main_text.split()),
            "text": main_text,
            "images": self._extract_images(meta_soup, url),
            "fetched_at": datetime.now().isoformat(),
        }

        return result

    def extract_headlines(self, html: str, url: str) -> Dict[str, Any]:
        """Extract all news headlines and their links from a page."""
        if not html:
            return {"url": url, "error": "No HTML content"}

        soup = BeautifulSoup(html, "lxml")

        # Remove navigation, footer, sidebar clutter
        for el in soup.find_all(["nav", "footer", "aside", "script", "style", "noscript"]):
            el.decompose()

        headlines = []
        seen = set()

        # Strategy 1: Headings inside <a> tags or <a> tags inside headings
        for heading in soup.find_all(["h1", "h2", "h3", "h4"]):
            text = heading.get_text(strip=True)
            if not text or len(text) < 10 or text in seen:
                continue

            link = heading.find("a")
            if not link:
                # Check if heading's parent is an <a>
                link = heading.find_parent("a")

            href = link.get("href", "") if link else ""
            if href:
                href = urljoin(url, href)

            seen.add(text)
            headlines.append({
                "title": text,
                "url": href,
                "tag": heading.name,
            })

        # Strategy 2: <a> tags with substantial text (likely article links)
        for a_tag in soup.find_all("a", href=True):
            text = a_tag.get_text(strip=True)
            if not text or len(text) < 20 or len(text) > 300 or text in seen:
                continue

            href = urljoin(url, a_tag["href"])
            parsed = urlparse(href)

            # Filter: must be a real page link, not anchor/javascript
            if not parsed.scheme.startswith("http"):
                continue
            if any(ext in parsed.path.lower() for ext in [".jpg", ".png", ".gif", ".pdf", ".css", ".js"]):
                continue

            seen.add(text)
            headlines.append({
                "title": text,
                "url": href,
                "tag": "a",
            })

        # Sort: headings first, then by text length (longer = more likely real headline)
        tag_priority = {"h1": 0, "h2": 1, "h3": 2, "h4": 3, "a": 4}
        headlines.sort(key=lambda h: (tag_priority.get(h["tag"], 5), -len(h["title"])))

        return {
            "url": url,
            "domain": urlparse(url).netloc,
            "total_headlines": len(headlines),
            "headlines": headlines,
            "fetched_at": datetime.now().isoformat(),
        }

    def extract_links(self, html: str, url: str) -> Dict[str, Any]:
        """Extract all links from a page, categorized."""
        if not html:
            return {"url": url, "error": "No HTML content"}

        soup = BeautifulSoup(html, "lxml")
        domain = urlparse(url).netloc

        internal_links = []
        external_links = []
        seen = set()

        for a_tag in soup.find_all("a", href=True):
            href = urljoin(url, a_tag["href"])
            parsed = urlparse(href)

            if not parsed.scheme.startswith("http") or href in seen:
                continue
            seen.add(href)

            text = a_tag.get_text(strip=True)[:100]
            link_data = {"url": href, "text": text or "(no text)"}

            if parsed.netloc == domain:
                internal_links.append(link_data)
            else:
                external_links.append(link_data)

        return {
            "url": url,
            "domain": domain,
            "total_links": len(internal_links) + len(external_links),
            "internal_links": internal_links,
            "external_links": external_links,
            "fetched_at": datetime.now().isoformat(),
        }

    def extract_raw(self, html: str, url: str) -> Dict[str, Any]:
        """Extract all visible text from a page (cleaned)."""
        if not html:
            return {"url": url, "error": "No HTML content"}

        soup = BeautifulSoup(html, "lxml")

        # Remove unwanted elements
        for el in soup.find_all(["script", "style", "nav", "noscript", "iframe", "svg"]):
            el.decompose()
        for comment in soup.find_all(string=lambda t: isinstance(t, Comment)):
            comment.extract()

        text = soup.get_text(separator="\n", strip=True)

        # Clean up excessive whitespace
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        clean_text = "\n".join(lines)

        return {
            "url": url,
            "domain": urlparse(url).netloc,
            "title": self._get_tag_text(BeautifulSoup(html, "lxml"), "title"),
            "word_count": len(clean_text.split()),
            "text": clean_text,
            "fetched_at": datetime.now().isoformat(),
        }

    # ── Helper Methods ─────────────────────────────────────────────

    def _get_meta(self, soup: BeautifulSoup, *names) -> Optional[str]:
        """Get content from a meta tag by name or property."""
        for name in names:
            tag = soup.find("meta", attrs={"name": name})
            if not tag:
                tag = soup.find("meta", attrs={"property": name})
            if not tag:
                tag = soup.find("meta", attrs={"itemprop": name})
            if tag and tag.get("content"):
                return tag["content"].strip()
        return None

    def _get_tag_text(self, soup: BeautifulSoup, tag_name: str) -> Optional[str]:
        """Get text from the first matching tag."""
        tag = soup.find(tag_name)
        return tag.get_text(strip=True) if tag else None

    def _get_html_lang(self, soup: BeautifulSoup) -> Optional[str]:
        """Get the language of the page."""
        html_tag = soup.find("html")
        if html_tag:
            return html_tag.get("lang", html_tag.get("xml:lang"))
        return None

    def _extract_images(self, soup: BeautifulSoup, base_url: str, limit: int = 5) -> List[str]:
        """Extract main images from the page."""
        images = []

        # OG image first
        og_img = self._get_meta(soup, "og:image")
        if og_img:
            images.append(urljoin(base_url, og_img))

        # Then content images
        for img in soup.find_all("img", src=True):
            src = urljoin(base_url, img["src"])
            if src not in images and not any(x in src.lower() for x in ["icon", "logo", "avatar", "pixel", "tracking", "1x1"]):
                images.append(src)
            if len(images) >= limit:
                break

        return images

    # ── High-Level API ─────────────────────────────────────────────

    def scrape(self, url: str, mode: str = "article") -> Dict[str, Any]:
        """
        Main entry point: fetch a URL and extract data.

        Modes:
          article   — main content + metadata (default)
          headlines — all news headlines & links
          links     — all internal/external links
          raw       — all visible text
        """
        logger.info(f"🔍 Scraping: {url} (mode: {mode})")

        html = self.fetch_html(url)
        if not html:
            return {"url": url, "error": "Failed to fetch the page", "mode": mode}

        extractors = {
            "article": self.extract_article,
            "headlines": self.extract_headlines,
            "links": self.extract_links,
            "raw": self.extract_raw,
        }

        extractor = extractors.get(mode, self.extract_article)
        result = extractor(html, url)
        result["mode"] = mode
        return result

    def scrape_multiple(self, urls: List[str], mode: str = "article") -> List[Dict[str, Any]]:
        """Process multiple URLs with polite delays."""
        results = []
        total = len(urls)

        for i, url in enumerate(urls, 1):
            logger.info(f"📄 [{i}/{total}] Processing: {url}")
            result = self.scrape(url, mode)
            results.append(result)

            if i < total:
                wait = self.delay + random.uniform(0, 1)
                time.sleep(wait)

        return results


# ════════════════════════════════════════════════════════════════════
#  OUTPUT FORMATTERS
# ════════════════════════════════════════════════════════════════════

def format_console(data: Dict[str, Any], mode: str = "article") -> str:
    """Format data for beautiful console output."""
    lines = []
    lines.append("=" * 70)

    if mode == "article":
        lines.append(f"📰 {data.get('title', 'No Title')}")
        lines.append(f"🔗 {data.get('url', '')}")
        lines.append(f"🌐 {data.get('domain', '')}")
        if data.get("author"):
            lines.append(f"✍️  {data['author']}")
        if data.get("published_date"):
            lines.append(f"📅 {data['published_date']}")
        if data.get("description"):
            lines.append(f"📝 {data['description']}")
        lines.append(f"📊 {data.get('word_count', 0)} words")
        lines.append("-" * 70)
        lines.append(data.get("text", "(no content extracted)")[:3000])
        if data.get("text", "") and len(data["text"]) > 3000:
            lines.append(f"\n... [{len(data['text']) - 3000} more characters in file]")

    elif mode == "headlines":
        lines.append(f"📰 Headlines from: {data.get('domain', '')}")
        lines.append(f"🔗 {data.get('url', '')}")
        lines.append(f"📊 {data.get('total_headlines', 0)} headlines found")
        lines.append("-" * 70)
        for i, h in enumerate(data.get("headlines", []), 1):
            tag_icon = {"h1": "🔴", "h2": "🟡", "h3": "🟢", "h4": "⚪", "a": "🔵"}.get(h["tag"], "⚪")
            lines.append(f"  {tag_icon} {i:3d}. {h['title']}")
            if h.get("url"):
                lines.append(f"       → {h['url']}")

    elif mode == "links":
        lines.append(f"🔗 Links from: {data.get('domain', '')}")
        lines.append(f"📊 {data.get('total_links', 0)} links ({len(data.get('internal_links', []))} internal, "
                      f"{len(data.get('external_links', []))} external)")
        lines.append("-" * 70)
        if data.get("internal_links"):
            lines.append("\n📁 Internal Links:")
            for link in data["internal_links"][:30]:
                lines.append(f"  • {link['text'][:50]:50s} → {link['url']}")
        if data.get("external_links"):
            lines.append("\n🌍 External Links:")
            for link in data["external_links"][:20]:
                lines.append(f"  • {link['text'][:50]:50s} → {link['url']}")

    elif mode == "raw":
        lines.append(f"📄 Raw Text from: {data.get('domain', '')}")
        lines.append(f"📊 {data.get('word_count', 0)} words")
        lines.append("-" * 70)
        lines.append(data.get("text", "(no content)")[:5000])

    lines.append("=" * 70)
    return "\n".join(lines)


def save_output(data: Any, filepath: str, fmt: str = "json"):
    """Save results to file."""
    os.makedirs(os.path.dirname(filepath) or ".", exist_ok=True)

    if fmt == "json":
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    elif fmt == "text":
        with open(filepath, "w", encoding="utf-8") as f:
            items = data if isinstance(data, list) else [data]
            for item in items:
                f.write(format_console(item, item.get("mode", "article")))
                f.write("\n\n")

    elif fmt == "csv":
        import csv
        items = data if isinstance(data, list) else [data]
        if items:
            keys = ["url", "domain", "title", "description", "author", "published_date", "word_count"]
            with open(filepath, "w", encoding="utf-8", newline="") as f:
                writer = csv.DictWriter(f, fieldnames=keys, extrasaction="ignore")
                writer.writeheader()
                writer.writerows(items)

    logger.info(f"💾 Results saved to: {filepath}")


# ════════════════════════════════════════════════════════════════════
#  CLI INTERFACE
# ════════════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description="🌐 Web Agent — Universal Website Data Fetcher & News Extractor",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python web_agent.py https://bbc.com                     # Extract main article
  python web_agent.py https://bbc.com -m headlines         # Get all headlines
  python web_agent.py https://dawn.com -m links            # Get all links
  python web_agent.py https://geo.tv -m raw                # Get raw text
  python web_agent.py -f urls.txt -o results.json          # Batch process
  python web_agent.py https://spa-site.com --selenium      # Use browser for JS sites
  python web_agent.py https://bbc.com -m headlines --format text -o news.txt
        """,
    )

    parser.add_argument("urls", nargs="*", help="URL(s) to scrape")
    parser.add_argument("-f", "--file", help="File with URLs (one per line)")
    parser.add_argument("-m", "--mode", choices=["article", "headlines", "links", "raw"],
                        default="article", help="Extraction mode (default: article)")
    parser.add_argument("-o", "--output", help="Output file (default: print to console)")
    parser.add_argument("--format", choices=["json", "text", "csv"], default="json",
                        help="Output format (default: json)")
    parser.add_argument("--selenium", action="store_true",
                        help="Force Selenium for JS-heavy sites")
    parser.add_argument("--timeout", type=int, default=15,
                        help="Request timeout in seconds (default: 15)")
    parser.add_argument("--retries", type=int, default=3,
                        help="Max retries per URL (default: 3)")
    parser.add_argument("--delay", type=float, default=1.0,
                        help="Delay between URLs in seconds (default: 1.0)")
    parser.add_argument("--proxy", help="HTTP/HTTPS proxy (e.g., http://proxy:8080)")
    parser.add_argument("--quiet", action="store_true", help="Suppress console output")
    parser.add_argument("--verbose", action="store_true", help="Enable debug logging")

    args = parser.parse_args()

    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    if args.quiet:
        logging.getLogger().setLevel(logging.WARNING)

    # ── Collect URLs ───────────────────────────────────────────────
    urls = list(args.urls) if args.urls else []

    if args.file:
        try:
            with open(args.file, "r", encoding="utf-8") as f:
                file_urls = [line.strip() for line in f if line.strip() and not line.startswith("#")]
                urls.extend(file_urls)
        except FileNotFoundError:
            logger.error(f"File not found: {args.file}")
            sys.exit(1)

    if not urls:
        # Interactive mode
        print("\n🌐 Web Agent — Interactive Mode")
        print("Enter URL(s) to scrape (empty line to finish):\n")
        while True:
            try:
                url = input("  URL: ").strip()
                if not url:
                    break
                urls.append(url)
            except (EOFError, KeyboardInterrupt):
                break

    if not urls:
        print("No URLs provided. Use --help for usage info.")
        sys.exit(1)

    # Validate URLs
    valid_urls = []
    for url in urls:
        if not url.startswith(("http://", "https://")):
            url = "https://" + url
        valid_urls.append(url)

    # ── Create Agent & Scrape ──────────────────────────────────────
    agent = WebAgent(
        use_selenium=args.selenium,
        timeout=args.timeout,
        retries=args.retries,
        delay=args.delay,
        proxy=args.proxy,
    )

    print(f"\n🚀 Starting Web Agent — {len(valid_urls)} URL(s), mode: {args.mode}\n")

    if len(valid_urls) == 1:
        results = agent.scrape(valid_urls[0], mode=args.mode)
    else:
        results = agent.scrape_multiple(valid_urls, mode=args.mode)

    # ── Output ─────────────────────────────────────────────────────
    if args.output:
        save_output(results, args.output, args.format)

    # Print to console
    if not args.quiet:
        if isinstance(results, list):
            for item in results:
                print(format_console(item, item.get("mode", args.mode)))
                print()
        else:
            print(format_console(results, results.get("mode", args.mode)))

    # Summary
    if isinstance(results, list):
        success = sum(1 for r in results if "error" not in r)
        print(f"\n📊 Done: {success}/{len(results)} URLs processed successfully")
    else:
        status = "✅ Success" if "error" not in results else f"❌ Error: {results.get('error')}"
        print(f"\n📊 {status}")


if __name__ == "__main__":
    main()
