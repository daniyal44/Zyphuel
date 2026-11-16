#!/usr/bin/env python3
"""
================================================================================
Zyphuel Master Content & Fuel Market Auto-Updater
Domain: https://zyphuel.netlify.app
Author: Muhammad Daniyal Khan (Scale Verse)
Description:
    Autonomous Python master script designed to run inside the Zyphuel website
    repository. Daily monitors search engines, Google News RSS intelligence feeds,
    and OGRA petrol/diesel pricing developments across Pakistan (Lahore focus).
    Automatically synthesizes fresh market intelligence, updates frontend data
    (src/data/fuelMarketIntel.json), synchronizes documentation and subpages
    (docs/pages/subpages/*.md), updates sitemap lastmod timestamps, and optionally
    triggers automated Git commits and Netlify rebuilds.

Compliance & Business Logic (Permanent Memory Rules):
    - Volume Bounds: Strictly 5 Litres min to 15 Litres max per order.
    - Doorstep Delivery Charges: Fixed Rs. 300.00 nominal fee for orders up to 10L (5L–10L).
      For 11L to 15L Max, fees are strictly scaled between Rs. 300.00 and Rs. 400.00
      (+Rs. 20/L step: 11L = Rs. 320, 12L = Rs. 340, 13L = Rs. 360, 14L = Rs. 380, 15L = Rs. 400).
    - Refueling Targets: Strictly 4 application targets (Car/Sedan/SUV, Motorbike/Scooter,
      Standby Generator, Commercial Machinery). Jerrycans strictly excluded.
    - Night Cutoff: 10:00 PM – 8:00 AM PKT (intake: 8:00 AM – 10:00 PM PKT).
    - Emergency WhatsApp: +92 3230-112464 (24/7).
    - Official Android App: Exclusively via Direct APK Download (/APK/Zyphuel.apk).
================================================================================
"""

import os
import sys
import re
import json
import time
import hashlib
import logging
import argparse
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET

# ------------------------------------------------------------------------------
# Configuration & Constants
# ------------------------------------------------------------------------------
SCRIPT_VERSION = "3.0.0"

CACHE_DIR = Path(".zyphuel_cache")
STATE_FILE = CACHE_DIR / "fuel_intelligence_state.json"
DATA_OUTPUT_FILE = Path("src/data/fuelMarketIntel.json")
DOCS_SUBPAGES_DIR = Path("docs/pages/subpages")
DOCS_ARTICLES_INDEX = Path("docs/articles.md")
SITEMAP_PATH = Path("public/sitemap.xml")
FUEL_PRICES_LIVE_JSON = Path("public/fuelPricesLive.json")
FUEL_PRICES_JS = Path("src/data/fuelPrices.js")

# Search / RSS Feeds for Fuel & Petrol News in Pakistan / Lahore
DEFAULT_SEARCH_FEEDS = [
    {
        "source": "Google News (Petrol Price Pakistan)",
        "url": "https://news.google.com/rss/search?q=Pakistan+petrol+price+OGRA+when:2d&hl=en-PK&gl=PK&ceid=PK:en",
        "category": "pricing"
    },
    {
        "source": "Google News (Diesel Price Lahore)",
        "url": "https://news.google.com/rss/search?q=Lahore+diesel+fuel+price+when:3d&hl=en-PK&gl=PK&ceid=PK:en",
        "category": "diesel_logistics"
    },
    {
        "source": "Google News (Energy & Fuel Delivery Pakistan)",
        "url": "https://news.google.com/rss/search?q=Pakistan+fuel+delivery+generator+diesel+when:7d&hl=en-PK&gl=PK&ceid=PK:en",
        "category": "delivery_innovations"
    },
    {
        "source": "Google News (Platts Crude & Petroleum)",
        "url": "https://news.google.com/rss/search?q=Pakistan+oil+price+Platts+petroleum+when:4d&hl=en-PK&gl=PK&ceid=PK:en",
        "category": "market_trends"
    }
]

# Zyphuel Brand Guardrails & Business Grounding
ZYPHUEL_CONTEXT = {
    "brand_name": "Zyphuel",
    "domain": "https://zyphuel.netlify.app",
    "app_name": "Zyphuel Mobile APK (v2.6.4+)",
    "apk_download_url": "/APK/Zyphuel.apk",
    "delivery_city": "Lahore, Pakistan",
    "delivery_sla_simple": "20–45 Mins Simple Dispatch",
    "delivery_fee_up_to_10l": "Rs. 300.00 Fixed",
    "delivery_fee_11l_to_15l": "Rs. 320.00 to Rs. 400.00 (+Rs. 20/L step)",
    "order_bounds": "5 Litres min to 15 Litres max per order",
    "pump_margin_markup": "Rs. 5.00/L over official OGRA ex-depot rates",
    "order_intake_hours": "8:00 AM to 10:00 PM PKT daily",
    "whatsapp_emergency": "+92 3230-112464",
    "payment_methods": ["Cash on Delivery (up to 10L)", "JazzCash", "Easypaisa", "NayaPay", "Raast / Bank Transfer QR"],
    "target_use_cases": [
        "Car / Sedan / SUV Refueling",
        "Motorbike / Scooter Refueling",
        "Standby Generator (Domestic & Commercial)",
        "Commercial Machinery Refueling"
    ]
}

# ------------------------------------------------------------------------------
# Logging & Stdout Setup (Windows UTF-8 Safe)
# ------------------------------------------------------------------------------
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
if hasattr(sys.stderr, "reconfigure"):
    try:
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger("ZyphuelMasterUpdater")

# ------------------------------------------------------------------------------
# Data Models & Helper Classes
# ------------------------------------------------------------------------------
class FuelIntelligenceItem:
    def __init__(self, title: str, summary: str, link: str, published: str, source: str, category: str):
        self.title = title.strip()
        self.summary = summary.strip()
        self.link = link.strip()
        self.published = published.strip()
        self.source = source.strip()
        self.category = category
        self.content_hash = hashlib.sha256(f"{self.title}:{self.summary}".encode("utf-8")).hexdigest()

    def to_dict(self) -> Dict[str, Any]:
        return {
            "title": self.title,
            "summary": self.summary,
            "link": self.link,
            "published": self.published,
            "source": self.source,
            "category": self.category,
            "hash": self.content_hash
        }

# ------------------------------------------------------------------------------
# Search Engine & RSS News Intelligence Harvester
# ------------------------------------------------------------------------------
class SearchIntelligenceHarvester:
    """Scrapes search engine & RSS news feeds for real-time petroleum and fuel data in Pakistan."""
    def __init__(self, headers: Optional[Dict[str, str]] = None):
        self.headers = headers or {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 (ZyphuelIntelBot/3.0)"
        }

    def fetch_feed(self, feed_cfg: Dict[str, str]) -> List[FuelIntelligenceItem]:
        url = feed_cfg["url"]
        source_name = feed_cfg["source"]
        category = feed_cfg["category"]
        items: List[FuelIntelligenceItem] = []

        try:
            req = urllib.request.Request(url, headers=self.headers)
            with urllib.request.urlopen(req, timeout=12) as response:
                xml_content = response.read()
                root = ET.fromstring(xml_content)
                channel = root.find("channel")
                if channel is None:
                    return items

                for item_elem in channel.findall("item"):
                    title = item_elem.findtext("title") or ""
                    description = item_elem.findtext("description") or ""
                    link = item_elem.findtext("link") or ""
                    pub_date = item_elem.findtext("pubDate") or ""

                    # Clean HTML tags and excessive whitespace
                    clean_desc = re.sub(r"<[^>]+>", " ", description)
                    clean_desc = re.sub(r"\s+", " ", clean_desc).strip()

                    text_for_filter = (title + " " + clean_desc).lower()
                    if any(k in text_for_filter for k in ["petrol", "diesel", "fuel", "ogra", "platts", "oil", "hsd"]):
                        item = FuelIntelligenceItem(
                            title=title,
                            summary=clean_desc[:320],
                            link=link,
                            published=pub_date,
                            source=source_name,
                            category=category
                        )
                        items.append(item)
        except Exception as e:
            logger.warning(f"Feed retrieval issue with '{source_name}': {e}")

        return items

    def harvest_all(self, custom_feeds: Optional[List[Dict[str, str]]] = None) -> List[FuelIntelligenceItem]:
        feeds = custom_feeds or DEFAULT_SEARCH_FEEDS
        all_items: List[FuelIntelligenceItem] = []
        seen_hashes = set()

        for feed in feeds:
            feed_items = self.fetch_feed(feed)
            for item in feed_items:
                if item.content_hash not in seen_hashes:
                    seen_hashes.add(item.content_hash)
                    all_items.append(item)

        logger.info(f"Retrieved {len(all_items)} fresh fuel news signals from {len(feeds)} sources.")
        return all_items

# ------------------------------------------------------------------------------
# State & Cache Manager
# ------------------------------------------------------------------------------
class StateManager:
    """Maintains state of processed items to avoid redundant rebuilds or commits."""
    def __init__(self, state_file: Path = STATE_FILE):
        self.state_file = state_file
        self.cache_dir = state_file.parent
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.state = self._load()

    def _load(self) -> Dict[str, Any]:
        if self.state_file.exists():
            try:
                with open(self.state_file, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                logger.warning(f"Error loading cache state: {e}")
        return {
            "last_run": None,
            "processed_hashes": [],
            "recent_fuel_headlines": [],
            "update_count": 0
        }

    def save(self):
        try:
            with open(self.state_file, "w", encoding="utf-8") as f:
                json.dump(self.state, f, indent=2)
        except Exception as e:
            logger.error(f"Failed to persist state: {e}")

    def filter_new_items(self, items: List[FuelIntelligenceItem]) -> List[FuelIntelligenceItem]:
        known_hashes = set(self.state.get("processed_hashes", []))
        return [item for item in items if item.content_hash not in known_hashes]

    def commit_items(self, items: List[FuelIntelligenceItem]):
        known_hashes = set(self.state.get("processed_hashes", []))
        headlines = self.state.get("recent_fuel_headlines", [])
        now_iso = datetime.now(timezone.utc).isoformat()

        for item in items:
            known_hashes.add(item.content_hash)
            headlines.insert(0, {
                "title": item.title,
                "date": now_iso,
                "category": item.category,
                "source": item.source,
                "link": item.link
            })

        self.state["processed_hashes"] = list(known_hashes)[-120:]
        self.state["recent_fuel_headlines"] = headlines[:30]
        self.state["last_run"] = now_iso
        self.state["update_count"] = self.state.get("update_count", 0) + 1
        self.save()

# ------------------------------------------------------------------------------
# Multi-Topic Article Intelligence Synthesizer
# ------------------------------------------------------------------------------
class IntelligenceSynthesizer:
    """Maps raw search signals into contextual intelligence blocks for each Zyphuel article."""
    
    ARTICLE_MAPPINGS = {
        "future-of-fuel-delivery-lahore": {
            "topic": "daily_pricing_ogra",
            "title": "Pakistan’s Shift to Daily Fuel Pricing",
            "advice": (
                "OGRA daily rolling Platts benchmark monitor active. Rates adjust daily Monday through Friday, "
                "with weekend rates locked. Lock in your doorstep refuel at current rates before depot changes. "
                "Fixed Rs. 300.00 delivery fee for 5L–10L; Rs. 320–Rs. 400 for 11L–15L Max."
            )
        },
        "download-zyphuel-apk-guide": {
            "topic": "apk_mobile_telemetry",
            "title": "Download Zyphuel APK Guide",
            "advice": (
                "Zyphuel Android APK (v2.6.4+) delivers live lock-screen OGRA rate alerts, GPS sector auto-pinning, "
                "and Bluetooth bowser telemetry across Lahore. Orders strictly 5L to 15L Max delivered within 20–45 mins."
            )
        },
        "generator-refueling-services-lahore": {
            "topic": "generator_diesel_backup",
            "title": "Standby Generator Refueling Services",
            "advice": (
                "Emergency load-shedding generator backup: 100% Euro-V Hi-Cetane Diesel delivered directly to your rooftop "
                "or basement generator with 50-meter anti-static reels. Zero manual jerrycan risks in residential or commercial plazas."
            )
        },
        "generator-diesel-lpg-delivery-lahore": {
            "topic": "safe_fuel_handling",
            "title": "Commercial Generator Diesel & Safety Standards",
            "advice": (
                "Certified hazardous materials handling: Positive-displacement calibrated dispensing and sealed utilities. "
                "Strict 5L min to 15L max per dispatch with fixed Rs. 300 fee up to 10L, avoiding hazardous loose decanting."
            )
        },
        "iot-telemetry-fuel-delivery": {
            "topic": "metering_telemetry",
            "title": "Combating Pump Short-Fueling",
            "advice": (
                "Weights & Measures certified positive-displacement flow meters with 1,000 pulses/litre optical encoders. "
                "15°C Automatic Temperature Compensation (ATC) counteracts Lahore summer heat expansion with 0.01L verified precision."
            )
        },
        "zyphuel-calibrated-telemetry-fleet": {
            "topic": "founder_fleet_network",
            "title": "Mobile Energy Logistics in Lahore",
            "advice": (
                "Founder Muhammad Daniyal's agile micro-refueler fleet operates across DHA, Gulberg, Johar Town, Bahria Town, and Model Town. "
                "Delivered within within 45 minutes (single delivery window) with instant Raast, JazzCash, Easypaisa QR payments."
            )
        },
        "global-vs-pakistan-on-demand-fuel-delivery-benchmarks": {
            "topic": "global_benchmarks",
            "title": "Global vs Pakistan On-Demand Fuel Delivery",
            "advice": (
                "Comparing global leaders (CAFU, Booster, FuelBuddy) with Zyphuel in Lahore. Calibrated 0.01L flow meters, "
                "50m long-reach hoses, dual optical verification (QR + Code 128), and strictly 5L–15L order limits tailored for Pakistan."
            )
        }
    }

    @staticmethod
    def synthesize_for_article(slug: str, items: List[FuelIntelligenceItem]) -> Dict[str, Any]:
        mapping = IntelligenceSynthesizer.ARTICLE_MAPPINGS.get(slug, {
            "topic": "general_fuel",
            "title": "Verified Fuel Market Intel",
            "advice": "Daily verified petroleum rates and doorstep fuel dispatch across Lahore, Pakistan."
        })

        date_str = datetime.now().strftime("%B %d, %Y")
        
        # Select top relevant headlines
        points = []
        for item in items[:3]:
            safe_title = item.title.replace('"', "'")
            points.append({
                "label": "Market Intelligence",
                "text": f"{safe_title} ({item.source})"
            })

        if not points:
            points = [
                {
                    "label": "OGRA Benchmark",
                    "text": "Daily price monitor calibrated for Lahore municipal zones under rolling Platts formula."
                },
                {
                    "label": "Zyphuel Fleet Dispatch",
                    "text": "Doorstep Super Petrol & Euro-V Diesel available in 5L–15L calibrated batches (20–45 min SLA)."
                }
            ]

        return {
            "date": date_str,
            "headline": f"Daily Petroleum Market Intelligence ({date_str})",
            "summary": mapping["advice"],
            "topic": mapping["topic"],
            "points": points,
            "operationalZone": "Lahore, Pakistan (20–45 Min SLA)",
            "verifiedStatus": "Active Verified"
        }

# ------------------------------------------------------------------------------
# Fuel Price Scraper & Auto-Updater
# ------------------------------------------------------------------------------
class FuelPriceScraper:
    """Scrapes current OGRA fuel prices from multiple Pakistani sources and
    updates both public/fuelPricesLive.json (for the frontend) and
    src/data/fuelPrices.js (hardcoded fallback)."""

    PRICE_SOURCES = [
        {
            "name": "PSO Pakistan",
            "url": "https://psopk.com/en/products-and-services/product-prices",
            "parser": "_parse_pso",
        },
        {
            "name": "Shell Pakistan",
            "url": "https://www.shell.com.pk/motorists/shell-fuels/fuel-pricing.html",
            "parser": "_parse_shell",
        },
        {
            "name": "ProPakistani",
            "url": "https://propakistani.pk/fuel-prices/",
            "parser": "_parse_propakistani",
        },
        {
            "name": "HamariWeb",
            "url": "https://hamariweb.com/finance/petrol-price-pakistan.aspx",
            "parser": "_parse_hamariweb",
        },
        {
            "name": "PriceOye",
            "url": "https://priceoye.pk/petrol-prices-in-pakistan",
            "parser": "_parse_generic_page",
        },
        {
            "name": "Pakwheels Fuel",
            "url": "https://www.pakwheels.com/fuel-prices",
            "parser": "_parse_generic_page",
        },
    ]

    def __init__(self, headers: Optional[Dict[str, str]] = None):
        self.headers = headers or {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 (ZyphuelPriceBot/1.0)"
        }

    def _fetch_html(self, url: str) -> Optional[str]:
        try:
            req = urllib.request.Request(url, headers=self.headers)
            with urllib.request.urlopen(req, timeout=15) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except Exception as e:
            logger.warning(f"FuelPriceScraper: failed to fetch {url}: {e}")
            return None

    @staticmethod
    def _extract_price(text: str) -> Optional[float]:
        """Extract a numeric price from text like 'Rs. 330.00' or '330.00 PKR'."""
        m = re.search(r"(?:Rs\.?\s*)?(\d{2,4}(?:\.\d{1,2})?)", text)
        if m:
            val = float(m.group(1))
            if 50 < val < 1000:  # sanity: PKR fuel prices are 50–1000
                return val
        return None

    def _parse_pso(self, html: str) -> Optional[Dict[str, float]]:
        """Parse fuel prices from PSO website HTML."""
        prices = {}
        # PSO typically has a table with product names and prices
        # Look for patterns like: Super / Rs. 330.00
        petrol_match = re.search(
            r"(?:super|petrol|mogas|ms)[^0-9]*?(?:Rs\.?\s*)?(\d{2,4}\.\d{2})",
            html, re.IGNORECASE
        )
        diesel_match = re.search(
            r"(?:diesel|hsd|high\s*speed)[^0-9]*?(?:Rs\.?\s*)?(\d{2,4}\.\d{2})",
            html, re.IGNORECASE
        )
        hobc_match = re.search(
            r"(?:hi[- ]?octane|hobc|97)[^0-9]*?(?:Rs\.?\s*)?(\d{2,4}\.\d{2})",
            html, re.IGNORECASE
        )
        if petrol_match:
            val = float(petrol_match.group(1))
            if 50 < val < 1000:
                prices["petrol"] = val
        if diesel_match:
            val = float(diesel_match.group(1))
            if 50 < val < 1000:
                prices["diesel"] = val
        if hobc_match:
            val = float(hobc_match.group(1))
            if 50 < val < 1000:
                prices["highOctane"] = val
        return prices if prices.get("petrol") else None

    def _parse_shell(self, html: str) -> Optional[Dict[str, float]]:
        """Parse fuel prices from Shell Pakistan website."""
        prices = {}
        # Shell shows prices in a structured format with product names
        # Try structured table first, then fall back to generic patterns
        text = re.sub(r"<[^>]+>", " ", html)
        text = re.sub(r"\s+", " ", text)

        # Shell uses "Super" for petrol, "Diesel" for HSD, "Premium" for high octane
        for fuel, patterns in [
            ("petrol", [r"(?:super\s*(?:petrol)?|premier\s*motor\s*gasoline|pmg)",
                        r"(?:motor\s*(?:spirit|gasoline))"]),
            ("diesel", [r"(?:high\s*speed\s*diesel|hsd|diesel)"]),
            ("highOctane", [r"(?:v[- ]?power|premium|hi[- ]?octane|hobc|tamgha)"]),
        ]:
            for pat in patterns:
                m = re.search(
                    pat + r"[^0-9]{0,100}?(?:Rs\.?\s*)?(\d{2,4}(?:\.\d{1,2})?)",
                    text, re.IGNORECASE
                )
                if m:
                    val = float(m.group(1))
                    if 100 < val < 800:
                        prices[fuel] = val
                        break
        return prices if prices.get("petrol") else None

    def _parse_propakistani(self, html: str) -> Optional[Dict[str, float]]:
        """Parse fuel prices from ProPakistani fuel prices page."""
        return self._generic_table_parser(html)

    def _parse_hamariweb(self, html: str) -> Optional[Dict[str, float]]:
        """Parse fuel prices from HamariWeb finance page."""
        return self._generic_table_parser(html)

    def _parse_generic_page(self, html: str) -> Optional[Dict[str, float]]:
        """Parse fuel prices from any page with standard fuel price layout."""
        return self._generic_table_parser(html)

    def _generic_table_parser(self, html: str) -> Optional[Dict[str, float]]:
        """Generic parser that looks for petrol/diesel price patterns in HTML."""
        prices = {}
        # Strip HTML tags for easier regex
        text = re.sub(r"<[^>]+>", " ", html)
        text = re.sub(r"\s+", " ", text)

        # Look for patterns like "Petrol ... Rs 330.00" or "Petrol Price: Rs. 330"
        for fuel, keys in [
            ("petrol", [r"(?:petrol|super|mogas|motor\s*spirit)"]),
            ("diesel", [r"(?:diesel|hsd|high\s*speed\s*diesel)"]),
            ("highOctane", [r"(?:hi[- ]?octane|hobc|octane\s*97|premier)"]),
        ]:
            for key_pat in keys:
                m = re.search(
                    key_pat + r"[^0-9]{0,80}?(?:Rs\.?\s*)?(\d{2,4}(?:\.\d{1,2})?)",
                    text, re.IGNORECASE
                )
                if m:
                    val = float(m.group(1))
                    if 50 < val < 1000:
                        prices[fuel] = val
                        break
        return prices if prices.get("petrol") else None

    def scrape_from_news_headlines(self, items: List) -> Optional[Dict[str, float]]:
        """Extract prices from already-harvested news headlines as a last resort."""
        prices = {}
        for item in items:
            text = f"{item.title} {item.summary}" if hasattr(item, "summary") else str(item)
            # Look for "petrol price ... Rs X per litre" patterns
            m = re.search(
                r"petrol[^0-9]{0,40}?(?:Rs\.?\s*)?(\d{2,4}(?:\.\d{1,2})?)\s*(?:per\s*litre|/l|pkr)?",
                text, re.IGNORECASE
            )
            if m:
                val = float(m.group(1))
                if 100 < val < 600:
                    prices["petrol"] = val
            m2 = re.search(
                r"diesel[^0-9]{0,40}?(?:Rs\.?\s*)?(\d{2,4}(?:\.\d{1,2})?)\s*(?:per\s*litre|/l|pkr)?",
                text, re.IGNORECASE
            )
            if m2:
                val = float(m2.group(1))
                if 100 < val < 600:
                    prices["diesel"] = val
            if prices.get("petrol"):
                break
        return prices if prices.get("petrol") else None

    def scrape_prices(self, news_items: Optional[List] = None) -> Optional[Dict[str, float]]:
        """Try each source in order; return first successful result."""
        for src in self.PRICE_SOURCES:
            logger.info(f"FuelPriceScraper: trying {src['name']}...")
            html = self._fetch_html(src["url"])
            if not html:
                continue
            parser = getattr(self, src["parser"], None)
            if not parser:
                continue
            result = parser(html)
            if result:
                logger.info(f"FuelPriceScraper: got prices from {src['name']}: {result}")
                return result
            else:
                logger.warning(f"FuelPriceScraper: could not parse prices from {src['name']}")

        # Last resort: extract from news headlines
        if news_items:
            logger.info("FuelPriceScraper: trying headline extraction as last resort...")
            result = self.scrape_from_news_headlines(news_items)
            if result:
                logger.info(f"FuelPriceScraper: extracted prices from headlines: {result}")
                return result

        logger.warning("FuelPriceScraper: all sources failed.")
        return None

    def update_live_json(self, prices: Dict[str, float], root_dir: Path, dry_run: bool = False) -> bool:
        """Write scraped prices to public/fuelPricesLive.json."""
        json_path = root_dir / FUEL_PRICES_LIVE_JSON
        now = datetime.now(timezone.utc)
        pkt = datetime.now()

        payload = {
            "lastUpdated": pkt.strftime("%Y-%m-%dT%H:%M:%S+05:00"),
            "source": "OGRA Pakistan — auto-scraped",
            "currency": "PKR",
            "unit": "per litre",
            "prices": {
                "petrol": prices.get("petrol", 330.00),
                "diesel": prices.get("diesel", 331.00),
                "highOctane": prices.get("highOctane", 345.00),
                "lpg": prices.get("lpg", 450.00),
            },
            "meta": {
                "scrapedAt": now.isoformat(),
                "nextReviewDate": "",
                "notes": "Auto-updated by GitHub Actions daily workflow.",
            },
        }

        if dry_run:
            logger.info(f"[DRY-RUN] Would update {json_path} with prices: {prices}")
            return True

        try:
            json_path.parent.mkdir(parents=True, exist_ok=True)
            with open(json_path, "w", encoding="utf-8") as f:
                json.dump(payload, f, indent=2, ensure_ascii=False)
            logger.info(f"Successfully updated live fuel prices JSON: {json_path}")
            return True
        except Exception as e:
            logger.error(f"Failed to write {json_path}: {e}")
            return False

    def update_fallback_js(self, prices: Dict[str, float], root_dir: Path, dry_run: bool = False) -> bool:
        """Update the hardcoded FUEL_BASE_PRICES in src/data/fuelPrices.js."""
        js_path = root_dir / FUEL_PRICES_JS
        if not js_path.exists():
            logger.warning(f"fuelPrices.js not found at {js_path}")
            return False

        try:
            with open(js_path, "r", encoding="utf-8") as f:
                content = f.read()

            today_str = datetime.now().strftime("%d %B %Y")

            # Replace individual price values
            for key, js_key in [("petrol", "petrol"), ("diesel", "diesel"),
                                 ("highOctane", "highOctane")]:
                if key in prices:
                    pattern = rf"({js_key}:\s*)[\d.]+,"
                    replacement = rf"\g<1>{prices[key]:.2f},"
                    content = re.sub(pattern, replacement, content)

            # Update the "Last manual update" comment date
            content = re.sub(
                r"Last manual update: .+",
                f"Last manual update: {today_str} (auto-scraped)",
                content,
            )

            if dry_run:
                logger.info(f"[DRY-RUN] Would update {js_path} with prices: {prices}")
                return True

            with open(js_path, "w", encoding="utf-8") as f:
                f.write(content)
            logger.info(f"Successfully updated fallback JS prices: {js_path}")
            return True
        except Exception as e:
            logger.error(f"Failed to update {js_path}: {e}")
            return False


# ------------------------------------------------------------------------------
# Frontend JSON Data & Markdown Subpage Synchronizer
# ------------------------------------------------------------------------------
class PlatformSynchronizer:
    """Updates src/data/fuelMarketIntel.json, docs/pages/subpages/*.md, and public/sitemap.xml."""
    
    START_MARKER = "<!-- ZYPHUEL_FUEL_UPDATE_START -->"
    END_MARKER = "<!-- ZYPHUEL_FUEL_UPDATE_END -->"

    def __init__(self, root_dir: Path):
        self.root_dir = root_dir

    def sync_frontend_json(self, items: List[FuelIntelligenceItem], dry_run: bool = False) -> bool:
        """Writes live market intel directly to src/data/fuelMarketIntel.json for React consumption."""
        json_path = self.root_dir / DATA_OUTPUT_FILE
        json_path.parent.mkdir(parents=True, exist_ok=True)

        now = datetime.now()
        date_formatted = now.strftime("%B %d, %Y")
        today_iso = now.strftime("%Y-%m-%d")

        articles_intel = {}
        for slug in IntelligenceSynthesizer.ARTICLE_MAPPINGS.keys():
            articles_intel[slug] = IntelligenceSynthesizer.synthesize_for_article(slug, items)

        headlines_data = [item.to_dict() for item in items[:10]]

        payload = {
            "lastUpdated": now.isoformat(),
            "dateFormatted": date_formatted,
            "dateISO": today_iso,
            "headlinesCount": len(headlines_data),
            "headlines": headlines_data,
            "businessRules": {
                "minVolume": 5,
                "maxVolume": 15,
                "deliveryFeeUpTo10L": 300,
                "deliveryFee11To15L": "320-400 (+20/L step)",
                "simpleSLA": "Within 45 Mins",
                "orderHours": "8:00 AM - 10:00 PM PKT",
                "helpline": "+92 3230-112464"
            },
            "articles": articles_intel
        }

        if dry_run:
            logger.info(f"[DRY-RUN] Would update {json_path} with {len(articles_intel)} article intel sets.")
            return True

        try:
            with open(json_path, "w", encoding="utf-8") as f:
                json.dump(payload, f, indent=2, ensure_ascii=False)
            logger.info(f"Successfully updated frontend intelligence: {json_path}")
            return True
        except Exception as e:
            logger.error(f"Failed to write {json_path}: {e}")
            return False

    def generate_subpage_banner(self, intel: Dict[str, Any]) -> str:
        points_md = "\n".join([f"- **{pt['label']}**: {pt['text']}" for pt in intel["points"]])
        banner = f"""{self.START_MARKER}
> [!NOTE]
> **⚡ Live Daily Fuel Intelligence & Market Monitor ({intel['date']})**
> - **Operational SLA**: Within 45 Mins (single delivery window) across Lahore.
> - **Verified Parameters**: Strictly 5L min to 15L max per order. Delivery charges: fixed Rs. 300.00 up to 10L, strictly scaled Rs. 320.00–Rs. 400.00 (+Rs. 20/L) for 11L–15L Max.
> - **Summary**: {intel['summary']}
>
{points_md}
{self.END_MARKER}"""
        return banner

    def sync_subpages(self, items: List[FuelIntelligenceItem], dry_run: bool = False) -> int:
        """Injects or updates the live fuel update block in each docs/pages/subpages/*.md file."""
        subpages_dir = self.root_dir / DOCS_SUBPAGES_DIR
        if not subpages_dir.exists():
            logger.warning(f"Subpages directory {subpages_dir} not found.")
            return 0

        updated_count = 0
        today_iso = datetime.now().strftime("%Y-%m-%d")

        for slug, cfg in IntelligenceSynthesizer.ARTICLE_MAPPINGS.items():
            md_path = subpages_dir / f"{slug}.md"
            if not md_path.exists():
                continue

            try:
                with open(md_path, "r", encoding="utf-8") as f:
                    content = f.read()

                intel = IntelligenceSynthesizer.synthesize_for_article(slug, items)
                banner = self.generate_subpage_banner(intel)

                # Update existing banner or inject before sections
                if self.START_MARKER in content and self.END_MARKER in content:
                    pattern = rf"{re.escape(self.START_MARKER)}.*?{re.escape(self.END_MARKER)}"
                    new_content = re.sub(pattern, banner, content, flags=re.DOTALL)
                else:
                    # Insert after overview/identity section
                    sep = "## Pillar Guide Architecture & Content Structure"
                    if sep in content:
                        parts = content.split(sep, 1)
                        new_content = f"{parts[0]}\n{banner}\n\n{sep}{parts[1]}"
                    else:
                        new_content = f"{content}\n\n{banner}\n"

                if new_content != content:
                    if dry_run:
                        logger.info(f"[DRY-RUN] Would update subpage doc: {md_path.name}")
                    else:
                        with open(md_path, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        logger.info(f"Updated subpage doc: {md_path.name}")
                    updated_count += 1
            except Exception as e:
                logger.error(f"Error processing {md_path}: {e}")

        return updated_count

    def sync_sitemap(self, dry_run: bool = False) -> bool:
        """Updates lastmod timestamps in public/sitemap.xml to current date."""
        sitemap_file = self.root_dir / SITEMAP_PATH
        if not sitemap_file.exists():
            logger.warning("public/sitemap.xml not found.")
            return False

        try:
            with open(sitemap_file, "r", encoding="utf-8") as f:
                content = f.read()

            today_iso = datetime.now().strftime("%Y-%m-%d")
            new_content = re.sub(r"<lastmod>[^<]+</lastmod>", f"<lastmod>{today_iso}</lastmod>", content)

            if new_content == content:
                logger.info("Sitemap timestamps already up to date.")
                return False

            if dry_run:
                logger.info(f"[DRY-RUN] Would update sitemap timestamps to {today_iso}")
                return True

            with open(sitemap_file, "w", encoding="utf-8") as f:
                f.write(new_content)
            logger.info("Synchronized sitemap lastmod timestamps.")
            return True
        except Exception as e:
            logger.warning(f"Sitemap sync error: {e}")
            return False

# ------------------------------------------------------------------------------
# Git & Netlify Deployment Manager
# ------------------------------------------------------------------------------
class DeploymentManager:
    @staticmethod
    def git_commit_and_push(commit_msg: Optional[str] = None) -> bool:
        msg = commit_msg or f"chore(fuel-intel): auto-update daily petrol rates & market intelligence [{datetime.now().strftime('%Y-%m-%d')}]"
        try:
            subprocess.run(["git", "add", "."], check=True)
            status = subprocess.run(["git", "status", "--porcelain"], stdout=subprocess.PIPE, text=True, check=True)
            if not status.stdout.strip():
                logger.info("Git: No changes detected to commit.")
                return False

            subprocess.run(["git", "commit", "-m", msg], check=True)
            logger.info(f"Git: Committed changes: '{msg}'")
            push_res = subprocess.run(["git", "push"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            if push_res.returncode == 0:
                logger.info("Git: Pushed updates to remote successfully.")
                return True
            else:
                logger.warning(f"Git push output: {push_res.stderr.strip()}")
                return False
        except Exception as e:
            logger.warning(f"Git automated commit skipped: {e}")
            return False

    @staticmethod
    def trigger_netlify_build_hook(hook_url: Optional[str]) -> bool:
        url = hook_url or os.getenv("NETLIFY_BUILD_HOOK")
        if not url:
            return False
        try:
            req = urllib.request.Request(url, method="POST", data=b"{}")
            with urllib.request.urlopen(req, timeout=10) as resp:
                if resp.status in (200, 201, 204):
                    logger.info("Netlify build hook triggered successfully! Re-deployment underway.")
                    return True
        except Exception as e:
            logger.error(f"Failed to trigger Netlify build hook: {e}")
        return False

# ------------------------------------------------------------------------------
# Main Master CLI Orchestrator
# ------------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(
        description="Zyphuel Daily Petrol & Fuel Content Auto-Updater Master Script"
    )
    parser.add_argument("--force", action="store_true", help="Force update even if cache indicates no new items")
    parser.add_argument("--dry-run", action="store_true", help="Preview updates without modifying files")
    parser.add_argument("--git-commit", action="store_true", help="Auto-commit and push changes to Git")
    parser.add_argument("--netlify-hook", type=str, help="Netlify Build Hook URL to trigger rebuild")
    parser.add_argument(
        "--set-prices", type=str, default=None,
        help="Manually set fuel prices (emergency override). Format: petrol=330,diesel=331,highOctane=345"
    )
    args = parser.parse_args()

    print(f"""
============================================================
⛽ ZYPHUEL DAILY FUEL INTELLIGENCE & ARTICLE AUTO-UPDATER
Domain  : {ZYPHUEL_CONTEXT['domain']}
Version : {SCRIPT_VERSION}
Mode    : {'DRY RUN' if args.dry_run else 'PRODUCTION'}
Time    : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
============================================================
""")

    repo_root = Path.cwd()

    # Emergency manual price override: --set-prices petrol=330,diesel=331,highOctane=345
    if args.set_prices:
        logger.info(f"Manual price override mode: {args.set_prices}")
        manual_prices = {}
        for pair in args.set_prices.split(","):
            key, val = pair.strip().split("=")
            manual_prices[key.strip()] = float(val.strip())
        if manual_prices.get("petrol"):
            price_scraper = FuelPriceScraper()
            price_scraper.update_live_json(manual_prices, repo_root, dry_run=args.dry_run)
            price_scraper.update_fallback_js(manual_prices, repo_root, dry_run=args.dry_run)
            logger.info(f"Manual prices applied: {manual_prices}")
            if args.git_commit and not args.dry_run:
                DeploymentManager.git_commit_and_push(
                    f"fix(fuel-prices): manual price update — petrol Rs. {manual_prices['petrol']:.2f}/L [{datetime.now().strftime('%Y-%m-%d')}]"
                )
            if args.netlify_hook or os.getenv("NETLIFY_BUILD_HOOK"):
                DeploymentManager.trigger_netlify_build_hook(args.netlify_hook)
            print(f"✅ Manual prices applied and committed: {manual_prices}")
            return
        else:
            logger.error("Manual override requires at least petrol= price.")
            return

    state_mgr = StateManager()
    harvester = SearchIntelligenceHarvester()

    # Step 1: Harvest search engine & RSS news feeds
    logger.info("Harvesting verified fuel and petroleum intelligence from search feeds...")
    harvested_items = harvester.harvest_all()
    new_items = state_mgr.filter_new_items(harvested_items)
    logger.info(f"Fresh news items detected: {len(new_items)} (Total harvested: {len(harvested_items)})")

    if not new_items and not args.force:
        logger.info("All articles and data are already synchronized with current market intelligence. (Use --force to override).")
        return

    items_to_apply = new_items if new_items else harvested_items[:5]

    # Step 1b: Scrape and update live fuel prices
    logger.info("Scraping live OGRA fuel prices from Pakistani sources...")
    price_scraper = FuelPriceScraper()
    scraped_prices = price_scraper.scrape_prices(news_items=harvested_items)
    if scraped_prices:
        logger.info(f"Live prices scraped: {scraped_prices}")
        price_scraper.update_live_json(scraped_prices, repo_root, dry_run=args.dry_run)
        price_scraper.update_fallback_js(scraped_prices, repo_root, dry_run=args.dry_run)
    else:
        logger.warning("Could not scrape live fuel prices from any source — existing values remain unchanged.")
        logger.error("FUEL_PRICE_SCRAPE_FAILED: All price sources (PSO, ProPakistani, HamariWeb, Google News headlines) failed. Website will display stale prices until next successful update.")
        sys.exit(1)

    # Step 2: Synchronize frontend JSON data
    sync = PlatformSynchronizer(root_dir=repo_root)
    sync.sync_frontend_json(items_to_apply, dry_run=args.dry_run)

    # Step 3: Synchronize subpage markdown documentation
    subpages_updated = sync.sync_subpages(items_to_apply, dry_run=args.dry_run)
    logger.info(f"Subpage documentation files updated: {subpages_updated}")

    # Step 4: Synchronize sitemap timestamps
    sync.sync_sitemap(dry_run=args.dry_run)

    # Step 5: Save cache state
    if not args.dry_run and (new_items or args.force):
        state_mgr.commit_items(items_to_apply)

    # Step 6: Git commit and push if requested
    if args.git_commit and not args.dry_run:
        DeploymentManager.git_commit_and_push()

    # Step 7: Trigger Netlify build hook
    if args.netlify_hook or os.getenv("NETLIFY_BUILD_HOOK"):
        DeploymentManager.trigger_netlify_build_hook(args.netlify_hook)

    print(f"""
============================================================
✅ EXECUTION COMPLETE
Signals Processed : {len(items_to_apply)}
Subpages Updated  : {subpages_updated}
Fuel Prices       : {'Updated (' + str(scraped_prices) + ')' if scraped_prices else 'No change (scrape failed)'}
Frontend Data     : src/data/fuelMarketIntel.json
Live Prices JSON  : public/fuelPricesLive.json
Timestamp         : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
============================================================
""")

if __name__ == "__main__":
    main()
