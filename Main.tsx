import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import {Thunk} from './Thunk';
import {MainScreenComponent} from './MainScreenComponent';

import {
    Button
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const MainComponent = (props: any) => {
    const {navigation} = props;

    return (
        <Stack.Navigator>
            <Stack.Screen name="MainTitle1" component={MainScreenComponent}
            options={{
              headerLeft: () => (
                  <Button
                      onPress={() => navigation.openDrawer()}
                      title="Menu"
                  />
              ),
            }}
            />
            <Stack.Screen name="Thunk" component={Thunk} />
        </Stack.Navigator>
    )
};

export {MainComponent}
