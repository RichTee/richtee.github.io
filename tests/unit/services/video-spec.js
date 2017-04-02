describe('video factory', function () {
    var VideoService, timeout_, $filter, $q;
    var mockVideo = { id: 1, title: 'videoT', description: 'videoD', source: 'videoS'};

    beforeEach(function() {

        module('single-page-app');

        inject(function(_VideoService_, _$timeout_, _$filter_, _$q_) {
            VideoService = _VideoService_;
            $timeout_ = _$timeout_;
            $filter_ = _$filter_;
            $q = _$q_;
        });
    });

    it(' exists', function() {
        expect(VideoService).toBeDefined();
    });

    it(' can get all non Promise images', function() {
        mockVideoArray = [];
        mockVideoArray.push(mockVideo);
        VideoService.Create(mockVideo);
        result = VideoService.GetAllNonPromise();
        expect(result[1]).toBe(mockImageArray[1]);
    });

    it(' can create video', function() {
        VideoService.Create(mockVideo).then(function(result) {
            expect(result.success).toBe(true);
        });
    });

    it(' can update video', function() {
        VideoService.Update(mockVideo).then(function(result) {
            expect(result).toBe(true);
        });
    });

    it(' can delete video', function() {
        VideoService.Delete(mockVideo).then(function(result) {
            expect(result).toBe(true);
        });
    });
});