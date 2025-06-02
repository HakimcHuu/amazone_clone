import { Type } from "./action.type";
// Console.log("");

// Get initial basket from localStorage based on user ID
const getInitialBasket = (userId) => {
  try {
    if (!userId) return [];
    const savedBasket = localStorage.getItem(`basket_${userId}`);
    return savedBasket ? JSON.parse(savedBasket) : [];
  } catch (error) {
    console.error('Error loading basket from localStorage:', error);
    return [];
  }
};

export const initialState = {
  basket: [],
  user: null,
};

// Helper function to save basket to localStorage
const saveBasketToStorage = (basket, userId) => {
  try {
    if (userId) {
      localStorage.setItem(`basket_${userId}`, JSON.stringify(basket));
    }
  } catch (error) {
    console.error('Error saving basket to localStorage:', error);
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      let newBasket;
      
      if (existingItem) {
        newBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
      } else {
        newBasket = [...state.basket, { ...action.item, amount: 1 }];
      }
      
      // Save to localStorage with user ID
      if (state.user?.uid) {
        saveBasketToStorage(newBasket, state.user.uid);
      }
      
      return {
        ...state,
        basket: newBasket,
      };

    case Type.REMOVE_FROM_BASKET:
      const updatedBasket = state.basket.map((item) => {
        if (item.id === action.id) {
          if (item.amount > 1) {
            return { ...item, amount: item.amount - 1 };
          }
          return null;
        }
        return item;
      }).filter(Boolean);
      
      // Save to localStorage with user ID
      if (state.user?.uid) {
        saveBasketToStorage(updatedBasket, state.user.uid);
      }
      
      return {
        ...state,
        basket: updatedBasket,
      };

    case Type.EMPTY_BASKET:
      // Clear from localStorage for current user
      if (state.user?.uid) {
        localStorage.removeItem(`basket_${state.user.uid}`);
      }
      return {
        ...state,
        basket: [],
      };

    case Type.SET_USER:
      // When setting user, load their specific basket
      const userBasket = action.user ? getInitialBasket(action.user.uid) : [];
      return {
        ...state,
        user: action.user,
        basket: userBasket,
      };

    default:
      return state;
  }
};
