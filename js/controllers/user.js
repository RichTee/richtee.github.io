﻿(function () {
    'use strict';

    angular
        .module('single-page-app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        init();

        function init() 
        {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() 
        {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
            .then(function (user) {
                vm.user = user;
            });
        }

        function loadAllUsers() 
        {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function updateUser(user) 
        {
            UserService.Update(user)
            .then(function () {
                loadAllUsers();
            });
        }

        function deleteUser(id) 
        {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();