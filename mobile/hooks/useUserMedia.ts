import * as React from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const useUserMedia = () => {
  const [images, setImages] = React.useState<string[]>([]);

  const onOpenGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission required", "Please allow permissions to select images.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 10,
        quality: 1,
      });

      if (result.canceled) {
        return;
      }

      setImages(result.assets.map(a => a.uri));
    } catch (err) {
      console.error(err);
    }
  };

  const onOpenCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission required", "Please allow permissions to access camera.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) {
        return;
      }

      setImages(result.assets.map(a => a.uri));
    } catch (err) {
      console.error(err);
    }
  };

  return {
    images,
    setImages,
    onOpenGallery,
    onOpenCamera,
  }
}