import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ItemMemo} from './ItemMemo';
import {Thunk2} from './Thunk2';
import {Saga} from './Saga';

import {
    View,
    Text,
    TouchableOpacity, Button,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

interface stateObj {
    stateApp: stateAppObj
}

interface stateAppObj {
    defaultProp: string,
    [key: string]: number | string
}


const Main2Component = (props: any) => {

    const dispatch = useDispatch();
    const stateApp = useSelector((state: stateObj): stateAppObj => state.stateApp);
    const countRef = useRef(Object.keys(stateApp).length-1);
    const [data, setData] = useState(11);
    const {navigation} = props;

    const addProp = useCallback((): void => {
        navigation.navigate('Thunk2')
        // countRef.current += 1;
        // dispatch({type: 'ADD_PROP', data: {[`prop_${countRef.current}`]: countRef.current}});
    }, []);

    const deleteProp = (): void | boolean => {
        if(countRef.current === 0) return false;
        dispatch({type: 'REMOVE_PROP', propName: `prop_${countRef.current}`});
        countRef.current -= 1;
    };

    return (
            <Stack.Navigator>
                <Stack.Screen name="MainTitle2" component={
                    () => {
                        return (
                            <View style={{
                                borderWidth: 1,
                                borderColor: 'red',
                                paddingTop: 20,
                                flex: 1,
                            }}>
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
                    }
                }
              options={{
                  headerLeft: () => (
                      <Button
                          onPress={() => navigation.openDrawer()}
                          title="Menu"
                      />
                  ),
              }}
                />
                <Stack.Screen name="Thunk2" component={Thunk2} />
            </Stack.Navigator>
    )
};

export {Main2Component}
