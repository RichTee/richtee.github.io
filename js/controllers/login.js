(function () 
{
    'use strict';

    angular.module('single-page-app').controller('LoginController', LoginController);
    LoginController.$inject = ['$location', 'AuthenticationService', 'NotificationService'];

    function LoginController($location, AuthenticationService, NotificationService)
    {
        var vm = this;

        vm.login = login;

        (function init()
        {
            AuthenticationService.ClearCredentials();
        })();

        function login()
        {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response)
            {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    NotificationService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
