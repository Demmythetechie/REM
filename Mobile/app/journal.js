import LottieView from 'lottie-react-native';
import React, { useState, useEffect } from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';




export default function Homepage() {

    const [queryFocus, setQuery] = useState(false);
    const [emergency, setEmergency] = useState(false);
    const [typing, setTyping] = useState(false);

    //User Prompt input
    const [inputText, setInputText] = useState('');
    const [sent, setSent] = useState(false);
    //sent is false by default, show the new chat ui

    const [temp, setTemp] = useState(null);
    const [messages, setMessages] = useState(null);

    useEffect(() => {
        (async () => {
            const token = JSON.parse(await AsyncStorage.getItem('signinData'));
            const res = await axios.get('https://rem-application-programming-interface.onrender.com/journal/load', {
                headers: {
                    Authorization: `${token.headers['authorization']}`
                }
            });

            if(res.data.preload) {
                setSent(res.data.preload);
                setMessages((res.data.messages).journal[0].messages);
            } else if(!res.data.userExists) {
                setTemp(JSON.stringify(res.data));
            } else if(!res.data.verification) {
                setTemp(JSON.stringify(res.data));
            } else if(!res.data.expired) {
                setTemp(JSON.stringify(res.data));
            } else if(res.data.server === 0) {
                setTemp(JSON.stringify(res.data));
            }
        })();
    }, []);

    /*
    const [preload, setPreload] = useState(null);

    useEffect(() => {
        
    },  [preload]);
    */

    // User message
    const [userMessage, setUserMessage] = useState(null);

    function handleFocus(event) {
        setQuery(true);
        setTyping(true);
    }

    function startSession() {
        setEmergency(true);
    }

    function noFocus() {
        setQuery(false);
        setTyping(false);
    }

    async function sendPrompt() {
        if (inputText.trim() !== '') {
            try {
                setSent(true);
                const data = {
                    sender: "User",
                    message: inputText,
                    link: [],
                    file: []
                }
                if (messages === null) {
                    setMessages([data]);
                } else {
                    const tempMessage = messages;
                    tempMessage.push(data);
                    setMessages(tempMessage);
                }
                setInputText("");
                const response = JSON.parse(await AsyncStorage.getItem('signinData'));
                const res = await axios.post('https://rem-application-programming-interface.onrender.com/journal', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${response.headers['authorization']}` // optional
                    }
                });

                if (!res.data.userExists) {
                    router.push('/signin');
                } else if (!res.data.verification) {
                    router.push('/signin');
                } else if(!res.data.authentication) {
                    router.push('/signin');
                }
                setMessages((res.data.journal[0]).messages);
            } catch(e) {
                const dat = {
                    sender: "User",
                    message: JSON.stringify(e.message),
                    link: [],
                    file: []
                }
                if (messages === null) {
                    setMessages([dat]);
                } else {
                    const tempMessage = messages;
                    tempMessage.push(dat);
                    setMessages(tempMessage);
                }
            }
        } else {
            const data = {
                sender: "User",
                message: "not working",
                link: [],
                file: []
            }
            if (messages === null) {
                setMessages([data]);
            } else {
                const tempMessage = messages;
                tempMessage.push(data);
                setMessages(tempMessage);
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <View className={`w-[100vw] h-[100vh] flex justify-start items-center`}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className={`${queryFocus ? 'w-[90vw] h-[97vh] pb-[0vh]' : 'flex-1 pb-[3vh]'} flex flex-col items-center justify-center pb-[3vh]`} keyboardVerticalOffset={queryFocus ? 0 : 0}>
                    <ScrollView contentContainerClassName={`${queryFocus ? 'w-[100%] h-[80vh]' : 'w-[90%] h-[80vh]'} w-[100%] h-[80vh] flex flex-col justify-start ${queryFocus ? 'gap-y-[5%]' : 'gap-y-[14%]'} items-center pt-[8%]`}>
                        <Pressable className='w-[100%] flex flex-row justify-end pt-[6%] pr-[1%]' onPress={startSession}>
                            <View className='w-[10%] aspect-square'>
                                <Svg viewBox="0 0 100 100">
                                    <Path stroke="#000" d="M0 25L100 25" strokeWidth="7" />
                                    <Path stroke="#000" d="M100 50L30 50" strokeWidth="7" />
                                    <Path stroke="#000" d="M100 75L10 75" strokeWidth="7" />
                                </Svg>
                            </View>
                        </Pressable>
                        {!sent ?
                            <View className={`flex w-[100%] h-[80%] flex-col items-start gap-y-[3%]`}>
                                <View className='w-[80%]'>
                                    <Text className='text-black font-light text-3xl'>Hello Naheem,{'\n'}<Text className='text-2xl font-light'>What can i help you with today?</Text></Text>
                                </View>
                                <View className='w-[100%] flex flex-row flex-wrap h-[70%] justify-between gap-y-[4%]'>
                                    <View className={`flex w-[100%] h-[45%] rounded-md flex-col justify-between`}>
                                        <Text className='text-lg font-light'>Coming Up!!!</Text>
                                        <Pressable className='w-[100%] h-[35%] rounded-xl flex flex-row justify-between items-center px-[5%] bg-green-600'>
                                            <Text className='text-lg font-light text-white'>Apply for the Microsoft...</Text>
                                            <View className='w-[10%] aspect-square'>
                                                    <Svg viewBox="0 0 24 24">
                                                        <Path
                                                            d="M15 6.5a1 1 0 01-1-1V4h-4v1.5a1 1 0 01-2 0V4c0-1.103.897-2 2-2h4c1.103 0 2 .897 2 2v1.5a1 1 0 01-1 1zm-2.29 8.88a2.191 2.191 0 01-1.48-.02L0 11.62v7.63C0 20.77 1.23 22 2.75 22h18.5c1.52 0 2.75-1.23 2.75-2.75v-7.63z"
                                                            data-original="#ffffff" fill="#fff"
                                                        />
                                                        <Path
                                                            d="M24 7.75v2.29l-11.76 3.92c-.08.03-.16.04-.24.04s-.16-.01-.24-.04L0 10.04V7.75C0 6.23 1.23 5 2.75 5h18.5C22.77 5 24 6.23 24 7.75z"
                                                            data-original="#ffffff" fill="#fff"
                                                        />
                                                    </Svg>
                                            </View>
                                        </Pressable>
                                        <Pressable className='w-[90%] h-[30%] rounded-xl flex flex-row justify-between items-center px-[5%] bg-[#E5E4E2]/50'>
                                            <Text className='text-lg font-light'>Apply for the Microsoft...</Text>
                                            <View className='w-[10%] aspect-square'>
                                                    <Svg viewBox="0 0 24 24">
                                                        <Path
                                                            d="M15 6.5a1 1 0 01-1-1V4h-4v1.5a1 1 0 01-2 0V4c0-1.103.897-2 2-2h4c1.103 0 2 .897 2 2v1.5a1 1 0 01-1 1zm-2.29 8.88a2.191 2.191 0 01-1.48-.02L0 11.62v7.63C0 20.77 1.23 22 2.75 22h18.5c1.52 0 2.75-1.23 2.75-2.75v-7.63z"
                                                            data-original="#000000" fill="#808080"
                                                        />
                                                        <Path
                                                            d="M24 7.75v2.29l-11.76 3.92c-.08.03-.16.04-.24.04s-.16-.01-.24-.04L0 10.04V7.75C0 6.23 1.23 5 2.75 5h18.5C22.77 5 24 6.23 24 7.75z"
                                                            data-original="#000000" fill="#808080"
                                                        />
                                                    </Svg>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View className={`${queryFocus ? 'hidden' : 'flex'} w-[58%] h-[45%] bg-[#E5E4E2]/50 rounded-md flex-col justify-between items-start py-[4%]`}>
                                        <View className='w-[100%] pl-[10%] pr-[2%]'>
                                            <Text className='font-extralight text-lg'>Want to tailor your CV to be Job specific, Hit me!</Text>
                                        </View>
                                        <View className='w-[40%] aspect-square'>
                                            <LottieView source={require('../RemUpload/cv.json')} autoPlay loop={true} style={{ width: '100%', height: '100%' }} />
                                        </View>
                                    </View>
                                    <View className={`${queryFocus ? 'hidden' : 'flex'} w-[38%] h-[45%] bg-[#E5E4E2]/50 rounded-md flex-col justify-between items-start pt-[4%] pb-[5%]`}>
                                        <View className='w-[100%] pl-[10%] pr-[2%]'>
                                            <Text className='font-extralight text-lg'>Preparing for an interview!</Text>
                                        </View>
                                        <View className='w-[50%] aspect-square'>
                                            <LottieView source={require('../RemUpload/interview.json')} autoPlay loop={true} style={{ width: '100%', height: '100%' }} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        :
                            <View className={`flex w-[100%] h-[80%] flex-col items-start justify-start gap-y-[3%]`}>
                                {messages && messages.map((msg, index)=>(
                                    <View key={index} className={`w-[65vw] ${msg.sender === "User" ? 'ml-[26%] px-[4%] py-[3%] rounded-lg border' : 'mr-[26%] py-[5%]'}`}>
                                        <Text className='text-lg font-light'>{msg.message}</Text>
                                    </View>
                                ))}
                            </View>
                        }
                    </ScrollView>
                    <View className={`${queryFocus ? 'w-[100%] h-[15vh]' : 'w-[90%] h-[15vh]'} flex flex-col justify-between items-start border border-double rounded-3xl`}>
                        <TextInput className={`text-lg placeholder:text-start ${queryFocus ? 'w-[100%]' : 'w-[90vw]'}  h-[50%] px-[5%]`} placeholder="Ask Anything..." value={inputText} onChangeText={(text) => setInputText(text)} onFocus={handleFocus} onBlur={noFocus} />
                        <View className='flex flex-row justify-between items-center w-[100%] h-[50%] px-[4%]'>
                            <View className='w-[70%] h-[70%] flex flex-row gap-x-[4vw] items-center'>
                                <View className='w-[10%] aspect-square'>
                                    <Svg
                                        viewBox="0 0 426.667 426.667"
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                        <Path
                                            fill="#000000"
                                            opacity={1}
                                            d="M405.332 192H234.668V21.332C234.668 9.559 225.109 0 213.332 0 201.559 0 192 9.559 192 21.332V192H21.332C9.559 192 0 201.559 0 213.332c0 11.777 9.559 21.336 21.332 21.336H192v170.664c0 11.777 9.559 21.336 21.332 21.336 11.777 0 21.336-9.559 21.336-21.336V234.668h170.664c11.777 0 21.336-9.559 21.336-21.336 0-11.773-9.559-21.332-21.336-21.332z"
                                        />
                                    </Svg>
                                </View>
                                <View className='w-[72%] h-[100%] flex flex-row gap-x-[3vw] items-center justify-center border rounded-full'>
                                    <View className='w-[15%] aspect-square'>
                                        <Svg viewBox="0 0 511.997 511.997">
                                            <Path
                                                d="M212.26 390.24l-60.331 60.331c-25.012 25.012-65.517 25.012-90.508.005-24.996-24.996-24.996-65.505-.005-90.496l120.683-120.683c24.991-24.992 65.5-24.992 90.491 0 8.331 8.331 21.839 8.331 30.17 0 8.331-8.331 8.331-21.839 0-30.17-41.654-41.654-109.177-41.654-150.831 0L31.247 329.909c-41.654 41.654-41.654 109.177 0 150.831 41.649 41.676 109.177 41.676 150.853 0l60.331-60.331c8.331-8.331 8.331-21.839 0-30.17s-21.84-8.33-30.171.001z"
                                                data-original="#000000"
                                            />
                                            <Path
                                                d="M480.751 31.24c-41.654-41.654-109.199-41.654-150.853 0l-72.384 72.384c-8.331 8.331-8.331 21.839 0 30.17 8.331 8.331 21.839 8.331 30.17 0l72.384-72.384c24.991-24.992 65.521-24.992 90.513 0 24.991 24.991 24.991 65.5 0 90.491L317.845 284.638c-24.992 24.992-65.5 24.992-90.491 0-8.331-8.331-21.839-8.331-30.17 0s-8.331 21.839 0 30.17c41.654 41.654 109.177 41.654 150.831 0l132.736-132.736c41.654-41.654 41.654-109.178 0-150.832z"
                                                data-original="#000000"
                                            />
                                        </Svg>
                                    </View>
                                    <Text className='text-lg font-light'>Include Link</Text>
                                </View>
                            </View>
                            <Pressable className='w-[10%] aspect-square' onPress={sendPrompt}>
                                <Svg viewBox="0 0 24 24">
                                    <Path
                                        d="M12.815 12.197l-7.532 1.256a.5.5 0 00-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 000-1.342l-18-9c-.614-.307-1.283.303-1.035.943l2.598 6.957a.5.5 0 00.386.319l7.532 1.255a.2.2 0 010 .394z"
                                        data-original="#000000" fill="#808080"
                                    />
                                </Svg>
                            </Pressable>
                        </View>
                    </View>
                    {/*
                    <View className='absolute w-[90%] h-[80%]'>
                        <Text className='text-lg font-medium'>{temp}</Text>
                    </View>
                    */}
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}


/*

<View className={`flex w-[100%] h-[80%] flex-col items-start justify-start gap-y-[3%]`}>
                                <View className='w-[65vw] rounded-lg border ml-[26%] px-[4%] py-[3%]'>
                                    <Text className='text-lg font-light'>{userMessage.message}</Text>
                                </View>
                            </View>
*/