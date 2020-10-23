import createRouter from 'router5'
import loggerPlugin from 'router5-plugin-logger'

function configureRouter() {
    const cache = new Map();
    return () => {
        if(cache.has('router')){
            return cache.get('router');
        } else {
            const router = createRouter(
                [
                    { name: 'home', path: '/home'},
                    { name: 'thunk', path: '/thunk/:id' },
                ], {
                    defaultRoute: 'home'
                });

            router.usePlugin(loggerPlugin);
            router.start();
            cache.set('router', router);
            return router
        }
    }
}

const callRouter = configureRouter();
export default callRouter;
