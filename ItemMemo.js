import React, {memo as memoComp, useEffect, useCallback, useMemo, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

const ItemMemo = memoComp(({parentData, addProp}) => {

    const [item, setItem] = useState(0);
    const [some, setSome] = useState(0);

    const itemMemo = useMemo(() => {
        for(let i = 0; i < 4000000000; i++){

        }
        console.log('loop finished');
        return item;
    }, [item]);

    useEffect(() => {
        console.log('render memo');
    });

    return (
        <View>
            <Text>itemMemo: {itemMemo}</Text>
            <Text>some: {some}</Text>

            <TouchableOpacity onPress={() => setItem(item+1)}>
                <Text>ADD_MEMO</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSome(some+1)}>
                <Text>ADD_SOMETHING</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={addProp}>
                <Text>{parentData}</Text>
            </TouchableOpacity>
        </View>
    )
});

export {ItemMemo}
