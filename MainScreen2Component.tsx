import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ItemMemo} from './ItemMemo';
import {Thunk} from './Thunk';
import {Saga} from './Saga';

import {
    View,
    Text,
    TouchableOpacity,
    Button
} from 'react-native';

interface stateObj {
    stateApp: stateAppObj
}

interface stateAppObj {
    defaultProp: string,
    [key: string]: number | string
}

const MainScreen2Component = (props: any) => {

    const dispatch = useDispatch();
    const stateApp = useSelector((state: stateObj): stateAppObj => state.stateApp);
    const countRef = useRef(Object.keys(stateApp).length-1);
    const [data, setData] = useState(11);
    const {navigation} = props;

    const goThunk = () => navigation.navigate('Thunk2');

    const addProp = useCallback((): void => {
        countRef.current += 1;
        dispatch({type: 'ADD_PROP', data: {[`prop_${countRef.current}`]: countRef.current}});
    }, []);

    const deleteProp = (): void | boolean => {
        if(countRef.current === 0) return false;
        dispatch({type: 'REMOVE_PROP', propName: `prop_${countRef.current}`});
        countRef.current -= 1;
    };

    return (
        <View style={{
            borderWidth: 1,
            borderColor: 'red',
            paddingTop: 20,
            flex: 1,
        }}>
            <TouchableOpacity onPress={goThunk}>
                <Text>Go to thunk</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addProp}>
                <Text>ADD PROP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteProp}>
                <Text>DELETE PROP</Text>
            </TouchableOpacity>

            <View style={{borderWidth: 1, borderColor: 'green', marginVertical: 20}}>
                {Object.keys(stateApp) && Object.keys(stateApp).map((item, index) => {
                    let itemNumber: string = stateApp[item].toString();
                    return (
                        <Text key={index} style={{textAlign: 'center', color: (index === 0 ? 'red' : 'black')}}>{itemNumber}</Text>
                    )
                })}
            </View>

            {/*<ItemMemo parentData={data} addProp={addProp} />*/}

            {/*<Thunk />*/}

            <Saga />
        </View>
    )
};

export {MainScreen2Component}
