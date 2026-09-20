<?php
/**
 * HALO Child theme — loader.
 * Loads design tokens → fonts → component CSS, the deferred JS, the inline
 * no-flash theme BOOT, and the Case Study CPT. Loading order matters
 * (see elementor/GLOBAL-SETTINGS.md §6).
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'HALO_VERSION', '1.0.0' );

/* --------------------------------------------------------------------------
 * 1. No-flash theme BOOT — must print in <head> BEFORE first paint
 *    (keep in sync with the BOOT block in assets/js/halo-theme.js)
 * -------------------------------------------------------------------------- */
add_action( 'wp_head', function () {
	?>
<meta name="theme-color" content="#F6F6F3">
<script id="halo-theme-boot">
(function(){try{var s=localStorage.getItem("halo-theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s||(d?"dark":"light");var r=document.documentElement;r.setAttribute("data-theme",t);r.style.colorScheme=t;}catch(e){}})();
</script>
	<?php
}, 0 );

/* --------------------------------------------------------------------------
 * 2. Styles — tokens → fonts → components (in that order)
 * -------------------------------------------------------------------------- */
add_action( 'wp_enqueue_scripts', function () {
	$uri = get_stylesheet_directory_uri();
	$dir = get_stylesheet_directory();

	// Parent (Hello Elementor) base styles, if the parent is present.
	wp_enqueue_style( 'hello-elementor', get_template_directory_uri() . '/style.css', array(), HALO_VERSION );

	foreach ( array( 'halo-tokens', 'halo-fonts', 'halo-custom' ) as $handle ) {
		$path = "/assets/css/{$handle}.css";
		wp_enqueue_style(
			$handle,
			$uri . $path,
			array( 'hello-elementor' ),
			file_exists( $dir . $path ) ? filemtime( $dir . $path ) : HALO_VERSION
		);
	}
}, 10 );

/* --------------------------------------------------------------------------
 * 3. Scripts — deferred, only two tiny files (Brief §27: keep JS minimal)
 * -------------------------------------------------------------------------- */
add_action( 'wp_enqueue_scripts', function () {
	$uri = get_stylesheet_directory_uri();
	$dir = get_stylesheet_directory();

	foreach ( array( 'halo-theme', 'halo' ) as $handle ) {
		$path = "/assets/js/{$handle}.js";
		wp_enqueue_script(
			$handle,
			$uri . $path,
			array(),
			file_exists( $dir . $path ) ? filemtime( $dir . $path ) : HALO_VERSION,
			array( 'in_footer' => true, 'strategy' => 'defer' )
		);
	}
}, 20 );

/* --------------------------------------------------------------------------
 * 4. Body class so component base rules apply site-wide
 * -------------------------------------------------------------------------- */
add_filter( 'body_class', function ( $classes ) {
	$classes[] = 'halo-body';
	return $classes;
} );

/* --------------------------------------------------------------------------
 * 5. Case Study custom post type + taxonomies (Brief §36)
 *    After activation, re-save Settings → Permalinks once.
 * -------------------------------------------------------------------------- */
require_once get_stylesheet_directory() . '/inc/case-study-cpt.php';
