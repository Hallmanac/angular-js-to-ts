namespace App.Dashboard {
    "use strict";
    
    //-- INTERFACE --\\
    interface IDashboardController extends ng.IScope {
        news: {title: string, description: string};
        messageCount: number;
        people: any[];
        title: string;
    }
    
    
    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);
    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q: ng.IQService, dataservice: Core.IDataService, logger: Blocks.Logger.ILogger) {
        var vm = this;
        vm.news = {
            title: 'angularJsToTs',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';
        activate();
        function activate() {
            var promises = [getMessageCount(), getPeople()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }
        function getMessageCount() {
            return dataservice.getMessageCount().then(function(data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }
        function getPeople() {
            return dataservice.getPeople().then(function(data) {
                vm.people = data;
                return vm.people;
            });
        }
    }
}