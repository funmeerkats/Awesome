const loggingMiddleware = (store) => {
    return (next) => (action) => {
        // console.log(store.getState());
        next(action);
    }
};

export {loggingMiddleware}
