import React  from 'react';
import {View, ActivityIndicator} from 'react-native';
import { useLogin } from "../context"



const LoadingScreen = () => {
  const {loginPending} = useLogin();

  return (
    <>
      {loginPending && (
        <View >
          <ActivityIndicator size="large" color="#F80" />
        </View>
      )}
    </>
  );
};



export { LoadingScreen };
