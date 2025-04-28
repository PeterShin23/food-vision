import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useIngredientContext } from '../contexts/ingredientsContext';
import { Stack } from 'expo-router';

export default function IngredientsListScreen() {
  const { ingredients: context } = useIngredientContext();

  const [ingredients, setIngredients] = useState<string[]>([
    // ...myIngredients,
    ...context
  ]);
  const [newIngredient, setNewIngredient] = useState('');

  // TODO: Remove this and opt for contextual loading screen
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleDelete = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleAdd = () => {
    if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };


  const handleConfirm = async () => {
    if (ingredients.length === 0) {
      Alert.alert('Please add at least one ingredient.');
      return;
    }

    try {
      setIsSubmitting(true);

      Alert.alert("This will be implemented soon!");
    } catch (error) {
      console.error('Error generating recipe:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Stack.Screen options={{ title: "Confirm ingredients" }} />
    <View style={styles.container}>
      <View style={styles.addRow}>
        <TouchableOpacity onPress={handleAdd}>
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Add Ingredient"
          placeholderTextColor="#777"
          value={newIngredient}
          onChangeText={setNewIngredient}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
      </View>

      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => `${item}-${index}`}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => handleDelete(index)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} disabled={isSubmitting}>
        <Text style={styles.confirmButtonText}>{isSubmitting ? 'Submitting...' : 'Make My Recipe'}</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const ACCENT_COLOR = '#e91e63';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    fontSize: 28,
    color: ACCENT_COLOR,
    marginRight: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    flex: 1,
    fontSize: 18,
    color: '#fff',
    paddingVertical: 4,
  },
  listContent: {
    paddingBottom: 100, // extra bottom padding if the list is short
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
  },
  deleteButton: {
    color: ACCENT_COLOR,
    fontSize: 18,
    paddingHorizontal: 8,
  },
  confirmButton: {
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 24,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});