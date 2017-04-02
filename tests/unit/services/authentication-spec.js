describe('authentication factory', function () {
    var AuthenticationService, $http, $cookies, $rootScope, $timeout, UserService;

    beforeEach(function() {

        module('single-page-app');

        inject(function(_AuthenticationService_, _$http_, _$cookies_, _$rootScope_, _$timeout_, _UserService_) {
            AuthenticationService = _AuthenticationService_;
            $http = _$http_;
            $cookies = _$cookies_;
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;
            UserService = _UserService_;
        });
    });

    it(' exists', function() {
        expect(AuthenticationService).toBeDefined();
    });
});