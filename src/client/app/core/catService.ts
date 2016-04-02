namespace App.Core {
    "use strict";

    import ng = angular;

    //-- INTERFACES --\\
    export interface IcatService {
        getRandomCat: () => ng.IPromise<any>;
    }

    angular.module("app.core").factory("catService", catService);


    /** @ngInject */
    export function catService($q: ng.IQService): IcatService {
        let apiKey = "NzgxMzU"

        return {
            getRandomCat: _getRandomCat
        }

        //-- FUNCTIONS --\\

        function _getRandomCat(): ng.IPromise<any> {
            let me = this;
            return $q.resolve({
                name: 'Renegade',
                type: 'Bengal'
            });
        }
    }
}
