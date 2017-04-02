(function ()
{
    'use strict';

    angular.module('single-page-app').controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'NotificationService'];
    function RegisterController(UserService, $location, $rootScope, NotificationService) 
    {
        var vm = this;

        vm.register = register;

        function register() 
        {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) 
                {
                    if (response.success) 
                    {
                        NotificationService.Success('Registration successful', true);
                        $location.path('/login');
                    } 
                    else
                    {
                        NotificationService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
