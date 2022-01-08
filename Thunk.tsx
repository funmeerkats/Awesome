import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {createAsyncActionHelper, createNotAsyncActionHelper} from './asyncReducer';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

let asyncCount = 0;
let notAsyncCount = 0;

interface stateObj {
    asyncDataThunk: number
}

let xxx: boolean = true;
const Thunk = (props: any) => {
    const [stateData, setStateData] = useState(0);
    const dispatch = useDispatch();
    const thunkData = useSelector((state: stateObj): number => state.asyncDataThunk);
    const refData = useRef(null);
    const {navigation} = props;

    useEffect(() => {
        console.log('render thunk', thunkData);
    });

    useLayoutEffect(() => {
        console.log('render thunk useLayoutEffect', thunkData);
        if(!xxx){
            setStateData(20);
        }
        xxx = false;
    }, [thunkData]);

    const actionClick = () => {
        navigation.push('Thunk');
        // promiseAll([
        //     Promise.resolve(true),
        //     Promise.resolve(1),
        //     Promise.resolve('string'),
        //     Promise.resolve({}),
        //     // ...
        // ]).then((result) => {
        //     console.log('-------', result);
        // });

        // asyncCount += 10;
        // dispatch(createAsyncActionHelper(asyncCount));
    };

    function promiseAll(promises: object[]) {
        // TODO: implement function body
        return Promise.all(promises).then((resolveData) => {
            return resolveData;
        });
    }

    function sum(a: number, b: number) {
        return a + b;
    }

    let memoizeFunc = memoize(sum);

    // console.log(memoizeFunc(1,2)); // return 3
    // console.log(memoizeFunc(1,2)); // return memoize 3
    // console.log(memoizeFunc(2,2)); // return 4
    // console.log(memoizeFunc(1,2)); // return memoize 3

    function memoize(func: (...args: number[]) => number) {
        // TODO: implement function
        const cache = new Map();

        return function (...args: number[]) {
            let key = JSON.stringify(args);

            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = func(...args);
            cache.set(key, result);

            return result;

        }

    }

    interface IActionReducer {
        type?: string,
        action?: number | string | object
    }

    interface IInitialState {
        [key: string]: number | string | object
    }

    interface IReducer {
        (state: {} | undefined, action: IActionReducer): IInitialState
    }

    type listenerType = () => void;

    const createStore = (reducer: IReducer, initialState: IInitialState) => {
        let state = initialState || reducer(undefined, {});
        let listeners: listenerType[] = [];

        return {
            getStore: () => state,
            dispatch: (action: IActionReducer) => {
                state = reducer(state, action);

                listeners.forEach((listener: listenerType) => {
                    listener()
                });
            },

            subscribe: (newListener: listenerType) => {
                listeners.push(newListener);

                return () => {
                    listeners = listeners.filter((l: listenerType) => l !== newListener)
                }
            }
        }
    };

    const actionNotAsyncClick = () => {
        notAsyncCount += 20;
        dispatch(createNotAsyncActionHelper(notAsyncCount));
    };
    class HttpError extends Error {
        response: any;
        constructor(response: any) {
            super(`${response.status} for ${response.url}`);
            this.name = 'HttpError';
            this.response = response;
        }
    }

    const loadJson = async (url: string) => {
        const response: any = await fetch(url);
        if (response.status == 200) {
            return await response.json();
        } else {
            throw new Error(response.status);
        }
    };

    const func23 = (func: (...args: number[]) => number) => {
        let cache = new Map();

        return (...args: number[]) => {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                return Promise.resolve(cache.get(key)); // (*)
            }

            return new Promise((resolve, reject) => {
                const result = func(...args);
                cache.set(key, result);
                resolve(result);
            })
        }
    };

    const sum2 = (a: number, b: number) => a + b;
    const func23Helper = func23(sum2);
    const func23Click = async () => {
        const result = await func23Helper(2, 3);

        func23Helper(2, 3).then((data) => {
            console.log(data);
        });
    };

    return (
        <View style={{marginVertical: 20, borderWidth: 1, borderColor: 'blue'}}>
            <Text ref={refData}>Thunk - {thunkData}; stateData - {stateData}</Text>
            <TouchableOpacity onPress={actionClick}>
                <Text style={{textAlign: 'center'}}>Send async Thunk</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={actionNotAsyncClick}>
                <Text style={{textAlign: 'center'}}>Send not async Thunk</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={func23Click}>
                <Text style={{textAlign: 'center'}}>func23Click</Text>
            </TouchableOpacity>
        </View>
    )
};

export {Thunk}
