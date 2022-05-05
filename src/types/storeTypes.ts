import {IPositionState} from "./positions";
import {IRerenderState} from "./rerender";
import {ICategoryState} from "./category";

export interface IRootReducer {
	positions: IPositionState,
	categories: ICategoryState,
	rerender: IRerenderState,
}