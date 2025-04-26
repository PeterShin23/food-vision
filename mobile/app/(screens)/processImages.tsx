import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import LoadingScreen from "./loading";
import { View, Text } from "react-native";

const processedMessage = [
  "Drumroll please!",
  "Enjoy your meal!",
  "Hope you enjoy!",
  "Thanks for waiting!"
]

const ProcessImagesScreen = () => {
  const { images } = useLocalSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [processedResult, setProcessedResult] = React.useState(null);

  React.useEffect(() => {
    const process = async () => {
      console.log("Will be processing images here", images);

      // TODO: Run through CV
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsLoading(false);
    };

    process();
  }, []);

  React.useEffect(() => {
    if (isLoading) return;

    // TODO: Should send to verify screen then OpenAI
    setTimeout(() => {
      router.push({
        pathname: "/viewRecipe",
        params: { processedResult }
      })
    }, 2000);
  }, [isLoading])

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