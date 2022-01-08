import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import {Thunk2} from './Thunk2';
import {MainScreen2Component} from './MainScreen2Component';

import {
    Button,
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
    const {navigation} = props;

    return (
            <Stack.Navigator>
                <Stack.Screen name="MainTitle2" component={MainScreen2Component}
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
