import React  from 'react';
import { View, ActivityIndicator, StyleSheet, ImageBackground } from "react-native"
import { useLogin } from "../context"


const background = require("assets/images/colorful-shades-abstract-background.webp");

const LoadingScreen = () => {
  const {loginPending} = useLogin();

  return (
    <>
      {loginPending && (
        <View style={style.container}>
          <ImageBackground source={background} resizeMode="cover" style={style.image}>
          <ActivityIndicator size="large" color="white" />
          </ImageBackground>
        </View>
      )}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundImage: background,
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});


export { LoadingScreen };
