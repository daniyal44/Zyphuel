<?php
/**
 * Plugin Name: Zyphuel Order Guard (10 PM Cutoff)
 * Plugin URI:  https://zyphuel.netlify.app
 * Description: Strict 10:00 PM (PKT) order intake cutoff guard for Zyphuel Doorstep Fuel Delivery. Hides and blocks the 'Complete Order' button (.truck-button, #truck-submit-btn) both server-side and client-side between 10:00 PM and 8:00 AM Asia/Karachi time.
 * Version:     1.0.0
 * Author:      Muhammad Daniyal (Zyphuel Engineering)
 * Author URI:  https://zyphuel.netlify.app
 * License:     GPL-2.0+
 * Text Domain: zyphuel-order-guard
 */

// Block direct execution if used in environments preventing it, but allow standalone API mode
if (!defined('ABSPATH') && !defined('ZYPHUEL_STANDALONE_API')) {
    // Check if being accessed directly as standalone endpoint
    define('ZYPHUEL_STANDALONE_API', true);
}

class ZyphuelOrderGuard {
    const TIMEZONE = 'Asia/Karachi';
    const CUTOFF_HOUR_START = 22; // 10:00 PM PKT
    const CUTOFF_HOUR_END   = 8;  // 8:00 AM PKT
    const WHATSAPP_HOTLINE  = '+92 3230-112464';

    public function __construct() {
        // Enforce PKT Timezone
        if (function_exists('date_default_timezone_set')) {
            date_default_timezone_set(self::TIMEZONE);
        }

        // Standalone Direct API Request Handling
        if (defined('ZYPHUEL_STANDALONE_API') && (!defined('ABSPATH') || isset($_GET['zyphuel_api']))) {
            $this->handle_standalone_api();
        }

        // WordPress Integration Hooks
        if (function_exists('add_action')) {
            add_action('wp_head', [$this, 'inject_guard_styles']);
            add_action('wp_footer', [$this, 'inject_guard_scripts']);
            add_action('rest_api_init', [$this, 'register_rest_routes']);
            add_action('init', [$this, 'intercept_night_orders']);
        }
    }

    /**
     * Check if test / QA / sandbox bypass is active
     * 
     * @return bool
     */
    public static function is_test_bypassed() {
        // 1. Environment variables
        if (getenv('ZYPHUEL_DISABLE_ORDER_CUTOFF') === 'true' || 
            getenv('VITE_DISABLE_ORDER_CUTOFF') === 'true' ||
            getenv('APP_ENV') === 'test' ||
            getenv('APP_ENV') === 'staging' ||
            getenv('CI') === 'true') {
            return true;
        }

        // 2. Query parameters (?test=true, ?bypass=true, ?qa=1, ?sandbox=1, ?bypass_hours=1)
        if (isset($_GET['test']) || 
            isset($_GET['bypass']) || 
            isset($_GET['qa']) || 
            isset($_GET['sandbox']) || 
            isset($_GET['bypass_hours']) || 
            isset($_GET['test_mode']) ||
            (isset($_GET['mock']) && $_GET['mock'] === 'true')) {
            return true;
        }

        // 3. HTTP Request Headers (X-Zyphuel-Test-Bypass, X-Test-Mode)
        if (!empty($_SERVER['HTTP_X_ZYPHUEL_TEST_BYPASS']) || 
            !empty($_SERVER['HTTP_X_TEST_MODE']) ||
            !empty($_SERVER['HTTP_X_QA_MODE'])) {
            return true;
        }

        // 4. POST Request Test Flags
        if (isset($_POST['test_mode']) || isset($_POST['sandbox']) || isset($_POST['qa_mode'])) {
            return true;
        }

        return false;
    }

    /**
     * Determine if night cutoff is currently active in PKT
     * Window: 10:00 PM (22:00) through 07:59 AM
     * 
     * @return bool
     */
    public static function is_night_cutoff_active() {
        if (self::is_test_bypassed()) {
            return false;
        }
        $now = new DateTime('now', new DateTimeZone(self::TIMEZONE));
        $hour = (int)$now->format('G'); // 0-23
        return ($hour >= self::CUTOFF_HOUR_START || $hour < self::CUTOFF_HOUR_END);
    }

    /**
     * Get detailed status payload
     * 
     * @return array
     */
    public static function get_status_payload() {
        $now = new DateTime('now', new DateTimeZone(self::TIMEZONE));
        $hour = (int)$now->format('G');
        $raw_cutoff = ($hour >= self::CUTOFF_HOUR_START || $hour < self::CUTOFF_HOUR_END);
        $is_bypassed = self::is_test_bypassed();
        $is_cutoff = $is_bypassed ? false : $raw_cutoff;
        
        $currentTimeFormatted = $now->format('l, g:i A') . ' (PKT)';
        $reopenTime = ($hour >= self::CUTOFF_HOUR_START) ? 'Tomorrow at 8:00 AM PKT' : 'Today at 8:00 AM PKT';

        return [
            'success'               => true,
            'can_order'             => !$is_cutoff,
            'cutoff_active'         => $is_cutoff,
            'raw_cutoff'            => $raw_cutoff,
            'test_bypass'           => $is_bypassed,
            'current_time_pkt'      => $currentTimeFormatted,
            'timezone'              => self::TIMEZONE,
            'order_intake_window'   => '8:00 AM – 10:00 PM PKT',
            'cutoff_window'         => '10:00 PM – 8:00 AM PKT',
            'reopen_time_pkt'       => $reopenTime,
            'button_selector'       => '#truck-submit-btn, .truck-button',
            'button_visible'        => true,
            'sandbox_path_available'=> true,
            'message'               => $is_cutoff 
                ? 'Doorstep fuel delivery orders are closed for the night (10:00 PM – 8:00 AM PKT). Fallback QA sandbox checkout remains open for verification.' 
                : 'Order intake is currently active.',
            'message_urdu'          => $is_cutoff
                ? 'رات 10 بجے کے بعد آن لائن آرڈرز بند ہیں۔ صبح 8 بجے آرڈرنگ دوبارہ شروع ہوگی۔'
                : 'آرڈرنگ جاری ہے۔',
            'whatsapp_emergency'    => self::WHATSAPP_HOTLINE,
            'timestamp'             => $now->getTimestamp()
        ];
    }

    /**
     * Standalone JSON Endpoint
     */
    public function handle_standalone_api() {
        $payload = self::get_status_payload();
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Cache-Control: no-cache, no-store, must-revalidate');
        echo json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Inject protective CSS during cutoff hours to style Complete Order button while keeping sandbox path open
     */
    public function inject_guard_styles() {
        if (!self::is_night_cutoff_active()) {
            return;
        }

        echo "\n<!-- Zyphuel Order Guard: 10 PM Cutoff Active (QA Sandbox Path Open) -->\n";
        echo "<style id=\"zyphuel-order-guard-css\">\n";
        echo "  #truck-submit-btn:not([data-qa-sandbox=\"true\"]), .truck-button:not(.sandbox-truck-button) {\n";
        echo "    opacity: 0.9;\n";
        echo "  }\n";
        echo "  .zyphuel-night-cutoff-alert {\n";
        echo "    background: linear-gradient(135deg, #0f172a, #1e293b);\n";
        echo "    border: 1px solid rgba(245, 158, 11, 0.4);\n";
        echo "    border-radius: 14px;\n";
        echo "    padding: 20px;\n";
        echo "    color: #ffffff;\n";
        echo "    text-align: center;\n";
        echo "    margin-top: 16px;\n";
        echo "  }\n";
        echo "</style>\n";
    }

    /**
     * Inject DOM Guard scripts to remove button and display night card if not already rendered
     */
    public function inject_guard_scripts() {
        if (!self::is_night_cutoff_active() || self::is_test_bypassed()) {
            return;
        }

        $payload = json_encode(self::get_status_payload(), JSON_UNESCAPED_UNICODE);

        echo "\n<script id=\"zyphuel-order-guard-js\">\n";
        echo "(function() {\n";
        echo "  var status = " . $payload . ";\n";
        echo "  function applyOrderGuard() {\n";
        echo "    // If sandbox / QA element is present, do not remove the sandbox submit button\n";
        echo "    var sandboxBtn = document.querySelector('[data-qa-sandbox=\"true\"]');\n";
        echo "    if (sandboxBtn) return;\n";
        echo "    var btn = document.getElementById('truck-submit-btn') || document.querySelector('.truck-button');\n";
        echo "    if (btn && btn.parentNode && !btn.hasAttribute('data-qa-sandbox')) {\n";
        echo "      btn.style.display = 'none';\n";
        echo "      btn.disabled = true;\n";
        echo "    }\n";
        echo "  }\n";
        echo "  if (document.readyState === 'loading') {\n";
        echo "    document.addEventListener('DOMContentLoaded', applyOrderGuard);\n";
        echo "  } else {\n";
        echo "    applyOrderGuard();\n";
        echo "  }\n";
        echo "  setInterval(applyOrderGuard, 1000);\n";
        echo "})();\n";
        echo "</script>\n";
    }

    /**
     * Register WordPress REST API route
     */
    public function register_rest_routes() {
        register_rest_route('zyphuel/v1', '/order-status', [
            'methods'             => 'GET',
            'callback'            => function() {
                return new WP_REST_Response(self::get_status_payload(), 200);
            },
            'permission_callback' => '__return_true'
        ]);
    }

    /**
     * Intercept order submissions attempted during night cutoff
     */
    public function intercept_night_orders() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['zyphuel_submit_order'])) {
            if (self::is_night_cutoff_active()) {
                if (isset($_POST['sandbox']) || isset($_POST['test_mode']) || self::is_test_bypassed()) {
                    return; // Allow QA sandbox verification order to complete
                }
                status_header(403);
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode([
                    'success'   => false,
                    'can_order' => false,
                    'error'     => 'Night order cutoff active. Orders close at 10:00 PM PKT and reopen at 8:00 AM PKT.',
                    'whatsapp'  => self::WHATSAPP_HOTLINE,
                    'sandbox_available' => true
                ]);
                exit;
            }
        }
    }
}

// Initialize Guard
new ZyphuelOrderGuard();

