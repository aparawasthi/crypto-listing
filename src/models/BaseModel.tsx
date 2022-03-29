import {
    removeInstance,
    saveInstance,
    updateInstance,
    deleteAllInstances,
    saveAllInstances,
} from '@actions/index';

import { INVALID_INSTANCE_CANNOT_SAVE } from '@constants/actions';
import { isEmpty } from '@utils/index.tsx';
import { store } from '@store/index';

function generateInstanceMap(instances: any) {
    if (isEmpty(instances)) {
        return null;
    }

    const instanceMap: any = {};

    instances.forEach((instance: any) => {
        if (!(instance instanceof BaseModel)) {
            throw new Error(INVALID_INSTANCE_CANNOT_SAVE);
        }
        instanceMap[instance.getStoreKey()] = instance;
    });

    return instanceMap;
}

export class BaseModel<P> {

    constructor(public props: P & { id?: string; isOnList?: boolean }) {
        this.resource = this.constructor['resource'];
        this.props = props;
        this.props.isOnList = true;
    }
    static resource: string;
    static constraint: any;
    static defaultProps: any;
    resource: string;

    public static get(id: string, state: any = store.getState()) {
        const modelState = state.models;
        if (!modelState) {
            return;
        }
        const storeKey = `${this.resource}${id}`;
        return modelState.toJS ? modelState.get(storeKey) : modelState[storeKey];
    }

    public static getAllFormIds(): string[] {
        const instances = this.list();
        const ids: any = [];
        instances.forEach((instance: any) => {
            ids.concat(instance.props.id);
        });
        return ids;
    }

    public static getBy(reference: string, value: string) {
        const instances = this.list();
        return instances.find((instance: any) => {
            if (instance.props[reference] === value) {
                return instance;
            }
        });
    }

    public static getAllBy(reference: string, value: string) {
        const instances = this.list();
        return instances.filter((instance: any) => {
            return instance.props[reference] === value;
        });
    }

    public static getFiltered(filterBy: string, state: any = store.getState()) {
        return state.models.filter((instance: any) => instance.props.filterBy === filterBy).toArray();
    }

    public static list(state: any = store.getState()) {
        return state.models
            .filter((instance: any) => {
                return instance && instance.resource === this.resource;
            })
            .toList()
            .toArray();
    }

    public static getAllByType(type: any, state: any = store.getState()) {
        const instances = this.list();
        return instances.filter((instance: any) => {
            return instance.props.type === type;
        });
    }

    public static saveAll<T extends BaseModel<{}>>(instances: T[]): void {
        for (const instance of instances) {
            if (!validateObject(instance, this['constraints'])) {
                throw Error;
            }
        }
        saveAllInstances(generateInstanceMap(instances));
    }

    public static deleteAll(instances: any = this.list()) {
        deleteAllInstances(
            instances.map((instance: any) => {
                return instance.getStoreKey();
            }),
        );
    }

    public static deleteAllFiltered<T extends BaseModel<{}>>(instances: T[], filterBy: string): void {
        instances.map((instance: any) => removeInstance(`${filterBy}${instance.props.id}`));
    }

    public static last() {
        const modelState = store.getState().models;
        if (isEmpty(modelState)) {
            return null;
        }
        return modelState.findLast((instance: any) => instance.resource === this.resource);
    }

    public getStoreKey(): string {
        return `${this.resource}${this.props.id}`;
    }

    public $save(): BaseModel<P> {
        saveInstance(this, this.getStoreKey(), this.resource);
        return this;
    }

    public $update(key: string = ''): BaseModel<P> {
        updateInstance(`${key ? `${this.resource}${key}` : this.getStoreKey()}`, this);
        return this;
    }

    public $delete(casecade: boolean = true): void {
        removeInstance(this.getStoreKey());
    }
}

function validateObject(obj: any, rules: any): boolean {
    for (const prop in rules) {
        if (rules.hasOwnProperty(prop)) {
            const constraint = rules[prop];
            if (!constraint(obj[prop])) {
                return false;
            }
        }
    }
    return true;
}
