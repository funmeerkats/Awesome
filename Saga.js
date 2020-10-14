import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreatorForSaga} from './asyncReducer';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

let asyncCount = 0;
let notAsyncCount = 0;
const Saga = (props) => {
    const dispatch = useDispatch();
    const sagaData = useSelector(state => state.asyncDataSaga);

    useEffect(() => {
        console.log('render saga', sagaData);
    }, [sagaData]);

    const actionClick = () => {
        asyncCount += 10;
        dispatch(actionCreatorForSaga('SAGA_REQUEST', {async: true, count: asyncCount}));
    };

    const actionNotAsyncClick = () => {
        notAsyncCount += 20;
        dispatch(actionCreatorForSaga('SAGA_REQUEST', {async: false, count: notAsyncCount}));
    };

    return (
        <View style={{marginVertical: 20, borderWidth: 1, borderColor: 'blue'}}>
            <Text>Saga</Text>
            <TouchableOpacity onPress={actionClick}>
                <Text style={{textAlign: 'center'}}>Send async Saga</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={actionNotAsyncClick}>
                <Text style={{textAlign: 'center'}}>Send not async Saga</Text>
            </TouchableOpacity>
        </View>
    )
};

export {Saga}
