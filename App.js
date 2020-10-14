/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducersMain';
import MySaga from './sagas';
import {loggingMiddleware} from './customMiddleWare';

import {MainComponent} from './Main';

const isMomHappy = true;

const App = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducers, applyMiddleware(thunk, sagaMiddleware, loggingMiddleware));
    sagaMiddleware.run(MySaga);

// Промис
    const willIGetNewPhone = new Promise(
        (resolve, reject) => {
            if (isMomHappy) {
                const phone = {
                    brand: 'Samsung',
                    color: 'black'
                };
                resolve(phone);
            } else {
                const reason = new Error('mom is not happy');
                reject(reason);
            }

        }
    );

// 2й промис
    async function showOff(phone) {
        return new Promise(
            (resolve, reject) => {
                var message = 'Hey friend, I have a new ' +
                    phone.color + ' ' + phone.brand + ' phone';

                resolve(message);
            }
        );
    }

// Вызываем промис
    async function askMom() {
        try {
            console.log('before asking Mom');

            let phone = await willIGetNewPhone;
            // let message = await showOff(phone);

            showOff(phone).then((message) => {
                console.log(message);
            });

            console.log('after asking mom');
        } catch (error) {
            console.log(error.message);
        }
    }

    const click = async () => {
        // await askMom();
        // addSum(2).then((result1) => {
        //     return result1;
        // }).then((result1) => {
        //     return addSum(result1);
        // }).then((result2) => {
        //     return result2;
        // }).then((finalResult) => {
        //     console.log(finalResult);
        // });

        // (async () => {
        //     const result1 = await helper(2);
        //     const result2 = await helper(result1);
        //     console.log(result2);
        // })();

        let x = xxx();

        console.log(x);
        console.log(1111);

    };

    const xxx = async () => {
        const result1 = await helper(2);
        const result2 = await helper(result1);
        console.log(result2);
        return result2;
    };

    const addSum = () => {
        let x = 0;
        return (num) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                        return resolve(x+=num);
                    },
                    1000
                );

            })
        }

    };

    const helper = addSum();

    const clouser = () => {
        let num = 0;
        return (sumnum) => {
            return num += sumnum;
        }
    };

    const clouserHelper = clouser();

    const bubbleSort = (arr) => {
        for(let i = arr.length-1; i >= 0; i--){
            for(let j = 0; j < i; j++){
                if(arr[j] > arr[j+1]){
                    let temp = arr[j+1];
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }

        console.log(arr);
        return arr;
    };

    const factorial = (n) => {
        let result = 1;
        while(n !== 1){
            result *= n;
            n--;
        }

        return result;
    };

    const factorial2 = (n) => {
        return (n !== 1) ? n*factorial2(n-1) : 1;
    };

    const fib = n => {
        let prev = 0, next = 1;
        for(let i = 0; i < n; i++){
            let temp = next;
            next = prev + next;
            prev = temp;
        }

        console.log('END', prev);
        return prev;
    };

    // class Animal {
    //     constructor(name){
    //         this.name = name;
    //     }
    //
    //     getName () {
    //         console.log(`Animal's name is ${this.name}`)
    //     }
    // }
    //
    // class Cat extends Animal {
    //     constructor(name, color){
    //         super(name);
    //         this.color = color;
    //     }
    //
    //     voice(){
    //         console.log(`${this.name} says ${this.color}`);
    //     };
    // }
    const Animal = function(name){
        this.name = name;
    };
    Animal.prototype.getName = function(){
        console.log(`Animal's name is ${this.name}`);
    };

    const Cat = function(name, color){
        // this.constructor.super.call(this, name);
        Animal.call(this, name);
        this.color = color;
    };

    function inherit(child, parent){
        let F = function(){};
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.super = parent;
    }
    // inherit(Cat, Animal);
    Object.setPrototypeOf(Cat.prototype, Animal.prototype);

    Cat.prototype.voice = function(){
        console.log(`${this.name} says ${this.color}`);
    };

    const xxx2 = () => {
        const myCat = new Cat('FFF', 'RED');

        myCat.voice();

    };



    const request = async () => {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                title: 'foo2',
                body: 'bar2',
                userId: 1,
            })
        });
        let data = await response.json();
        console.log(data);
    };

    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <TouchableOpacity onPress={click}>
                    <Text>Ask</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => bubbleSort([3,5,2,1,0,4,7,2])}>
                    <Text>sort</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={xxx2}>
                    <Text>xxx2</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => fib(4)}>
                    <Text>fib</Text>
                </TouchableOpacity>

                <Provider store={store}>
                    <MainComponent />
                </Provider>
            </SafeAreaView>
        </>
    );
};

export default App;
