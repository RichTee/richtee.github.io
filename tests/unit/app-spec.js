describe('config and run blocks', function () {
    var routeProvider, messenger;

    beforeEach(function () {
        module('ngRoute');
        module('ngCookies');

        module(function ($provide, $routeProvider) {
            routeProvider = $routeProvider;
            spyOn(routeProvider, 'when').and.callThrough();
            spyOn(routeProvider, 'otherwise').and.callThrough();

            messenger = {
                send: jasmine.createSpy('send')
            };
            $provide.value('messenger', messenger);
        });

        module('single-page-app');
    });

    beforeEach(inject());

    it('should have called registered 2 routes', function () {
        //Otherwise internally calls when. So, call count of when has to be 3
        expect(routeProvider.when.callCount).toBe(3);
    });

    it('should have registered a default route', function () {
        expect(routeProvider.otherwise).toHaveBeenCalled();
    });
});