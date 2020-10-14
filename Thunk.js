import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createAsyncActionHelper, createNotAsyncActionHelper} from './asyncReducer';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

let asyncCount = 0;
let notAsyncCount = 0;

const Thunk = (props) => {
    const dispatch = useDispatch();
    const thunkData = useSelector(state => state.asyncDataThunk);

    useEffect(() => {
        console.log('render thunk', thunkData);
    }, [thunkData]);

    const actionClick = () => {
        asyncCount += 10;
        dispatch(createAsyncActionHelper(asyncCount));
    };

    const actionNotAsyncClick = () => {
        notAsyncCount += 20;
        dispatch(createNotAsyncActionHelper(notAsyncCount));
    };

    return (
        <View style={{marginVertical: 20, borderWidth: 1, borderColor: 'blue'}}>
            <Text>Thunk</Text>
            <TouchableOpacity onPress={actionClick}>
                <Text style={{textAlign: 'center'}}>Send async Thunk</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={actionNotAsyncClick}>
                <Text style={{textAlign: 'center'}}>Send not async Thunk</Text>
            </TouchableOpacity>
        </View>
    )
};

export {Thunk}
