import { useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export const RecipeListItem = ({ data } : { data: any }) => {
  const { recipeId, recipeName, rating } = data;

  const router = useRouter();

  const viewRecipeMarkdown = () => {
    router.push({
      pathname: "/recipeDetails",
      params: { recipeId, recipeName }
    })
  }

  return (
    <TouchableOpacity 
      className="flex w-full p-8 flex-row justify-between"
      onPress={viewRecipeMarkdown}
    >
      <Text className="text-white">{recipeName}</Text>
      <Text className="text-white">{rating}</Text>
    </TouchableOpacity>
  )
}