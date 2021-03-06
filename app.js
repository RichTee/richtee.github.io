﻿(function () {
    'use strict';

    angular.module('single-page-app', ['ngRoute', 'ngCookies']).config(config).run(run);
    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) 
    {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'partials/admin/home.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'partials/login.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'partials/register.html',
                controllerAs: 'vm'
            })

            .when('/users', {
                controller: 'HomeController',
                templateUrl: 'partials/admin/user/users.html',
                controllerAs: 'vm'
            })
            
            .when('/articles', {
                controller: 'ArticleController',
                templateUrl: 'partials/admin/article/articles.html',
                controllerAs: 'vm'
            })

            .when('/clientArticles', {
                controller: 'ArticleController',
                templateUrl: 'partials/articles.html',
                controllerAs: 'vm'
            })

            .when('/addArticle', {
                controller: 'ArticleController',
                templateUrl: 'partials/admin/article/addArticle.html',
                controllerAs: 'vm'
            })

            .when('/images', {
                controller: 'ImageController',
                templateUrl: 'partials/admin/image/images.html',
                controllerAs: 'vm'
            })

            .when('/clientImages', {
                controller: 'ImageController',
                templateUrl: 'partials/images.html',
                controllerAs: 'vm'
            })

            .when('/addImage', {
                controller: 'ImageController',
                templateUrl: 'partials/admin/image/addImage.html',
                controllerAs: 'vm'
            })


            .when('/videos', {
                controller: 'VideoController',
                templateUrl: 'partials/admin/video/videos.html',
                controllerAs: 'vm'
            })

            .when('/clientVideos', {
                controller: 'VideoController',
                templateUrl: 'partials/videos.html',
                controllerAs: 'vm'
            })

            .when('/addVideo', {
                controller: 'VideoController',
                templateUrl: 'partials/admin/video/addVideo.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];

    function run($rootScope, $location, $cookies, $http) 
    {
        $rootScope.globals = $cookies.getObject('globals') || {};

        if ($rootScope.globals.currentUser)
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/clientArticles', '/clientVideos']) === -1;
            var loggedIn = $rootScope.globals.currentUser;

            if (restrictedPage && !loggedIn)
                $location.path('/login');
        });
    }

})();