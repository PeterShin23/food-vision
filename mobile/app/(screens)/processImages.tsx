import { Stack, useRouter } from "expo-router";
import * as React from "react";
import LoadingScreen from "./loading";
import { View, Text } from "react-native";
import { useImageContext } from '../contexts/imageContext';
import { useIngredientContext } from "../contexts/ingredientsContext";

const processedMessage = [
  "Drumroll please!",
  "Enjoy your meal!",
  "Hope you enjoy!",
  "Thanks for waiting!"
]

const ProcessImagesScreen = () => {
  const router = useRouter();
  const { images } = useImageContext();
  const { setIngredients } = useIngredientContext();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [processedResult, setProcessedResult] = React.useState<string[][]>(null);

  React.useEffect(() => {
    const process = async () => {
      if (!images?.length) return;
      
      try {
        const formData = new FormData();

        images.forEach((imageUri) => {
          const filename = imageUri.split('/').pop();
          const match = /\.(\w+)$/.exec(filename ?? '');
          const type = match ? `image/${match[1]}` : 'image';
    
          formData.append('files', {
            uri: imageUri,
            name: filename,
            type,
          } as any);
        });
    
        const response = await fetch('http://10.0.0.43:8000/predict/', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });    

        const data = await response.json();

        setProcessedResult(data.results);

        return data.results;
      } catch (error) {
        console.error('Error processing images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    process().then(res => console.log(res));
  }, []);

  React.useEffect(() => {
    if (isLoading) return;

    if (!processedResult) return;

    setTimeout(() => {
      setIngredients(processedResult.flatMap(x => x))

      router.push({
        pathname: "/listIngredients",
      })
    }, 2000);
  }, [isLoading, processedResult])

  const message = processedMessage[Math.floor(Math.random() * processedMessage.length)];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Finding ingredients...",
        }} />
      <View className="flex items-center justify-center h-full">
        {isLoading ? <LoadingScreen /> : <View><Text className="text-white">{message}</Text></View>}
      </View>
    </>
  );
}

export default ProcessImagesScreen;