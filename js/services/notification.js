(function () {
    'use strict';

    angular.module('single-page-app').factory('NotificationService', NotificationService);
    NotificationService.$inject = ['$rootScope'];

    function NotificationService($rootScope) {
        var service = {};

        service.Success = Success;
        service.Error = Error;

        init();

        return service;

        function init() 
        {
            $rootScope.$on('$locationChangeStart', function () 
            {
                clearNotification();
            });

            function clearNotification() 
            {
                var notification = $rootScope.notification;

                if (notification) 
                {
                    if (!notification.keepAfterLocationChange) 
                        delete $rootScope.notification;
                    else 
                        notification.keepAfterLocationChange = false;
                }
            }
        }

        function Success(message, keepAfterLocationChange) 
        {
            $rootScope.notification = {
                message: message,
                type: 'success', 
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) 
        {
            $rootScope.notification = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
    }

})();