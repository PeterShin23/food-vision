import React, { createContext, useContext, useState } from 'react';

type IngredientContextType = {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
};

const IngredientContext = createContext<IngredientContextType | undefined>(undefined);

export const IngredientProvider = ({ children }: { children: React.ReactNode }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  return (
    <IngredientContext.Provider value={{ ingredients, setIngredients }}>
      {children}
    </IngredientContext.Provider>
  );
};

export const useIngredientContext = () => {
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error('useIngredientContext must be used within an IngredientProvider');
  }
  return context;
};
