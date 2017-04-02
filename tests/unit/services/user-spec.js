describe('user factory', function () {
    var UserService, timeout_, $filter, $q;
    var mockUser = {id: 1, firstName: 'John', lastName: 'Doe', username: 'test', password: 'test'};
    
    beforeEach(function() {

        module('single-page-app');

        inject(function(_UserService_, _$timeout_, _$filter_, _$q_) {
            UserService = _UserService_;
            $timeout_ = _$timeout_;
            $filter_ = _$filter_;
            $q = _$q_;
        });
    });

    it(' exists', function() {
        expect(UserService).toBeDefined();
    });

    it(' can get all non Promise users', function() {
        mockUserArray = [];
        mockUserArray.push(mockUser);
        UserService.Create(mockUser);
        result = UserService.GetAllNonPromise();
        expect(result[1]).toBe(mockUserArray[1]);
    });

    it(' can get user by username', function() {
        mockUserArray = [];
        mockUserArray.push(mockUser);
        UserService.Create(mockUser);
        result = UserService.GetByUsername(mockUser.username);
        expect(result[1]).toBe(mockUserArray[1]);
    });
});