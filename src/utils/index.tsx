import { store } from '@store/index';
import { IAction, IThunkAction } from 'interfaces';

export function dispatch<T extends IAction>(action: T | IThunkAction) {
    if ((action as IAction).type) {
        return store.dispatch(action as IAction);
    }
    return store.dispatch<{ type: string }>(action as IThunkAction);
}

export function isEmpty(obj: object) {
    if (Object.keys(obj).length <= 0 || !obj) {
        return true;
    }
    return false;
}
