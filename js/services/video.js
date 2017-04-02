(function () 
{
    'use strict';

    angular.module('single-page-app').factory('VideoService', VideoService);
    
    VideoService.$inject = ['$timeout', '$filter', '$q'];

    function VideoService($timeout, $filter, $q) 
    {

        var service = {};

        service.GetAll = GetAll;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() 
        {
            var deferred = $q.defer();
            deferred.resolve(getVideos());
            return deferred.promise;
        }

        function Create(video) 
        {
            var deferred = $q.defer();
            var videos = getVideos();
            var lastVideo = videos[videos.length - 1] || { id: 0 };

            video.id = lastVideo.id + 1;
            videos.push(video);
            
            setVideos(videos);

            deferred.resolve({ success: true });

            return deferred.promise;
        }

        function Update(video) 
        {
            var deferred = $q.defer();
            var users = getVideos();

            for (var i = 0; i < users.length; i++) 
            {
                if (users[i].id === video.id) 
                {
                    users[i] = video;
                    break;
                }
            }

            setVideos(users);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) 
        {
            var deferred = $q.defer();
            var users = getVideos();

            for (var i = 0; i < users.length; i++) 
            {
                var video = users[i];

                if (video.id === id) 
                {
                    users.splice(i, 1);
                    break;
                }
            }

            setVideos(users);
            deferred.resolve();

            return deferred.promise;
        }

        function getVideos() 
        {
            if (!localStorage.videos)
                localStorage.videos = JSON.stringify([]);

            return JSON.parse(localStorage.videos);
        }

        function setVideos(videos) 
        {
            localStorage.videos = JSON.stringify(videos);
        }
    }
})();