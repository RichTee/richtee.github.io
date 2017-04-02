(function () {
    'use strict';

    angular
        .module('single-page-app')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['ArticleService', '$location', 'NotificationService', '$rootScope'];
    function ArticleController(ArticleService, $location, NotificationService, $rootScope) {
        var vm = this;

        vm.article = null;
        vm.allArticles = [];
        vm.createArticle = createArticle;
        vm.updateArticle = updateArticle;
        vm.deleteArticle = deleteArticle;

        loadAllArticles();

        function loadAllArticles() 
        {
            ArticleService.GetAll()
            .then(function (articles) {
                vm.allArticles = articles;
            });
        }

        function createArticle(article) 
        {
            ArticleService.Create(vm.article)
                .then(function (response) {
                    if (response.success) 
                    {
                        NotificationService.Success('Article creation successful', true);
                        $location.path('/articles');
                    } 
                    else 
                    {
                        NotificationService.Error(response.message);
                    }
                });
        }

        function updateArticle(article) 
        {
            ArticleService.Update(article)
            .then(function () {
                loadAllArticles();
            });
        }

        function deleteArticle(id) 
        {
            ArticleService.Delete(id)
            .then(function () {
                loadAllArticles();
            });
        }
    }

})();