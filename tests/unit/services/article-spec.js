describe('article factory', function () {
    var ArticleService, timeout_, $filter, $q, UserService, ImageService, VideoService;
    var mockArticle = {id: 1, title: 'articleT', description: 'articleD', image: 1, video: 1, author: 1};
    var mockImage = { id: 1, title: 'imageT', description: 'imageD', image: 'imageI'};
    var mockVideo = { id: 1, title: 'videoT', description: 'videoD', source: 'videoS'};
    var mockUser = {id: 1, firstName: 'John', lastName: 'Doe', username: 'test', password: 'test'};

    beforeEach(function() {

        module('single-page-app');

        inject(function(_VideoService_, _$timeout_, _$filter_, _$q_) {
            VideoService = _VideoService_;
        });

        inject(function(_ImageService_, _$timeout_, _$filter_, _$q_) {
            ImageService = _ImageService_;
        });

        inject(function(_UserService_, _$timeout_, _$filter_, _$q_) {
            UserService = _UserService_;
        });
        inject(function(_ArticleService_, _$timeout_, _$filter_, _$q_, _UserService_, _ImageService_, _VideoService_) {
            ArticleService = _ArticleService_;
            $timeout_ = _$timeout_;
            $filter_ = _$filter_;
            $q = _$q_;
        });
    });

    it(' exists', function() {
        expect(ArticleService).toBeDefined();
    });

    it(' can get all articles', function() {
        ImageService.Create(mockImage);
        VideoService.Create(mockVideo);
        UserService.Create(mockUser);
        ArticleService.Create(mockArticle);

        ArticleService.GetAll().then(function(result) {
            expect(result).toBe(true);
        });

        // Clean Up
        ImageService.Delete(mockImage.id);
        VideoService.Delete(mockVideo.id);
        UserService.Delete(mockUser.id);
    });

    it(' can create article', function() {
        ArticleService.Create(mockArticle).then(function(result) {
            expect(result.success).toBe(true);
        });
    });
});