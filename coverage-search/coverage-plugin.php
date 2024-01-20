<?php
/*
Plugin Name: Coverage Search 
Description: A simple WordPress plugin to display a coverage search.
Version: 1.1
Author: Alec Shelembe + Gigawave visit https://alecshelembe.github.io/site/

*/


$plugin_dir = plugin_dir_path(__FILE__);
// Path to the functions page
$functions_page = $plugin_dir . 'php-functions.php';
include_once($functions_page);


function enqueue_javascript() {
    // Enqueue Tailwind CSS from CDN with specified plugins
    wp_enqueue_script('external-tailwind-js', 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js', array(), '2.2.15');
    wp_enqueue_script('font-awesome', 'https://kit.fontawesome.com/6b29675a96.js', array(), null, false);
    wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js', array(), '3.6.0', true);
    wp_enqueue_script('google-maps-api', 'https://maps.googleapis.com/maps/api/js?key=&libraries=places', array(), null, true);
    wp_enqueue_script('javascript-functions', plugins_url('javascript-functions.js', __FILE__), array('jquery'), '1.0', true);

}

// Enqueue external stylesheets
function enqueue_style() {
    // Enqueue external stylesheet (style.css)
    wp_enqueue_style('external-tailwind-css', 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css', array(), '2.2.15');
    wp_enqueue_style('custom-plugin-styles', plugins_url('css/styles.css', __FILE__), array(), '1.0.0', 'all');

}

// Add a shortcode to display a greeting message
function show_form() {
    $plugin_dir = plugin_dir_path(__FILE__);
    
    // Path to the HTML form file
    $form_file_path = $plugin_dir . 'coverage-page.php';
    
    // Check if the form file exists
    if (file_exists($form_file_path)) {
        // Get the contents of the form file
        ob_start(); // Start output buffering
        include $form_file_path; // Include the form file
        $form_contents = ob_get_clean(); // Get the buffered content
        
        return $form_contents; // Return the form contents
    } else {
        return 'External form file not found.';
    }
}

// function localize() {
//    // Enqueue your script
//    wp_enqueue_script('', plugin_dir_url(__FILE__) . 'your-script.js', array('jquery'), '1.0', true);

    // Localize the script with the admin-ajax.php URL
    //wp_localize_script('', 'coverageSearchPlugin', array('ajaxurl' => //plugin_dir_url(__FILE__).'text.php'));
// }

// add_action('wp_enqueue_scripts', 'localize');


// Hook the function to the 'wp_enqueue_scripts' action
add_action('wp_enqueue_scripts', 'enqueue_javascript');
add_action('wp_enqueue_scripts', 'enqueue_style');
add_shortcode('coverage-search', 'show_form');