describe('article service', function () {
  var ArticleService;

  beforeEach(angular.mock.module('single-page-app'));

  beforeEach(inject(function(_ArticleService_) {
    ArticleService = _ArticleService_;
  }));

  it('factory exists', function() {
    expect(ArticleService).toBeDefined();
  });
});