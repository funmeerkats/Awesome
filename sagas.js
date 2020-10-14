import { all, call, fork, put, take, putResolve, takeEvery, takeLatest, select } from 'redux-saga/effects';

const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
};

const fetchData = (ms, action) => dispatch =>
    new Promise((resolve) => {
        setTimeout(function () {
            dispatch(action);
            resolve(action.count);
        }, ms);
    });

const fetchData2 = (ms, action) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(action.count);
        }, ms);
    });

const fetchData3 = async (limit) => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
    await delay(3000);
    return await data.json();
};

// worker Saga: будет запускаться на экшены типа `USER_FETCH_REQUESTED`
function* setCount(action) {
    try {
        if(action.data.async){
            const data = yield call(fetchData3,10);
            // const data = yield putResolve(fetchData(3000, {type: 'ASYNC_SAGA', count: action.data.count}));
            // const forkEffect = yield fork(fetchData2, 3000, {type: 'ASYNC_SAGA', count: action.data.count});
            console.log(data);
            yield put({type: 'RESET_PROP'});
            // const asyncFetchCount = yield call(fetchData2, 3000, {type: 'ASYNC_SAGA', count: action.data.count});
            // yield put({type: 'ASYNC_SAGA', count: asyncFetchCount});
            const asyncCount = yield select((state) => state.asyncDataSaga.asyncCount);
            console.log('ASYNC_SAGA', asyncCount);
        } else {

            const putEffect = yield put({type: 'NOT_ASYNC_SAGA', count: action.data.count});
            const notAsyncCount = yield select((state) => state.asyncDataSaga.notAsyncCount);
            console.log('NOT_ASYNC_SAGA', notAsyncCount);
        }
    } catch (e) {
        console.log(e.message);
    }
}

function* setCount2() {

    while(true){
        const takeEffect = yield take('*');
        console.log(takeEffect);
    }

}

function* mySaga() {
    yield all([
        fork(mySagaHelper),
        // fork(setCount2)
    ])
}
//
// export default function* rootSaga() {
//     yield takeEvery("PUT", function*() {
//         yield put(fetchSmth("foo"));
//         console.log("state after PUT", yield select());
//     });
//     yield takeEvery("PUT_RESOLVE", function*() {
//         yield putResolve(fetchSmth("bar"));
//         console.log("state after PUT_RESOLVE", yield select());
//     });
// }

/*
  Запускаем `fetchUser` на каждый задиспатченый экшен `USER_FETCH_REQUESTED`.
  Позволяет одновременно получать данные пользователей.
*/
function* mySagaHelper() {
    yield takeEvery("SAGA_REQUEST", setCount);
}

/*
  В качестве альтернативы вы можете использовать `takeLatest`.

  Не допускает одновременное получение данных пользователей. Если `USER_FETCH_REQUESTED`
  диспатчится в то время когда предыдущий запрос все еще находится в ожидании ответа,
  то этот ожидающий ответа запрос отменяется и срабатывает только последний.
*/
// function* mySaga() {
//     yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default mySaga;
