import * as React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { useUserMedia } from "@/hooks/useUserMedia";
import { Stack, useRouter } from "expo-router";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const ImageSelectionScreen = () => {
  const { images, onOpenGallery, onOpenCamera } = useUserMedia()
  const router = useRouter();

  const processImages = (images: string[]) => {
    router.push({
      pathname: "/processImages",
      params: { images: JSON.stringify(images) }
    });
  }

  return (
    <>
      <Stack.Screen
          options={{
            title: "Select Images",
          }}
          />
      <View className="flex items-center justify-center flex-col gap-y-16 h-full">
        <View className="flex flex-row items-center justify-center gap-x-8">
          <TouchableOpacity 
            style={styles.buttonGeneral}
            onPress={onOpenGallery}>
            <MaterialIcons name="photo-library" size={24} color="black" />        
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonGeneral}
            onPress={onOpenCamera}>
            <MaterialIcons name="photo-camera" size={24} color="black" />        
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={{...styles.buttonGeneral, width: "60%" }}
          onPress={() => processImages(images)}>
          <FontAwesome name="send" size={24} color="black" />        
        </TouchableOpacity>
      </View>
    </>
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