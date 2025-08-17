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


    //Projects Routes
    $routes->get('projects', 'ProjectsController::index');
    $routes->get('projects/create', 'ProjectsController::create');
    $routes->post('projects/store', 'ProjectsController::store');
    $routes->get('projects/edit/(:num)', 'ProjectsController::edit/$1');
    $routes->post('projects/update/(:num)', 'ProjectsController::update/$1');
    $routes->post('projects/delete/(:num)', 'ProjectsController::delete/$1');
    $routes->post('projects/(:num)/addImage', 'ProjectsController::addImage/$1');
    $routes->post('projects/deleteImage/(:num)', 'ProjectsController::deleteImage/$1');


    //Contact Messages
    $routes->post('contact/submit', 'ContactController::submitMessage');
    $routes->get('messages', 'ContactController::messages');
    $routes->post('messages/reply/(:num)', 'ContactController::reply/$1');
});
