<?php
/**
 * HALO.BD — "Case Study" custom post type + taxonomies
 * Master Build Brief §36: Case Study CPT, taxonomies Industry & Platform.
 *
 * INSTALL: add to a snippets plugin (WPCode) or child-theme functions.php,
 * then re-save Settings → Permalinks once to flush rewrite rules.
 * URL result: /work/               (archive)
 *             /work/[project-name]/ (single case study)
 *
 * Fields (role, timeline, platform, team, outcome headline, featured flag):
 * create one ACF field group attached to this CPT — spec in
 * elementor/GLOBAL-SETTINGS.md §"Case Study fields". Elementor Pro dynamic
 * tags read them into the Single + Loop templates.
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'init', function () {

	register_post_type( 'case_study', array(
		'labels'       => array(
			'name'          => 'Case Studies',
			'singular_name' => 'Case Study',
			'add_new_item'  => 'Add New Case Study',
			'edit_item'     => 'Edit Case Study',
		),
		'public'        => true,
		'has_archive'   => true,
		'menu_icon'     => 'dashicons-portfolio',
		'menu_position' => 5,
		'rewrite'       => array( 'slug' => 'work', 'with_front' => false ),
		'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
		'show_in_rest'  => true, // Gutenberg + future flexibility
	) );

	register_taxonomy( 'industry', 'case_study', array(
		'labels'       => array( 'name' => 'Industries', 'singular_name' => 'Industry' ),
		'public'       => true,
		'hierarchical' => false,
		'show_in_rest' => true,
		'rewrite'      => array( 'slug' => 'work/industry', 'with_front' => false ),
	) );

	register_taxonomy( 'platform', 'case_study', array(
		'labels'       => array( 'name' => 'Platforms', 'singular_name' => 'Platform' ),
		'public'       => true,
		'hierarchical' => false,
		'show_in_rest' => true,
		'rewrite'      => array( 'slug' => 'work/platform', 'with_front' => false ),
	) );
} );
