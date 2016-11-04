import angular from 'angular';

appHomeRun.$inject = ['RouterHelper'];
function appHomeRun (RouterHelper) {
    RouterHelper.configureStates(getStates());
}

function getStates () {
    return [
        {
            state: 'root.layout.home',
            config: {
                url: '/',
                views: {
                    'main@root': {
                        templateProvider: ['$q', ($q) => {
                            return $q((resolve) => {
                                require.ensure([], () => {
                                    return resolve(require('./home.jade'));
                                }, 'home');
                            });
                        }]
                    },
                    'sidebar@root': {},
                    'breadcrumb@root': {}
                },
                data: {
                    title: 'Home',
                    _class: 'home'
                },
                resolve: {
                    loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                $ocLazyLoad.load({name: require('./index').default.name});
                                return resolve();
                            }, 'home');
                        });
                    }]
                }
            }
        }
    ];
}

export default angular.module('app.routes.home', [])
    .run(appHomeRun);
