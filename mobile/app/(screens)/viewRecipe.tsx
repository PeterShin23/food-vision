import RecipeViewer from "@/components/ui/recipeViewer";

const ViewRecipeScreen = () => {
  const mockRecipe = {
    title: "Apple Pie",
    ingredients: [
      { name: "apple", amount: "2" },
      { name: "flour", amount: "1 cup" },
      { name: "sugar", amount: "1/2 cup" },
      { name: "cinnamon", amount: "1 tsp" },
    ],
    steps: [
      "Preheat oven to 350°F.",
      "Mix apples, flour, sugar, and cinnamon together.",
      "Bake for 45 minutes until golden brown."
    ],
  };

  return <RecipeViewer recipe={mockRecipe} />;
};

export default ViewRecipeScreen;