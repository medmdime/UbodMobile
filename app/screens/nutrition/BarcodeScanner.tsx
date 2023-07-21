import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNutrition } from "../../context"
import { Camera } from "expo-camera"
import { BarCodeScanner } from "expo-barcode-scanner"
import { useNavigation } from "@react-navigation/native"
import { goBack } from "../../navigators"

const BarcodeScanner = () => {
  const nutrition = useNutrition();

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
  const [valueCode, setValueCode] = useState<string>('');
  const navigation = useNavigation();
  const updateNutriments = (food: any, portionValue: any) =>  {
    const updatedFood = { ...food };

    const scaleFactor = parseFloat(portionValue) || 1;

    // Create a new "nutriments-portion" object by duplicating the "nutriments" object
    updatedFood['nutrimentsportion'] = { ...updatedFood.nutriments };
    updatedFood['portion'] = scaleFactor;

    // Add a unique ID to differentiate between different items with the same product
    updatedFood.uniqueId = new Date().getTime();
    if (!updatedFood.hasOwnProperty('nutriments')) {
      updatedFood['nutriments'] = {};
    }
    Object.entries(updatedFood['nutriments'])?.forEach(([key, value]) => {
      if (typeof value === 'number') {
        updatedFood['nutrimentsportion'][key] = Math.round(value * scaleFactor);
      }
    });
    return updatedFood;
  };
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setValueCode(data);

    fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?code=${data}&fields=_id,product_name,nutriments&action=process&json=1`,
    )
      .then(response => response.json())
      .then(json => {

        if (json.products === undefined || json.products.length === 0) {
          Alert.alert(
            'Product not found',
            'Please try again',
          );
          // navigation.navigate('addAliment');
        } else {
          // @ts-ignore
          nutrition.setBreakfast([updateNutriments(json.products[0], 1) ]);
          console.log(json.products[0])
          // console.log(updateNutriments(json.products[0], 1))
          // navigation.navigate('Nutrition' as never);
          goBack()
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!hasCameraPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Camera permission is required to use the barcode scanner.
        </Text>
      </View>
    );
  }
    return (
      <View style={styles.container}>
        <Camera
          type={1}
          autoFocus={true}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13 , BarCodeScanner.Constants.BarCodeType.ean8 , BarCodeScanner.Constants.BarCodeType.upc_a , BarCodeScanner.Constants.BarCodeType.upc_e] ,
          }}
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          flashMode={Camera.Constants.FlashMode.torch}
          focusDepth={1}
        />
      </View>
    );


}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    permissionText: {
      fontSize: 18,
      textAlign: 'center',
      margin: 20,
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    text: {
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    cameraIcon: {
      marginmargin: 5,
      height: 40,
      width: 40,
    },
    bottomOverlay: {
      position: 'absolute',
      width: '100%',
      flex: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export { BarcodeScanner } ;
