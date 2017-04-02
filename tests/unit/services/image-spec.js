describe('image factory', function () {
    var ImageService, timeout_, $filter, $q;
    var mockImage = { id: 1, title: 'imageT', description: 'imageD', image: 'imageI'};
    
    beforeEach(function() {

        module('single-page-app');

        inject(function(_ImageService_, _$timeout_, _$filter_, _$q_) {
            ImageService = _ImageService_;
            $timeout_ = _$timeout_;
            $filter_ = _$filter_;
            $q = _$q_;
        });
    });

    it(' exists', function() {
        expect(ImageService).toBeDefined();
    });

    it(' can get all non Promise images', function() {
        mockImageArray = [];
        mockImageArray.push(mockImage);
        ImageService.Create(mockImage);
        result = ImageService.GetAllNonPromise();
        expect(result[1]).toBe(mockImageArray[1]);
    });

    it(' can create image', function() {
        ImageService.Create(mockImage).then(function(result) {
            expect(result.success).toBe(true);
        });
    });

    it(' can update image', function() {
        ImageService.Update(mockImage).then(function(result) {
            expect(result).toBe(true);
        });
    });

    it(' can delete image', function() {
        ImageService.Delete(mockImage).then(function(result) {
            expect(result).toBe(true);
        });
    });
});