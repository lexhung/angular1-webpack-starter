import HomeHeroDirective from './home-hero.directive';

describe('HomeHero Directive', () => {
    let element;

    beforeEach(() => {
        angular.module('test', [])
            .directive('aioHomeHero', HomeHeroDirective);
        angular.mock.module('test');
    });

    beforeEach(() => {
        angular.mock.inject(($compile, $rootScope) => {
            const scope = $rootScope.$new();
            const template = '<aio-home-hero get-started-link="test.link"></aio-home-hero>';
            element = $compile(template)(scope);
            scope.$digest();
        });
    });

    it('should populate the correct link in template', () => {
        expect(element.find('.btn-get-started').attr('ui-sref')).toEqual('test.link');
    });
});
