namespace App.Dashboard {
    (function() {
        'use strict';

        angular
            .module('app.dashboard')
            .run(appRun);

        appRun.$inject = ['routerHelper'];
        /* @ngInject */
        function appRun(routerHelper: Blocks.Router.IRouterHelper) {
            routerHelper.configureStates(getStates());
        }

        function getStates(): any[] {
            return <any>[
                {
                    state: 'dashboard',
                    config: {
                        url: '/',
                        templateUrl: 'app/dashboard/dashboard.html',
                        controller: 'DashboardController',
                        controllerAs: 'vm',
                        title: 'dashboard',
                        settings: {
                            nav: 1,
                            content: '<i class="fa fa-dashboard"></i> Dashboard'
                        }
                    }
                }
            ];
        }
    })();

}