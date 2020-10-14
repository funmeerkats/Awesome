import React, {useCallback, useMemo, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ItemMemo} from './ItemMemo';
import {Thunk} from './Thunk';
import {Saga} from './Saga';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

const MainComponent = (props) => {
    const dispatch = useDispatch();
    const stateApp = useSelector(state => state.stateApp);
    const countRef = useRef(Object.keys(stateApp).length-1);
    const [data, setData] = useState(11);

    const addProp = useCallback(() => {
        countRef.current += 1;
        dispatch({type: 'ADD_PROP', data: {[`prop_${countRef.current}`]: countRef.current}});
    }, []);

    const deleteProp = () => {
        if(countRef.current === 0) return false;
        dispatch({type: 'REMOVE_PROP', propName: `prop_${countRef.current}`});
        countRef.current -= 1;
    };

    return (
        <View style={{borderWidth: 1, borderColor: 'red', marginTop: 20}}>
            <TouchableOpacity onPress={addProp}>
                <Text>ADD PROP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteProp}>
                <Text>DELETE PROP</Text>
            </TouchableOpacity>

            <View style={{borderWidth: 1, borderColor: 'green', marginVertical: 20}}>
                {Object.keys(stateApp) && Object.keys(stateApp).map((item, index) => {
                    return (
                        <Text key={index} style={{textAlign: 'center', color: (index === 0 ? 'red' : 'black')}}>{stateApp[item]}</Text>
                    )
                })}
            </View>

            <ItemMemo parentData={data} addProp={addProp} />

            <Thunk />

            <Saga />
        </View>
    )
};

export {MainComponent}
