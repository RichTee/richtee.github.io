(function () 
{
    'use strict';

    angular.module('single-page-app').factory('ImageService', ImageService);
    
    ImageService.$inject = ['$timeout', '$filter', '$q'];

    function ImageService($timeout, $filter, $q) 
    {

        var service = {};

        service.GetAll = GetAll;
        service.GetAllNonPromise = GetAllNonPromise;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() 
        {
            var deferred = $q.defer();
            deferred.resolve(getImages());
            return deferred.promise;
        }

        function GetAllNonPromise() 
        {
            return getImages();
        }

        function Create(image) 
        {
            var deferred = $q.defer();
            var images = getImages();
            var lastImage = images[images.length - 1] || { id: 0 };

            image.id = lastImage.id + 1;
            images.push(image);
            
            setImages(images);

            deferred.resolve({ success: true });

            return deferred.promise;
        }

        function Update(image) 
        {
            var deferred = $q.defer();
            var users = getImages();

            for (var i = 0; i < users.length; i++) 
            {
                if (users[i].id === image.id) 
                {
                    users[i] = image;
                    break;
                }
            }

            setImages(users);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) 
        {
            var deferred = $q.defer();
            var users = getImages();

            for (var i = 0; i < users.length; i++) 
            {
                var image = users[i];

                if (image.id === id) 
                {
                    users.splice(i, 1);
                    break;
                }
            }

            setImages(users);
            deferred.resolve();

            return deferred.promise;
        }

        function getImages() 
        {
            if (!localStorage.images)
                localStorage.images = JSON.stringify([]);

            return JSON.parse(localStorage.images);
        }

        function setImages(images) 
        {
            localStorage.images = JSON.stringify(images);
        }
    }
})();