import React, { createContext, useContext, useReducer, ReactNode } from "react";
import appReducer from "./appReducer";

// Define the shape of the state
interface AppState {
  showSidebar: boolean;
}

// Define action types
type AppAction = { type: 'TOGGLE_SIDEBAR' };

// Define context value type
interface AppContextType extends AppState {
  toggleSidebar: () => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Define initial state
const initialState: AppState = {
  showSidebar: true,
};

// AppProvider component props type
interface AppProviderProps {
  children: ReactNode;
}

// AppProvider component
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<AppState, AppAction>>(appReducer, initialState);

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  return (
    <AppContext.Provider value={{ ...state, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the AppContext
const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { useAppContext, AppProvider };
