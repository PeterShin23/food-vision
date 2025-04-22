import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

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
      style={styles.item}
      onPress={viewRecipeMarkdown}
    >
      <Text className="text-white">{recipeName}</Text>
      <Text className="text-white">{rating}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 32,
    borderRadius: 100,
    borderBottomWidth: 1,
    borderColor: "white"
  }
})