(function () 
{
    'use strict';

    angular.module('single-page-app').factory('ArticleService', ArticleService);
    ArticleService.$inject = ['$timeout', '$filter', '$q'];
    
    function ArticleService($timeout, $filter, $q) 
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
            deferred.resolve(getArticles());
            return deferred.promise;
        }

        function Create(article) 
        {
            var deferred = $q.defer();

            var articles = getArticles();

            var lastUser = articles[articles.length - 1] || { id: 0 };
            article.id = lastUser.id + 1;

            articles.push(article);
            setArticles(articles);

            deferred.resolve({ success: true });

            return deferred.promise;
        }

        function Update(article) 
        {
            var deferred = $q.defer();
            var users = getArticles();

            for (var i = 0; i < users.length; i++) 
            {
                if (users[i].id === article.id) 
                {
                    users[i] = article;
                    break;
                }
            }

            setArticles(users);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) 
        {
            var deferred = $q.defer();
            var users = getArticles();

            for (var i = 0; i < users.length; i++) 
            {
                var article = users[i];
                
                if (article.id === id) 
                {
                    users.splice(i, 1);
                    break;
                }
            }

            setArticles(users);
            deferred.resolve();

            return deferred.promise;
        }

        function getArticles() 
        {
            if(!localStorage.articles)
                localStorage.articles = JSON.stringify([]);

            return JSON.parse(localStorage.articles);
        }

        function setArticles(articles) 
        {
            localStorage.articles = JSON.stringify(articles);
        }
    }
})();