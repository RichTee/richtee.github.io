(function () {
    'use strict';

    angular.module('single-page-app').controller('ImageController', ImageController);

    ImageController.$inject = ['ImageService', '$location', 'NotificationService', '$rootScope'];

    function ImageController(ImageService, $location, NotificationService, $rootScope) 
    {
        var vm = this;

        vm.image = null;
        vm.allImages = [];
        vm.createImage = createImage;
        vm.updateImage = updateImage;
        vm.deleteImage = deleteImage;

        loadallImages();

        function loadallImages() 
        {
            ImageService.GetAll()
                .then(function (videos) {
                    vm.allImages = videos;
                });
        }

        function createImage(image) 
        {
            ImageService.Create(vm.image)
            .then(function (response) 
            {
                if (response.success) 
                {
                    NotificationService.Success('image creation successful', true);
                    $location.path('/images');
                } 
                else 
                {
                    NotificationService.Error(response.message);
                }
            });
        }

        function updateImage(image) 
        {
            ImageService.Update(image)
            .then(function () {
                loadallImages();
            });
        }

        function deleteImage(id) 
        {
            ImageService.Delete(id)
            .then(function () {
                loadallImages();
            });
        }
    }

})();