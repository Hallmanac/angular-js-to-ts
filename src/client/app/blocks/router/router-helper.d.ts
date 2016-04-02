declare namespace Blocks.Router {
    export interface IRouterHelper {
        configureStates: (states: ng.ui.IStateOptions[], otherwisePath?: string) => void;
        getStates: () => ng.ui.IState[];
        stateCounts: { errors: number, changes: number};
    }
}