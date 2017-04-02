describe('notification factory', function () {
    var NotificationService, $rootScope;

    beforeEach(function() {

        module('single-page-app');

        inject(function(_AuthenticationService_, _$rootScope_) {
            NotificationService = _AuthenticationService_;
            $rootScope = _$rootScope_;
        });
    });

    it(' exists', function() {
        expect(NotificationService).toBeDefined();
    });
});