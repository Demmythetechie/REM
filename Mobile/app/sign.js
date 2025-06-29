import React, { useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { View,Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert, Button, TouchableOpacity} from 'react-native';
import Svg, { Circle, Rect, Defs, ClipPath, Path, G, Line } from 'react-native-svg';
import LottieView from 'lottie-react-native';

export default function Sign() {

    //The error animation
    const animee = useRef(null);
    

    const [regexError, setError] = useState(null);

    //This is for successfully done task
    const [successTask, setSuccessTask] = useState(null);

    // This is the state for handling signin response
    const [resIn, setResIn] = useState(null);

    // This is the state for handling create account response
    const [resUp, setResUp] = useState(null);

    const [connecting, setConnecting] = useState(true);
    const [form, setForm] = useState({
        first: '',
        last: '',
        email: '',
        career: '',
        password: '',
        confirmPassword: '',
    });

    const [formSignIn, setFormSignIn] = useState({
        email: '',
        password: ''
    });

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleChangeSignIn = (field, value) => {
        setFormSignIn({ ...formSignIn, [field]: value });
    };

    const [size, setSize] = useState(false);
    const [authenticate, SetAuth] = useState(false);

    //Show and Hide for password in sign in
    const [show_hide, setS_H] = useState(true);


    // This part of the code is for handling the submit button--------------------------------------------------------START

    async function handleSubmit () {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegexEmpty = /^(?!\s*$).+/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
        const nameRegex = /^[A-Za-z\s]+$/;
        setError(formSignIn.email);
        
        if (authenticate) {
            if (!emailRegex.test(formSignIn.email)) {
                setError(`Invalid format — try something like john@email.com`);
            } else if(!passwordRegexEmpty.test(formSignIn.password)) {
                setError(`The password box is empty`);
            } else {
                setError(null);
                setConnecting(false);
                // all correct parameter
                const data = {email: formSignIn.email, password: formSignIn.password}
                try {
                    AsyncStorage.setItem('signinData', JSON.stringify(
                        await axios.post('https://rem-application-programming-interface.onrender.com/authentication/signin', data, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                    ));
                    setConnecting(true);
                    const response = JSON.parse(await AsyncStorage.getItem('signinData'));
                    if (response.data.login) {
                        router.push('/journal');
                    } else {
                        setError('Email and password does not match, Either one of them is wrong');
                    }
                } catch(e) {
                    setError('wrong');
                }
            }
        } else {
            if(!nameRegex.test(form.first)) {
                setError("First name must contain only letters. Do not include numbers or special characters.");
            } else if(!nameRegex.test(form.last)) {
                setError("Last name must contain only letters. Do not include numbers or special characters.");
            }
            else if (!emailRegex.test(form.email)) {
                setError(`Invalid format — try something like john@email.com`);
            } else if(!nameRegex.test(form.career)) {
                setError("Career must contain only letters. Do not include numbers or special characters.");
            }
            else if(!passwordRegex.test(form.password)) {
                setError(`Password must include uppercase, lowercase, number, special character, and be at least 8 characters long.`);
            } else if(form.password !== form.confirmPassword){
                setError('Oops! Your passwords don’t match. Please check and try again.');
            } else {
                setError(null);
                // all correct parameter
                const data = {
                    "firstname": form.first,
                    "lastname": form.last,
                    "email": form.email,
                    "career": form.career,
                    "password": form.password
                }
                try {
                    setConnecting(false);
                    AsyncStorage.setItem('signupData', JSON.stringify(
                        await axios.post('https://rem-application-programming-interface.onrender.com/authentication/signup', data, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                    ));
                    setConnecting(true);
                    const response = JSON.parse(await AsyncStorage.getItem('signupData'));
                    if (response.data.signup) {
                        SetAuth(true);
                        setSuccessTask("Your account has been successfully created! 🎉\nPlease check your email to verify your account.");
                    } else if(response.data.userExist) {
                        setError(response.data.message);
                    } else if (response.data.server === 0) {
                        setError(response.data.message);
                    }
                } catch(e) {
                    setError("wrong");
                }
            }
        }
    };
    // This is where it ends --------------------------------------------------------------------------------------------------------END

    function responsiveness() {
        setSize(true);
    }

    function unresponsiveness() {
        setSize(false);
    }

    function switchSignin() {
        authenticate ? SetAuth(false) : SetAuth(true);
    }

    function switchForgot() {

    }

    function showNHide() {
        show_hide ? setS_H(false) : setS_H(true);
    }

    // This function is for hiding the error
    function closeError() {
        setError(null);
    }

    function closeMessage() {
        setSuccessTask(null);
    }

    return (
        <KeyboardAvoidingView
            className="w-screen h-[90vh] bg-white flex flex-col justify-center items-center"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            <ScrollView className='w-[100%] h-[100%] relative' contentContainerClassName={`w-[100%] ${size ? 'h-[90vh]' : 'h-[100%]'} flex flex-col justify-center items-center gap-y-[4%] relative`}>
                {authenticate ?
                    <View className={`w-[100%] h-[40%] flex flex-col ${size ? 'justify-start pt-[10%]' : 'justify-center'} items-center gap-y-[4%] box-border`}>
                        <View className='w-[25%] aspect-square'>
                            <Svg viewBox='0 0 324 324'>
                                <G
                                    fill="none"
                                    stroke="#000"
                                    strokeWidth={2}
                                    strokeLinecap="square"
                                    strokeLinejoin="round"
                                >
                                    <Path d="M106 314L138 314" />
                                    <Path d="M58 282L26 282" />
                                    <Path d="M42 266L10 266 10 314" />
                                    <Path d="M26 202L10 202 10 218" />
                                    <Path d="M42 218L42 234" />
                                    <Path d="M122 138L138 138 138 154 154 154 154 186 138 186 138 170" />
                                    <Path d="M138 154L122 154" />
                                    <Path d="M122 122L138 122 138 106 122 106 122 58 106 58 106 74 90 74 90 42 154 42 154 58" />
                                    <Path d="M122 58L138 58 138 74 154 74 154 106 186 106 186 90 170 90 170 58 186 58 186 74 202 74 202 138 218 138 218 106 282 106 282 42 298 42 298 58 314 58 314 10" />
                                    <Path d="M282 74L314 74 314 90 298 90 298 170 314 170 314 106" />
                                    <Path d="M218 122L234 122 234 154 250 154 250 170 218 170 218 186 234 186 234 202 202 202 202 154 218 154" />
                                    <Path d="M218 202L218 218 154 218 154 234 170 234" />
                                    <Path d="M154 234L122 234 122 202 106 202 106 234 58 234 58 250" />
                                    <Path d="M74 234L74 250 122 250 122 282 106 282 106 266 90 266 90 298 74 298" />
                                    <Path d="M90 282L74 282 74 266" />
                                    <Path d="M122 218L138 218 138 202 154 202" />
                                    <Path d="M186 218L186 202 170 202 170 186 186 186 186 170 170 170" />
                                    <Path d="M202 218L202 234 218 234 218 250 250 250 250 234 234 234 234 218 282 218 282 234 266 234" />
                                    <Path d="M250 250L250 298" />
                                    <Path d="M202 234L186 234 186 250 202 250 202 282" />
                                    <Path d="M202 266L234 266 234 282 218 282 218 298 234 298 234 314 266 314 266 282 298 282 298 298 282 298 282 314 314 314 314 234" />
                                    <Path d="M314 266L298 266 298 218 314 218 314 186 298 186 298 202 250 202 250 186 282 186" />
                                    <Path d="M266 186L266 170 282 170 282 154 266 154 266 138 250 138 250 122 282 122 282 138" />
                                    <Path d="M298 250L266 250 266 266 282 266" />
                                    <Path d="M234 314L202 314 202 298 186 298 186 314" />
                                    <Path d="M186 298L186 266" />
                                    <Path d="M202 90L266 90 266 26 298 26 298 10 266 10" />
                                    <Path d="M266 74L218 74 218 58 202 58 202 42 234 42 234 58 250 58 250 10 234 10 234 26 218 26 218 10 186 10 186 26 202 26" />
                                    <Path d="M186 106L186 154 170 154 170 138 154 138 154 122 170 122" />
                                    <Path d="M154 90L138 90" />
                                    <Path d="M58 122L58 138 90 138 90 170 74 170 74 154 42 154 42 170 58 170" />
                                    <Path d="M26 122L26 154 10 154 10 186 42 186" />
                                    <Path d="M26 186L26 170" />
                                    <Path d="M26 138L42 138" />
                                    <Path d="M10 122L10 138" />
                                    <Path d="M26 74L26 58 10 58" />
                                    <Path d="M42 26L42 42 58 42" />
                                    <Path d="M42 10L10 10 10 42 26 42 26 26" />
                                    <Path d="M154 10L170 10 170 42 186 42" />
                                    <Path d="M170 26L90 26" />
                                </G>
                                <Path
                                    fill="none"
                                    stroke="red"
                                    strokeWidth={2}
                                    strokeLinecap="square"
                                    strokeLinejoin="round"
                                    d="M154 2L154 10 42 10 42 26 74 26 74 58 42 58 42 74 10 74 10 122 42 122 42 106 26 106 26 90 58 90 58 74 74 74 74 106 58 106 58 122 90 122 90 90 106 90 106 122 122 122 122 138 106 138 106 170 122 170 122 186 90 186 90 218 74 218 74 186 58 186 58 218 42 218 42 202 26 202 26 234 10 234 10 250 42 250 42 266 58 266 58 298 26 298 26 314 106 314 106 298 138 298 138 250 170 250 170 266 154 266 154 282 170 282 170 298 154 298 154 314 170 314 170 322"
                                />
                            </Svg>
                        </View>
                        <View className='w-[92%] h-[45%] flex flex-row flex-wrap justify-between'>
                            <TextInput
                                onFocus={responsiveness}
                                onBlur={unresponsiveness}
                                key="email"
                                placeholder="Email"
                                keyboardType="email-address"
                                secureTextEntry={true}
                                className={`w-[100%] h-[50%] mb-0 placeholder:text-lg placeholder:font-ligh border-b border-b-black/50`}
                                value={formSignIn["email"]}
                                onChangeText={(text) => handleChangeSignIn("email", text)}
                            />
                            <View className='flex flex-row justify-between w-[100%] h-[50%]'>
                                <TextInput
                                    onFocus={responsiveness}
                                    onBlur={unresponsiveness}
                                    key="password"
                                    placeholder="Password"
                                    keyboardType="default"
                                    secureTextEntry={show_hide}
                                    className={`w-[85%] h-[100%] mb-0 placeholder:text-lg placeholder:font-ligh border-b border-b-black/50`}
                                    value={formSignIn["password"]}
                                    onChangeText={(text) => handleChangeSignIn("password", text)}
                                />
                                <TouchableOpacity className='w-[15%] h-[100%] flex justify-end items-center border-b border-b-black/50 py-[3%]' onPress={showNHide}>
                                    <View className='w-[50%] aspect-square'>
                                        {show_hide ?
                                            <Svg
                                                viewBox="0 0 682.667 682.667"
                                            >
                                                <Defs>
                                                    <ClipPath id="a" clipPathUnits="userSpaceOnUse">
                                                        <Path d="M0 512h512V0H0z" data-original="#000000" />
                                                    </ClipPath>
                                                </Defs>
                                                <G
                                                    clipPath="url(#a)"
                                                    transform="matrix(1.33333 0 0 -1.33333 0 682.667)"
                                                    fill="none"
                                                    stroke="#000"
                                                    strokeWidth={15}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit={10}
                                                >
                                                    <Path
                                                        d="M121.608 345.979c38.746 21.285 84.877 37.935 134.392 37.935C393.242 383.914 504.5 256 504.5 256S393.242 128.087 256 128.087C118.757 128.087 7.5 256 7.5 256s35.76 41.114 91.743 76.724"
                                                        data-original="#000000"
                                                        strokeWidth={15}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit={10}
                                                        strokeDasharray="none"
                                                        strokeOpacity={1}
                                                    />
                                                    <Path
                                                        d="M333.393 201.146c-17.187-24.205-45.446-39.999-77.393-39.999-52.386 0-94.853 42.467-94.853 94.853 0 52.386 42.467 94.853 94.853 94.853 52.386 0 94.853-42.467 94.853-94.853 0-10.534-1.717-20.667-4.887-30.134"
                                                        data-original="#000000"
                                                        strokeWidth={15}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit={10}
                                                        strokeDasharray="none"
                                                        strokeOpacity={1}
                                                    />
                                                    <Path
                                                        d="M291.59 256c0-19.656-15.934-35.591-35.59-35.591-19.656 0-35.591 15.935-35.591 35.591s15.935 35.59 35.591 35.59 35.59-15.934 35.59-35.59zM7.5 26.684l497 458.632"
                                                        data-original="#000000"
                                                        strokeWidth={15}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit={10}
                                                        strokeDasharray="none"
                                                        strokeOpacity={1}
                                                    />
                                                </G>
                                            </Svg>
                                        :
                                            <Svg
                                                viewBox="0 0 682.667 682.667"
                                            >
                                                <Defs>
                                                    <ClipPath id="a" clipPathUnits="userSpaceOnUse">
                                                        <Path d="M0 512h512V0H0z" data-original="#000000" />
                                                    </ClipPath>
                                                </Defs>
                                                <G
                                                    clipPath="url(#a)"
                                                    transform="matrix(1.33333 0 0 -1.33333 0 682.667)"
                                                    fill="none"
                                                    stroke="#000"
                                                    strokeWidth={15}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit={10}
                                                >
                                                    <Path
                                                        d="M121.608 345.979c38.746 21.285 84.877 37.935 134.392 37.935C393.242 383.914 504.5 256 504.5 256S393.242 128.087 256 128.087C118.757 128.087 7.5 256 7.5 256s35.76 41.114 91.743 76.724"
                                                        data-original="#000000"
                                                        strokeWidth={15}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit={10}
                                                        strokeDasharray="none"
                                                        strokeOpacity={1}
                                                    />
                                                    <Path
                                                        d="M333.393 201.146c-17.187-24.205-45.446-39.999-77.393-39.999-52.386 0-94.853 42.467-94.853 94.853 0 52.386 42.467 94.853 94.853 94.853 52.386 0 94.853-42.467 94.853-94.853 0-10.534-1.717-20.667-4.887-30.134"
                                                        data-original="#000000"
                                                        strokeWidth={15}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit={10}
                                                        strokeDasharray="none"
                                                        strokeOpacity={1}
                                                    />
                                                    
                                                </G>
                                            </Svg>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                :
                    <View className={`w-[100%] h-[55%] flex flex-col ${size ? 'justify-start pt-[10%]' : 'justify-center'} items-center gap-y-[4%] box-border`}>
                        <View className='w-[25%] aspect-square'>
                            <Svg viewBox='0 0 324 324'>
                                <G
                                    fill="none"
                                    stroke="#000"
                                    strokeWidth={2}
                                    strokeLinecap="square"
                                    strokeLinejoin="round"
                                >
                                    <Path d="M106 314L138 314" />
                                    <Path d="M58 282L26 282" />
                                    <Path d="M42 266L10 266 10 314" />
                                    <Path d="M26 202L10 202 10 218" />
                                    <Path d="M42 218L42 234" />
                                    <Path d="M122 138L138 138 138 154 154 154 154 186 138 186 138 170" />
                                    <Path d="M138 154L122 154" />
                                    <Path d="M122 122L138 122 138 106 122 106 122 58 106 58 106 74 90 74 90 42 154 42 154 58" />
                                    <Path d="M122 58L138 58 138 74 154 74 154 106 186 106 186 90 170 90 170 58 186 58 186 74 202 74 202 138 218 138 218 106 282 106 282 42 298 42 298 58 314 58 314 10" />
                                    <Path d="M282 74L314 74 314 90 298 90 298 170 314 170 314 106" />
                                    <Path d="M218 122L234 122 234 154 250 154 250 170 218 170 218 186 234 186 234 202 202 202 202 154 218 154" />
                                    <Path d="M218 202L218 218 154 218 154 234 170 234" />
                                    <Path d="M154 234L122 234 122 202 106 202 106 234 58 234 58 250" />
                                    <Path d="M74 234L74 250 122 250 122 282 106 282 106 266 90 266 90 298 74 298" />
                                    <Path d="M90 282L74 282 74 266" />
                                    <Path d="M122 218L138 218 138 202 154 202" />
                                    <Path d="M186 218L186 202 170 202 170 186 186 186 186 170 170 170" />
                                    <Path d="M202 218L202 234 218 234 218 250 250 250 250 234 234 234 234 218 282 218 282 234 266 234" />
                                    <Path d="M250 250L250 298" />
                                    <Path d="M202 234L186 234 186 250 202 250 202 282" />
                                    <Path d="M202 266L234 266 234 282 218 282 218 298 234 298 234 314 266 314 266 282 298 282 298 298 282 298 282 314 314 314 314 234" />
                                    <Path d="M314 266L298 266 298 218 314 218 314 186 298 186 298 202 250 202 250 186 282 186" />
                                    <Path d="M266 186L266 170 282 170 282 154 266 154 266 138 250 138 250 122 282 122 282 138" />
                                    <Path d="M298 250L266 250 266 266 282 266" />
                                    <Path d="M234 314L202 314 202 298 186 298 186 314" />
                                    <Path d="M186 298L186 266" />
                                    <Path d="M202 90L266 90 266 26 298 26 298 10 266 10" />
                                    <Path d="M266 74L218 74 218 58 202 58 202 42 234 42 234 58 250 58 250 10 234 10 234 26 218 26 218 10 186 10 186 26 202 26" />
                                    <Path d="M186 106L186 154 170 154 170 138 154 138 154 122 170 122" />
                                    <Path d="M154 90L138 90" />
                                    <Path d="M58 122L58 138 90 138 90 170 74 170 74 154 42 154 42 170 58 170" />
                                    <Path d="M26 122L26 154 10 154 10 186 42 186" />
                                    <Path d="M26 186L26 170" />
                                    <Path d="M26 138L42 138" />
                                    <Path d="M10 122L10 138" />
                                    <Path d="M26 74L26 58 10 58" />
                                    <Path d="M42 26L42 42 58 42" />
                                    <Path d="M42 10L10 10 10 42 26 42 26 26" />
                                    <Path d="M154 10L170 10 170 42 186 42" />
                                    <Path d="M170 26L90 26" />
                                </G>
                                <Path
                                    fill="none"
                                    stroke="red"
                                    strokeWidth={2}
                                    strokeLinecap="square"
                                    strokeLinejoin="round"
                                    d="M154 2L154 10 42 10 42 26 74 26 74 58 42 58 42 74 10 74 10 122 42 122 42 106 26 106 26 90 58 90 58 74 74 74 74 106 58 106 58 122 90 122 90 90 106 90 106 122 122 122 122 138 106 138 106 170 122 170 122 186 90 186 90 218 74 218 74 186 58 186 58 218 42 218 42 202 26 202 26 234 10 234 10 250 42 250 42 266 58 266 58 298 26 298 26 314 106 314 106 298 138 298 138 250 170 250 170 266 154 266 154 282 170 282 170 298 154 298 154 314 170 314 170 322"
                                />
                            </Svg>
                        </View>
                        <Text className="text-3xl font-normal text-center">Create an Account</Text>
                        <View className='w-[92%] h-[60%] flex flex-row flex-wrap justify-between'>
                        {[
                            { label: 'First Name', key: 'first', dimension: 'half'  },
                            { label: 'Last Name', key: 'last', dimension: 'half' },
                            { label: 'Email', key: 'email', keyboardType: 'email-address', dimension: 'full' },
                            { label: 'Career', key: 'career', dimension: 'half' },
                            { label: 'Password', key: 'password', secure: true, dimension: 'half' },
                            { label: 'Confirm Password', key: 'confirmPassword', secure: true, dimension: 'full' },
                        ].map(({ label, key, keyboardType, secure, dimension }) => (
                            <TextInput
                                onFocus={responsiveness}
                                onBlur={unresponsiveness}
                                key={key}
                                placeholder={label}
                                keyboardType={keyboardType}
                                secureTextEntry={secure}
                                className={`border-b border-gray-300 text-base ${dimension === 'half' ? 'w-[48%]' : dimension === '70' ? 'w-[67%]' : dimension === 'full' ? 'w-[100%]' : 'w-[25%]'} h-[25%] mb-0 placeholder:text-lg placeholder:font-light`}
                                value={form[key]}
                                onChangeText={(text) => handleChange(key, text)}
                            />
                        ))}
                        </View>
                    </View>
                }
                <View className='w-[100%] h-[13%] flex flex-col justify-start items-center'>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        className="bg-blue-600 w-[92%] h-[50%] flex justify-center items-center"
                    >
                        {connecting ?
                            <Text className="text-center text-white font-semibold text-lg">
                                {authenticate ? 'Sign in' : 'Create Account'}
                            </Text>
                        :
                            <View className='w-[20%] aspect-square'>
                                <LottieView source={require('../RemUpload/loading.json')} autoPlay loop={true} style={{ width: '100%', height: '100%' }} />
                            </View>
                        }
                    </TouchableOpacity>
                    <View className='w-[92%] h-[50%] flex flex-row justify-between items-center'>
                        <TouchableOpacity onPress={switchSignin} className='h-full flex justify-center items-center'>
                            <Text className='text-lg font-light'>{authenticate ? 'Create Account' : 'Sign in'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={switchForgot} className='h-full flex justify-center items-center'>
                            <Text className='text-lg font-light'>Forget Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className={`${typeof regexError === "string" ? 'flex' : 'hidden'} flex-row absolute w-[85%] h-[13%] rounded-xl bg-red-400 justify-between items-start py-[2%] px-[2%] top-[8%] mr-[0%]`} ref={animee}>
                    <View className='w-[90%] h-[100%] flex justify-center pl-[2%]'>
                        <Text className='text-white text-[4vw] font-light'>{regexError}</Text>
                    </View>
                    <TouchableOpacity className='w-[7%] aspect-square' onPress={closeError}>
                        <Svg
                            viewBox="0 0 24 24"
                        >
                            <Path
                                fillRule="evenodd"
                                d="M5.293 5.293a1 1 0 011.414 0L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                                data-original="#000000"
                                fill="#fff"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View className={`${typeof successTask === "string" ? 'flex' : 'hidden'} flex-row absolute w-[85%] h-[13%] rounded-xl bg-green-600 justify-between items-start py-[2%] px-[2%] top-[8%] mr-[0%]`}>
                    <View className='w-[90%] h-[100%] flex justify-center pl-[2%]'>
                        <Text className='text-white text-[4vw] font-light'>{successTask}</Text>
                    </View>
                    <TouchableOpacity className='w-[7%] aspect-square' onPress={closeMessage}>
                        <Svg
                            viewBox="0 0 24 24"
                        >
                            <Path
                                fillRule="evenodd"
                                d="M5.293 5.293a1 1 0 011.414 0L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                                data-original="#000000"
                                fill="#fff"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>       
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

/*

<TouchableOpacity className='h-[50%] border flex justify-center items-center'>
                            <Text>Sign in</Text>
                        </TouchableOpacity>
*/