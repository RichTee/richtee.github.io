(function () {
    'use strict';

    angular.module('single-page-app').controller('VideoController', VideoController);

    VideoController.$inject = ['VideoService', '$location', 'NotificationService', '$rootScope'];

    function VideoController(VideoService, $location, NotificationService, $rootScope) 
    {
        var vm = this;

        vm.video = null;
        vm.allVideos = [];
        vm.createVideo = createVideo;
        vm.updateVideo = updateVideo;
        vm.deleteVideo = deleteVideo;

        loadallVideos();

        function loadallVideos() 
        {
            VideoService.GetAll()
                .then(function (videos) {
                    vm.allVideos = videos;
                });
        }

        function createVideo(video) 
        {
            VideoService.Create(vm.video)
            .then(function (response) 
            {
                if (response.success) 
                {
                    NotificationService.Success('Video creation successful', true);
                    $location.path('/videos');
                } 
                else 
                {
                    NotificationService.Error(response.message);
                }
            });
        }

        function updateVideo(video) 
        {
            VideoService.Update(video)
            .then(function () {
                loadallVideos();
            });
        }

        function deleteVideo(id) 
        {
            VideoService.Delete(id)
            .then(function () {
                loadallVideos();
            });
        }
    }

})();