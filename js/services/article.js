(function () 
{
    'use strict';

    angular.module('single-page-app').factory('ArticleService', ArticleService);
    ArticleService.$inject = ['$timeout', '$filter', '$q', 'UserService', 'ImageService', 'VideoService'];
    
    function ArticleService($timeout, $filter, $q, UserService, ImageService, VideoService)
    {

        var service = {};

        service.GetAll = GetAll;
        service.GetSpecific = GetSpecific;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() 
        {
            var deferred = $q.defer();
            var articles = getArticles();
            // Not performance friendly, better to loop once. But too lazy to give a *
            articles = attachUser(articles);
            articles = attachImage(articles);
            articles = attachVideo(articles);
            deferred.resolve(articles);

            return deferred.promise;
        }

        function GetSpecific(query)
        {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getArticles(), { title: query });
            var article = filtered.length ? filtered[0] : null;
            var articles = [];
            article !== null ? articles.push(article) : false;
            // Not performance friendly, better to loop once. But too lazy to give a *
            articles = attachUser(articles);
            articles = attachImage(articles);
            articles = attachVideo(articles);
            deferred.resolve(articles);

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
            var articles = getArticles();

            for (var i = 0; i < articles.length; i++) 
            {
                if (articles[i].id === article.id) 
                {
                    articles[i] = article;
                    break;
                }
            }

            setArticles(articles);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) 
        {
            var deferred = $q.defer();
            var articles = getArticles();

            for (var i = 0; i < articles.length; i++) 
            {
                var article = articles[i];
                
                if (article.id === id) 
                {
                    articles.splice(i, 1);
                    break;
                }
            }

            setArticles(articles);
            deferred.resolve();

            return deferred.promise;
        }

        function attachUser(articles) 
        {
            var users = UserService.GetAllNonPromise();

            for (var i = 0; i < articles.length; i++) 
            {
                for (var j = 0; j < users.length; j++)
                {
                    if (parseInt(articles[i].author) === parseInt(users[j].id))
                        articles[i].author = users[j].firstName + ' ' + users[j].lastName;
                }
            }

            return articles;
        }

        function attachImage(articles) 
        {
            var images = ImageService.GetAllNonPromise();

            for (var i = 0; i < articles.length; i++) 
            {
                for (var j = 0; j < images.length; j++)
                {
                    if (parseInt(articles[i].image) === parseInt(images[j].id))
                        articles[i].image = images[j];
                }
            }

            return articles;
        }

        function attachVideo(articles)
        {
            var videos = VideoService.GetAllNonPromise();

            for (var i = 0; i < articles.length; i++) 
            {
                for (var j = 0; j < videos.length; j++)
                {
                    if (parseInt(articles[i].video) === parseInt(videos[j].id))
                        articles[i].video = videos[j];
                }
            }

            return articles;
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