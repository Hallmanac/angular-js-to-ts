namespace Blocks.Logger {
    'use strict';
    
    //-- INTERFACE --\\
    export interface ILogger {
        showToasts: boolean;
        /**
         * Logs an error to the console and pops an error toast.
         */
        error: (message: string, data?, title?: string) => void;
        /**
         * Logs an informational message to the console and pops an informational toast
         */
        info: (message: string, data?, title?: string) => void;
        /**
         * Logs a success message to the console and pops a success toast 
         */
        success: (message: string, data?, title?: string) => void;
        /**
         * Logs a warning to the console and pops a "warning" toast
         */
        warning: (message: string, data?, title?: string) => void;
        /**
         * Log straight to the console bypassing toastr
         */
        log: (...args: any[]) => void;
    }
    
    //-- SERVICE --\\
    
    angular
            .module('blocks.logger')
            .factory('logger', logger);

        logger.$inject = ['$log', 'toastr'];

        /* @ngInject */
        function logger($log: ng.ILogService, toastr) {
            var service = {
                showToasts: true,

                error: error,
                info: info,
                success: success,
                warning: warning,

                // straight to console; bypass toastr
                log: $log.log
            };

            return service;
            /////////////////////

            function error(message, data, title) {
                toastr.error(message, title);
                $log.error('Error: ' + message, data);
            }

            function info(message, data, title) {
                toastr.info(message, title);
                $log.info('Info: ' + message, data);
            }

            function success(message, data, title) {
                toastr.success(message, title);
                $log.info('Success: ' + message, data);
            }

            function warning(message, data, title) {
                toastr.warning(message, title);
                $log.warn('Warning: ' + message, data);
            }
        }
    
}