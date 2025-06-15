import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Link } from 'expo-router';
import { View,Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert, Button, TouchableOpacity} from 'react-native';
import Svg, { Circle, Rect, Defs, ClipPath, Path, G, Line } from 'react-native-svg';
import LottieView from 'lottie-react-native';

export default function Sign() {

    const [form, setForm] = useState({
        name: '',
        email: '',
        age: '',
        career: '',
        linkedin: '',
        twitter: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const [size, setSize] = useState(false);

    const handleSubmit = () => {
        if (form.password !== form.confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        console.log(form);
        Alert.alert('Success', 'Account created!');
    };

    function responsiveness() {
        setSize(true);
    }

    function unresponsiveness() {
        setSize(false);
    }

    return (
        <KeyboardAvoidingView
            className="w-screen h-[90vh] bg-white flex flex-col justify-center items-center"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            <ScrollView className='w-[100%] h-[100%]' contentContainerClassName={`w-[100%] ${size ? 'h-[90vh]' : 'h-[100%]'} flex flex-col justify-center items-center gap-y-[4%]`}>
                <View className={`w-[100%] h-full flex flex-col ${size ? 'justify-start pt-[10%]' : 'justify-center'} items-center gap-y-[4%] box-border`}>
                    <View className='w-[20%] aspect-square'>
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
                    <View className='w-[92%] h-[30%] flex flex-row flex-wrap justify-between'>
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
                    <TouchableOpacity
                        onPress={handleSubmit}
                        className="bg-blue-600 w-[92%] py-[3%]"
                    >
                        <Text className="text-center text-white font-semibold text-lg">
                            Create Account
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}