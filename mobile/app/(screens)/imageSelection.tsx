import * as React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { useUserMedia } from "@/hooks/useUserMedia";

const ImageSelectionScreen = () => {
  const { images, setImages, onOpenGallery, onOpenCamera } = useUserMedia()

  return (
    <View className="flex items-center justify-center flex-col gap-y-16 h-full">
      <TouchableOpacity 
        style={styles.buttonGeneral}
        onPress={onOpenGallery}
      ><Text>Open Gallery</Text></TouchableOpacity>
      <TouchableOpacity 
        style={styles.buttonGeneral}
        onPress={onOpenCamera}
      ><Text>Open Camera</Text></TouchableOpacity>
    </View>
  )
}

export default ImageSelectionScreen;

const styles = StyleSheet.create({
  buttonGeneral: {
    backgroundColor: "#e91e63",
    padding: 16,
    width: "auto",
    height: "auto",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }
})