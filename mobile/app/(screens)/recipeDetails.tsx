import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const RecipeDetailsScreen = () => {
  const { recipeId, recipeName } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: recipeName as string,
        }}
      />
      <View>
        <Text className="text-white">{recipeId}</Text>
        <Text className="text-white">{recipeName}</Text>
      </View>
    </>
  )
};

export default RecipeDetailsScreen;