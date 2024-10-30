<?php
/**
 * Plugin Name: Cheatsheets
 * Plugin URI: https://wordpress.org/plugins/cheatsheets/
 * Description: Block for creating cheatsheets in WordPress (based on Gutenberg)
 * Author: True Emotions
 * Author URI: https://true-emotions.studio
 * Version: 0.1
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
