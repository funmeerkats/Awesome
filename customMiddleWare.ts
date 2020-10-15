interface actionObj {
    type: string,
    [key: string]: number | string
}

const loggingMiddleware = (store: any) => {
    return (next: (action: actionObj) => void) => (action: actionObj) => {
        // console.log(store.getState());
        next(action);
    }
};

export {loggingMiddleware}
