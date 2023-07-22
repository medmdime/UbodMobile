import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native"
import { useUserNutrition } from "../../context"
import { Camera } from "expo-camera"
import { BarCodeScanner } from "expo-barcode-scanner"
import { Button, Header } from "../../components"
import { ApiResponseNutrition, getMeal } from "../../services/api"
import { updateNutriments } from "../../context/types"
import { goBack } from "../../navigators"

const BarcodeScanner = () => {
  const nutrition = useUserNutrition()

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [torchOn, setTorchOn] = useState<boolean>(false)


  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.getCameraPermissionsAsync()
      setHasCameraPermission(status === "granted")
    }
    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = async ({ type, data }) => {
    setLoading(true)
    alert(`Bar code with type ${type} and data ${data} has been scanned!`)
    try {
      const response = await getMeal(data)
      if (response.ok) {
        const data = response.data as ApiResponseNutrition
        const meal = updateNutriments(data.products[0])
        nutrition.setBreakfast([...nutrition.breakfast, meal])
        setLoading(false)
        goBack()
      } else {
        setLoading(false)
        Alert.alert("Error", "Product not found")
      }
    } catch (error) {
      setLoading(false)
    }
  }

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  }

  if (!hasCameraPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Camera permission is required to use the barcode scanner.
        </Text>
      </View>
    )
  }
  if (!loading) {

    return (
      <View style={styles.container}>
        <Header title={"Scan Barcode"} />
        <Camera
          type={1}
          // @ts-ignore
          autoFocus={Camera.Constants.AutoFocus.singleShot}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8, BarCodeScanner.Constants.BarCodeType.upc_a, BarCodeScanner.Constants.BarCodeType.upc_e],
          }}
          onBarCodeScanned={handleBarCodeScanned}
          style={styles.preview}
          // @ts-ignore
          flashMode={torchOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
          focusDepth={1}
        />
        <Button onPress={() => setTorchOn(!torchOn)} text="Torch" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    )
  }


}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // backgroundColor:colors.background,
    // flex: 1,
    // justifyContent: 'center',
    height: "60%",

    textAlign: "center",
  },
  permissionText: {
    fontSize: 18,
    margin: 20,
    textAlign: "center",
  },
  // eslint-disable-next-line react-native/no-unused-styles
  preview: {
    height: "80%",

    margin: 20,


    width: "80%",

  },
  // eslint-disable-next-line react-native/no-unused-styles
  text: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  // eslint-disable-next-line react-native/no-unused-styles,react-native/sort-styles
  bottomOverlay: {
    flex: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
  },
})

export { BarcodeScanner }