import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

type Ingredient = {
  name: string;
  amount: string;
};

type Recipe = {
  title: string;
  ingredients: Ingredient[];
  steps: string[];
};

type Props = {
  recipe: Recipe;
};

export default function RecipeViewer({ recipe }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{recipe.title}</Text>

      {/* Ingredients Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛒 Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listBullet}>•</Text>
            <Text style={styles.listText}>
              {ingredient.amount} {ingredient.name}
            </Text>
          </View>
        ))}
      </View>

      {/* Steps Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>👨‍🍳 Steps</Text>
        {recipe.steps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <Text style={styles.stepNumber}>{index + 1}.</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#555',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listBullet: {
    fontSize: 24,
    marginRight: 8,
    color: '#6b7280',
  },
  listText: {
    fontSize: 16,
    color: '#333',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
    color: '#6b7280',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
