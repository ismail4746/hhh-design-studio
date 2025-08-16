<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

//admin
$routes->group('admin', ['namespace' => 'App\Controllers\Admin'], function ($routes) {
    $routes->get('login', 'Auth::loginView');
    $routes->post('login', 'Auth::loginSubmit');
    $routes->get('logout', 'Auth::logout');
    $routes->get('register', 'Auth::register');
    $routes->post('register', 'Auth::submit');
    $routes->get('dashboard', 'Auth::index');


    // Blog Routes
    $routes->get('blogs', 'BlogController::index');            // list blogs
    $routes->get('blogs/create', 'BlogController::create');    // form to add
    $routes->post('blogs/store', 'BlogController::store');     // submit new
    $routes->get('blogs/edit/(:num)', 'BlogController::edit/$1');  // form to edit
    $routes->post('blogs/update/(:num)', 'BlogController::update/$1'); // submit update
    $routes->get('blogs/delete/(:num)', 'BlogController::delete/$1');  // delete blog
});

//blogs
// $routes->group('blog', ['namespace' => 'App\Controllers'], function($routes) {
//     $routes->get('blogs', 'BlogController::index');           // GET all blogs
//     $routes->get('blogs/(:num)', 'BlogController::show/$1');  // GET blog by ID
//     $routes->post('blogs', 'BlogController::create');         // POST create blog
//     $routes->put('blogs/(:num)', 'BlogController::update/$1');// PUT update blog
//     $routes->delete('blogs/(:num)', 'BlogController::delete/$1'); // DELETE blog
// });
