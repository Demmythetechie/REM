import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, Image, Button, Pressable, ScrollView, Dimensions} from 'react-native';
import Svg, { Circle, Rect, Defs, ClipPath, Path, G, Line } from 'react-native-svg';
import LottieView from 'lottie-react-native';

import "../global.css";

const { width: screenWidth } = Dimensions.get('window');

export default function App() {

  const slide = useRef<ScrollView>(null);
  const [bar, setBar] = useState(0);
  function progressBar() {
    if (bar === 0) { 
      setBar(1);
      slide.current?.scrollTo({ x: screenWidth, y: 0, animated: true });
    } else if (bar === 1) {
      setBar(2);
      slide.current?.scrollTo({ x: (screenWidth * 2), y: 0, animated: true });
    } else {
      setBar(2);
    } 
  }

  return (
    <View className='w-[100vw] h-[100vh] flex flex-col items-center bg-white relative gap-y-[3%] justify-center'>
      <View className='w-[100%] h-[100%] absolute'>
        <View className='w-[20%] aspect-square opacity-[5%] top-[90%] left-[70%]' style={{ transform: [{ rotate: '45deg' }] }}>
          <Svg viewBox="0 0 682.667 682.667">
            <Defs>
              <ClipPath id="clip0">
                <Path d="M0 512h512V0H0Z" fill="#000000" />
              </ClipPath>
            </Defs>
            <G clipPath="url(#clip0)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
              <Path
                d="M0 0v-60h392v390H0v-90h392"
                transform="translate(105 106)"
                fill="none"
                stroke="#000000"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
              />
              <Path
                d="M0 0v-60"
                transform="translate(196 466)"
                fill="none"
                stroke="#000000"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
              />
              <Path
                d="M0 0v-60"
                transform="translate(407 466)"
                fill="none"
                stroke="#000000"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
              />
              <Path
                d="M0 0v-60"
                transform="translate(301 466)"
                fill="none"
                stroke="#000000"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
              />
              <Path
                d="M0 0c0-165-90-240-90-240h392s90 75 90 240"
                transform="translate(105 346)"
                fill="none"
                stroke="#000000"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
              />
            </G>
          </Svg>
        </View>
        <View className='w-[20%] aspect-square opacity-[5%] top-[-11%] left-[5%]' style={{ transform: [{ rotate: '45deg' }] }}>
          <Svg viewBox="0 0 511.977 511.977">
            <G>
              <Path
                d="M14.977 390.988h392c3.516 0 6.914-1.23 9.609-3.472 3.765-3.153 89.652-77.038 94.889-236.528h-421C85.258 295.762 6.16 363.81 5.338 364.489.519 368.561-1.254 375.212.914 381.13c2.153 5.903 7.764 9.858 14.063 9.858zM496.976 60.988h-75v-15c0-8.4-6.6-15-15-15s-15 6.6-15 15v15h-76v-15c0-8.4-6.6-15-15-15s-15 6.6-15 15v15h-75v-15c0-8.4-6.6-15-15-15s-15 6.6-15 15v15h-75c-8.4 0-15 6.6-15 15v45h421v-45c0-8.4-6.6-15-15-15z"
                fill="#000000"
              />
              <Path
                d="M435.849 410.515c-8.145 6.782-18.369 10.474-28.872 10.474h-316v45c0 8.291 6.709 15 15 15h391c8.291 0 15-6.709 15-15V297.843c-28.92 70.951-69.276 106.937-76.128 112.672z"
                fill="#000000"
              />
            </G>
          </Svg>
        </View>
        <View className='w-[20%] aspect-square opacity-[5%] top-[10%] left-[65%]' style={{ transform: [{ rotate: '10deg' }] }}>
          <Svg
            viewBox="0 0 512 512"
          >
            <Path
              d="M140.93 100.41c0-4.42 3.58-8.01 8.01-8.01H302.6c4.42 0 8.01 3.58 8.01 8.01s-3.58 8.01-8.01 8.01H148.94c-4.43-.01-8.01-3.59-8.01-8.01zm8.01 62.57H302.6c4.42 0 8.01-3.58 8.01-8.01s-3.58-8.01-8.01-8.01H148.94c-4.42 0-8.01 3.58-8.01 8.01s3.58 8.01 8.01 8.01zm0 54.57H302.6c4.42 0 8.01-3.58 8.01-8.01s-3.58-8.01-8.01-8.01H148.94c-4.42 0-8.01 3.58-8.01 8.01s3.58 8.01 8.01 8.01zm0 54.57h112.88c4.42 0 8.01-3.58 8.01-8.01s-3.58-8.01-8.01-8.01H148.94c-4.42 0-8.01 3.58-8.01 8.01s3.58 8.01 8.01 8.01zm0 54.56H238c4.42 0 8.01-3.58 8.01-8.01s-3.58-8.01-8.01-8.01h-89.06c-4.42 0-8.01 3.58-8.01 8.01s3.58 8.01 8.01 8.01zm0 54.57h76.08c4.42 0 8.01-3.58 8.01-8.01s-3.58-8.01-8.01-8.01h-76.08c-4.42 0-8.01 3.58-8.01 8.01s3.58 8.01 8.01 8.01zm333.14-205.62-74.96 74.96v191.54c0 17.11-13.92 31.03-31.03 31.03H132.04c-17.11 0-31.03-13.92-31.03-31.03v-7.36h-7.36c-17.11 0-31.03-13.92-31.03-31.02v-47.38H44.59c-11.64 0-21.1-9.47-21.1-21.1s9.47-21.1 21.1-21.1h18.04v-23.41H44.59c-11.64 0-21.1-9.47-21.1-21.1s9.47-21.1 21.1-21.1h18.04v-23.41H44.59c-11.64 0-21.1-9.47-21.1-21.1s9.47-21.1 21.1-21.1h18.04v-23.41H44.59c-11.64 0-21.1-9.47-21.1-21.1s9.47-21.1 21.1-21.1h18.04V69.91c0-17.12 13.92-31.05 31.03-31.05h244.06c17.11 0 31.03 13.93 31.03 31.05v6.87l7.84.48c17.34 1.05 30.76 14.72 30.54 31.12l-.74 52.34 13.38-13.38 17.01-17.01c8.58-8.58 22.55-8.58 31.14 0l14.17 14.17c8.58 8.58 8.58 22.55-.01 31.13zm-33.99 11.35-22.66-22.66-132.82 132.81 22.66 22.66 39.8-39.8.01-.01 38.37-38.37.01-.01zM281.48 330.92l17.99-4.28-13.71-13.71zm87.27-238.1v105.53l21.39-21.39.97-68.81c.1-7.83-6.7-14.38-15.5-14.91zM44.59 143.48h52.1c2.76 0 5.09-2.33 5.09-5.09s-2.33-5.09-5.09-5.09h-52.1c-2.76 0-5.09 2.33-5.09 5.09s2.33 5.09 5.09 5.09zm0 65.62h52.1c2.76 0 5.09-2.33 5.09-5.09s-2.33-5.09-5.09-5.09h-52.1c-2.76 0-5.09 2.33-5.09 5.09s2.33 5.09 5.09 5.09zm0 65.62h52.1c2.76 0 5.09-2.33 5.09-5.09s-2.33-5.09-5.09-5.09h-52.1c-2.76 0-5.09 2.33-5.09 5.09s2.33 5.09 5.09 5.09zm0 65.62h52.1c2.76 0 5.09-2.33 5.09-5.09 0-2.81-2.28-5.09-5.09-5.09h-52.1c-2.81 0-5.09 2.28-5.09 5.09 0 2.76 2.33 5.09 5.09 5.09zm49.07 78.41h244.06c8.28 0 15.01-6.73 15.01-15.01v-98.76l-31.8 31.8a7.992 7.992 0 0 1-3.81 2.13l-44.59 10.6c-.61.15-1.24.22-1.85.22-2.1 0-4.14-.83-5.66-2.35a8.003 8.003 0 0 1-2.13-7.51l10.6-44.59a7.992 7.992 0 0 1 2.13-3.81l77.11-77.11V69.91c0-8.29-6.73-15.04-15.01-15.04H93.66c-8.28 0-15.01 6.75-15.01 15.04v47.38h18.04c11.64 0 21.1 9.47 21.1 21.1s-9.47 21.1-21.1 21.1H78.65v23.41h18.04c11.64 0 21.1 9.47 21.1 21.1s-9.47 21.1-21.1 21.1H78.65v23.41h18.04c11.64 0 21.1 9.47 21.1 21.1s-9.47 21.1-21.1 21.1H78.65v23.41h18.04c11.64 0 21.1 9.47 21.1 21.1s-9.47 21.1-21.1 21.1H78.65v47.38c0 8.32 6.73 15.05 15.01 15.05zM391.11 266.6l-22.37 22.36v114.78c0 17.11-13.92 31.02-31.03 31.02H117.03v7.36c0 8.28 6.73 15.01 15.01 15.01H376.1c8.28 0 15.01-6.73 15.01-15.01zm79.65-110.78-14.17-14.17c-2.3-2.3-6.19-2.3-8.49 0L436.75 153l22.66 22.66 11.35-11.35c2.3-2.3 2.3-6.19 0-8.49z"
              fill="#000000"
              data-original="#000000"
            />
          </Svg>
        </View>
        <View className='w-[20%] aspect-square opacity-[5%] top-[10%] left-[0%]' style={{ transform: [{ rotate: '1deg' }] }}>
          <Svg viewBox="0 0 512 512">
            <Path
              fillRule="evenodd"
              d="M469.44 371.71v-337A23.72 23.72 0 00445.73 11H34.66A23.71 23.71 0 0011 34.69v411.08a23.71 23.71 0 0023.65 23.69h337a70.52 70.52 0 1097.73-97.75zM319.93 21h125.8a13.73 13.73 0 0113.74 13.69v63.74H319.93zM160.46 459.46H34.66A13.71 13.71 0 0121 445.77V108.43h139.46zm0-361H21V34.69A13.71 13.71 0 0134.66 21h125.8zm149.5 361H170.48v-351H310zm0-361H170.48V21H310zm50 332a70.45 70.45 0 006.25 29h-46.28v-351h139.54v257.71a70.51 70.51 0 00-99.56 64.29zm111-16.11a8.61 8.61 0 01-3.43 5.64l-47.69 34.83a8.63 8.63 0 01-12.47-2.41L391.13 426v-.05a8.74 8.74 0 01-.94-6.41 8.55 8.55 0 013.88-5.36 8.69 8.69 0 0111.89 2.88l10.61 17.35a1.08 1.08 0 00.67.48 1.1 1.1 0 00.81-.18l39.23-28.68a8.62 8.62 0 016.41-1.57 8.76 8.76 0 015.64 3.4 8.7 8.7 0 011.57 6.49zm-38-112.6a15 15 0 01-15 15h-58.62a15 15 0 01-15-15v-35.62a15 15 0 0115-15h58.55a15 15 0 0115 15zM345.33 193.3v-35.62a15 15 0 0115-15h58.55a15 15 0 0115 15v35.62a15 15 0 01-15 15h-58.55a15 15 0 01-15-15zm-59.77 72.83v35.62a15 15 0 01-15 15H212a15 15 0 01-15-15v-35.62a15 15 0 0115-15h58.55a15 15 0 0115.01 15zm-89.5-72.83v-35.62a15 15 0 0115-15h58.51a15 15 0 0115 15v35.62a15 15 0 01-15 15h-58.51a15 15 0 01-15-15zM45.39 301.75v-35.62a15 15 0 0115-15h58.55a15 15 0 0115 15v35.62a15 15 0 01-15 15H60.39a15 15 0 01-15-15zm89.54 72.84v35.61a15.05 15.05 0 01-15 15H61.38a15 15 0 01-15-15v-35.61a15 15 0 0115-15h58.54a15 15 0 0115.01 15zM46.37 193.3v-35.62a15 15 0 0115-15h58.54a15.05 15.05 0 0115 15v35.62a15.05 15.05 0 01-15 15H61.38a15 15 0 01-15.01-15zm8-133.59a5 5 0 015-5h62.74a5 5 0 110 10H59.35a5 5 0 01-4.98-5zm149.5 0a5 5 0 015-5h62.74a5 5 0 010 10h-62.76a5 5 0 01-4.98-5zm222.21 0a5 5 0 01-5 5h-62.72a5 5 0 110-10H421a5 5 0 015.08 5z"
              data-original="#000000"
            />
          </Svg>
        </View>
        <View className='w-[20%] aspect-square opacity-[5%] top-[30%] left-[60%]' style={{ transform: [{ rotate: '-25deg' }] }}>
          <Svg viewBox="0 0 512 512">
            <Path
              fillRule="evenodd"
              d="M469.44 371.71v-337A23.72 23.72 0 00445.73 11H34.66A23.71 23.71 0 0011 34.69v411.08a23.71 23.71 0 0023.65 23.69h337a70.52 70.52 0 1097.73-97.75zM319.93 21h125.8a13.73 13.73 0 0113.74 13.69v63.74H319.93zM160.46 459.46H34.66A13.71 13.71 0 0121 445.77V108.43h139.46zm0-361H21V34.69A13.71 13.71 0 0134.66 21h125.8zm149.5 361H170.48v-351H310zm0-361H170.48V21H310zm50 332a70.45 70.45 0 006.25 29h-46.28v-351h139.54v257.71a70.51 70.51 0 00-99.56 64.29zm111-16.11a8.61 8.61 0 01-3.43 5.64l-47.69 34.83a8.63 8.63 0 01-12.47-2.41L391.13 426v-.05a8.74 8.74 0 01-.94-6.41 8.55 8.55 0 013.88-5.36 8.69 8.69 0 0111.89 2.88l10.61 17.35a1.08 1.08 0 00.67.48 1.1 1.1 0 00.81-.18l39.23-28.68a8.62 8.62 0 016.41-1.57 8.76 8.76 0 015.64 3.4 8.7 8.7 0 011.57 6.49zm-38-112.6a15 15 0 01-15 15h-58.62a15 15 0 01-15-15v-35.62a15 15 0 0115-15h58.55a15 15 0 0115 15zM345.33 193.3v-35.62a15 15 0 0115-15h58.55a15 15 0 0115 15v35.62a15 15 0 01-15 15h-58.55a15 15 0 01-15-15zm-59.77 72.83v35.62a15 15 0 01-15 15H212a15 15 0 01-15-15v-35.62a15 15 0 0115-15h58.55a15 15 0 0115.01 15zm-89.5-72.83v-35.62a15 15 0 0115-15h58.51a15 15 0 0115 15v35.62a15 15 0 01-15 15h-58.51a15 15 0 01-15-15zM45.39 301.75v-35.62a15 15 0 0115-15h58.55a15 15 0 0115 15v35.62a15 15 0 01-15 15H60.39a15 15 0 01-15-15zm89.54 72.84v35.61a15.05 15.05 0 01-15 15H61.38a15 15 0 01-15-15v-35.61a15 15 0 0115-15h58.54a15 15 0 0115.01 15zM46.37 193.3v-35.62a15 15 0 0115-15h58.54a15.05 15.05 0 0115 15v35.62a15.05 15.05 0 01-15 15H61.38a15 15 0 01-15.01-15zm8-133.59a5 5 0 015-5h62.74a5 5 0 110 10H59.35a5 5 0 01-4.98-5zm149.5 0a5 5 0 015-5h62.74a5 5 0 010 10h-62.76a5 5 0 01-4.98-5zm222.21 0a5 5 0 01-5 5h-62.72a5 5 0 110-10H421a5 5 0 015.08 5z"
              data-original="#000000"
            />
          </Svg>
        </View>
        <View className='w-[20%] aspect-square opacity-[5%] top-[30%] left-[8%]' style={{ transform: [{ rotate: '80deg' }] }}>
          <Svg
            viewBox="0 0 512 512"
          >
            <Path
              d="M140.93 100.41c0-4.42 3.58-8.01 8.01-8.01H302.6c4.42 0 8.01 3.58 8.01 8.01s-3.58 8.01-8.01 8.01H148.94c-4.43-.01-8.01-3.59-8.01-8.01zm8.01 62.57H302.6c4.42 0 8.01-3.58 8.01-8.01s-3.58-8.01-8.01-8.01H148.94c-4.42 0-8.01 3.58-8.01 8.01s3.58 8.01 8.01 8.01zm0 54.57H302.6c4.42 0 8.01-3.58 8.01-8.01s-3.58-8.01-8.01-8.01H148.94c-4.42 0-8.01 3.58-8.01 8.01s3.58 8.01 8.01 8.01zm0 54.57h112.88c4.42 0 8.01-3.58 8.01-8.01s-3.58-8.01-8.01-8.01H148.94c-4.42 0-8.01 3.58-8.01 8.01s3.58 8.01 8.01 8.01zm0 54.56H238c4.42 0 8.01-3.58 8.01-8.01s-3.58-8.01-8.01-8.01h-89.06c-4.42 0-8.01 3.58-8.01 8.01s3.58 8.01 8.01 8.01zm0 54.57h76.08c4.42 0 8.01-3.58 8.01-8.01s-3.58-8.01-8.01-8.01h-76.08c-4.42 0-8.01 3.58-8.01 8.01s3.58 8.01 8.01 8.01zm333.14-205.62-74.96 74.96v191.54c0 17.11-13.92 31.03-31.03 31.03H132.04c-17.11 0-31.03-13.92-31.03-31.03v-7.36h-7.36c-17.11 0-31.03-13.92-31.03-31.02v-47.38H44.59c-11.64 0-21.1-9.47-21.1-21.1s9.47-21.1 21.1-21.1h18.04v-23.41H44.59c-11.64 0-21.1-9.47-21.1-21.1s9.47-21.1 21.1-21.1h18.04v-23.41H44.59c-11.64 0-21.1-9.47-21.1-21.1s9.47-21.1 21.1-21.1h18.04v-23.41H44.59c-11.64 0-21.1-9.47-21.1-21.1s9.47-21.1 21.1-21.1h18.04V69.91c0-17.12 13.92-31.05 31.03-31.05h244.06c17.11 0 31.03 13.93 31.03 31.05v6.87l7.84.48c17.34 1.05 30.76 14.72 30.54 31.12l-.74 52.34 13.38-13.38 17.01-17.01c8.58-8.58 22.55-8.58 31.14 0l14.17 14.17c8.58 8.58 8.58 22.55-.01 31.13zm-33.99 11.35-22.66-22.66-132.82 132.81 22.66 22.66 39.8-39.8.01-.01 38.37-38.37.01-.01zM281.48 330.92l17.99-4.28-13.71-13.71zm87.27-238.1v105.53l21.39-21.39.97-68.81c.1-7.83-6.7-14.38-15.5-14.91zM44.59 143.48h52.1c2.76 0 5.09-2.33 5.09-5.09s-2.33-5.09-5.09-5.09h-52.1c-2.76 0-5.09 2.33-5.09 5.09s2.33 5.09 5.09 5.09zm0 65.62h52.1c2.76 0 5.09-2.33 5.09-5.09s-2.33-5.09-5.09-5.09h-52.1c-2.76 0-5.09 2.33-5.09 5.09s2.33 5.09 5.09 5.09zm0 65.62h52.1c2.76 0 5.09-2.33 5.09-5.09s-2.33-5.09-5.09-5.09h-52.1c-2.76 0-5.09 2.33-5.09 5.09s2.33 5.09 5.09 5.09zm0 65.62h52.1c2.76 0 5.09-2.33 5.09-5.09 0-2.81-2.28-5.09-5.09-5.09h-52.1c-2.81 0-5.09 2.28-5.09 5.09 0 2.76 2.33 5.09 5.09 5.09zm49.07 78.41h244.06c8.28 0 15.01-6.73 15.01-15.01v-98.76l-31.8 31.8a7.992 7.992 0 0 1-3.81 2.13l-44.59 10.6c-.61.15-1.24.22-1.85.22-2.1 0-4.14-.83-5.66-2.35a8.003 8.003 0 0 1-2.13-7.51l10.6-44.59a7.992 7.992 0 0 1 2.13-3.81l77.11-77.11V69.91c0-8.29-6.73-15.04-15.01-15.04H93.66c-8.28 0-15.01 6.75-15.01 15.04v47.38h18.04c11.64 0 21.1 9.47 21.1 21.1s-9.47 21.1-21.1 21.1H78.65v23.41h18.04c11.64 0 21.1 9.47 21.1 21.1s-9.47 21.1-21.1 21.1H78.65v23.41h18.04c11.64 0 21.1 9.47 21.1 21.1s-9.47 21.1-21.1 21.1H78.65v23.41h18.04c11.64 0 21.1 9.47 21.1 21.1s-9.47 21.1-21.1 21.1H78.65v47.38c0 8.32 6.73 15.05 15.01 15.05zM391.11 266.6l-22.37 22.36v114.78c0 17.11-13.92 31.02-31.03 31.02H117.03v7.36c0 8.28 6.73 15.01 15.01 15.01H376.1c8.28 0 15.01-6.73 15.01-15.01zm79.65-110.78-14.17-14.17c-2.3-2.3-6.19-2.3-8.49 0L436.75 153l22.66 22.66 11.35-11.35c2.3-2.3 2.3-6.19 0-8.49z"
              fill="#000000"
              data-original="#000000"
            />
          </Svg>
        </View>
        <View className='w-[20%] aspect-square opacity-[5%] top-[-50%] left-[70%]' style={{ transform: [{ rotate: '10deg' }] }}>
          <Svg viewBox="0 0 682.667 682.667">
            <Defs>
              <ClipPath id="clip0">
                <Path d="M0 512h512V0H0Z" fill="#000000" />
              </ClipPath>
            </Defs>
            <G clipPath="url(#clip0)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
              <Path
                d="M0 0v-60h392v390H0v-90h392"
                transform="translate(105 106)"
                fill="none"
                stroke="#000000"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
              />
              <Path
                d="M0 0v-60"
                transform="translate(196 466)"
                fill="none"
                stroke="#000000"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
              />
              <Path
                d="M0 0v-60"
                transform="translate(407 466)"
                fill="none"
                stroke="#000000"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
              />
              <Path
                d="M0 0v-60"
                transform="translate(301 466)"
                fill="none"
                stroke="#000000"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
              />
              <Path
                d="M0 0c0-165-90-240-90-240h392s90 75 90 240"
                transform="translate(105 346)"
                fill="none"
                stroke="#000000"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
              />
            </G>
          </Svg>
        </View>
      </View>
      <View className='className= w-[100%] h-[40%]'>
        <ScrollView ref={slide} style={{ flexDirection: 'row', display: 'flex' }} className="w-full h-full" contentContainerClassName='flex justify-start items-center' showsHorizontalScrollIndicator={false} scrollEnabled={false} pagingEnabled={true} horizontal>
          <View className='w-screen h-[100%] flex flex-col justify-center items-center'>
            <View className='flex w-[50%] aspect-square'>
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
            <View className='w-[70%] h-[30%] flex justify-center items-center'>
              <Text className='text-xl font-extralight text-justify'>Hi Buddy, call me REM - your space to build, reflect, and grow.</Text>
            </View>
          </View>
          <View className='w-screen h-[100%] flex flex-col justify-center items-center'>
            <View className='flex w-[50%] aspect-square'>
              <LottieView source={require('../RemUpload/calendar.json')} autoPlay loop={true} style={{ width: '100%', height: '100%' }} />
            </View>
            <View className='w-[70%] h-[30%] flex justify-center items-center'>
              <Text className='text-xl font-extralight text-justify'>Hi Buddy, call me REM - your space to build, reflect, and grow.</Text>
            </View>
          </View>
          <View className='w-screen h-[100%] flex flex-col justify-center items-center'>
            <View className='flex w-[50%] aspect-square'>
              <LottieView source={require('../RemUpload/kanban.json')} autoPlay loop={true} style={{ width: '100%', height: '100%' }} />
            </View>
            <View className='w-[70%] h-[30%] flex justify-center items-center'>
              <Text className='text-xl font-extralight text-justify'>Hi Buddy, call me REM - your space to build, reflect, and grow.</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View className='w-[15%] aspect-[1/0.7] flex'>
        <Svg viewBox='0 0 100 100'>
          <Circle cx="20" cy="30" r="10" fill="#000" opacity={bar === 0 ? 1 : bar === 1 ? 0.2 : 0.2}/>
          <Circle cx="50" cy="30" r="10" fill="#000" opacity={bar === 0 ? 0.2 : bar === 1 ? 1 : 0.2}/>
          <Circle cx="80" cy="30" r="10" fill="#000" opacity={bar === 2 ? 1 : 0.2}/>
        </Svg>
      </View>
      <View className='w-[100%] h-[10%] flex flex-row items-center justify-end px-[5%]'>
        {(bar === 2) ?
          <Link className='border border-black py-[2%] px-[8%] rounded-full text-xl font-light' href='/sign'>Next</Link>
        :
          <Pressable onPress={progressBar} className='border border-black py-[2%] px-[8%] rounded-full'>
            <Text className='text-xl font-light'>Next</Text>
          </Pressable>
        }
      </View>
    </View>
  );
}

/*
<View className='w-[100%] h-[100%] flex flex-col justify-center items-center border border-red-500'>
          <View className='flex w-[50%] aspect-square'>
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
          <View className='w-[70%] h-[30%] flex justify-center items-center'>
            <Text className='text-xl font-extralight text-justify'>Hi Buddy, call me REM - your space to build, reflect, and grow.</Text>
          </View>
        </View>
        <View className='w-[100%] h-[100%] flex flex-col justify-center items-center'>
          <View className='flex w-[50%] aspect-square'>
            <LottieView source={require('../RemUpload/calendar.json')} autoPlay loop={true} style={{ width: '100%', height: '100%' }} />
          </View>
          <View className='w-[70%] h-[30%] flex justify-center items-center'>
            <Text className='text-xl font-extralight text-justify'>Hi Buddy, call me REM - your space to build, reflect, and grow.</Text>
          </View>
        </View>
        <View className='w-[100%] h-[100%] flex flex-col justify-center items-center'>
          <View className='flex w-[50%] aspect-square'>
            <LottieView source={require('../RemUpload/kanban.json')} autoPlay loop={true} style={{ width: '100%', height: '100%' }} />
          </View>
          <View className='w-[70%] h-[30%] flex justify-center items-center'>
            <Text className='text-xl font-extralight text-justify'>Hi Buddy, call me REM - your space to build, reflect, and grow.</Text>
          </View>
        </View>
      */