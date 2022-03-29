import { Middleware } from 'redux';

export const logger: Middleware = () => (next: any) => (action: any) => {
    if (process.env.NODE_ENV !== 'production') {
    }
    return next(action);
};
