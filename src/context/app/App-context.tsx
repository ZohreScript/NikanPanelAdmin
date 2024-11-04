import React, { createContext, useContext, useReducer, ReactNode } from "react";
import appReducer from "./appReducer";

interface AppState {
  showSidebar: boolean;
  isAuthenticated: boolean;
}

type AppAction = 
  | { type: 'TOGGLE_SIDEBAR' } 
  | { type: 'SET_AUTHENTICATED', payload: boolean };

interface AppContextType extends AppState {
  toggleSidebar: () => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  showSidebar: true,
  isAuthenticated: false,
};

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<AppState, AppAction>>(appReducer, initialState);

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const setAuthenticated = (isAuthenticated: boolean) => {
    dispatch({ type: 'SET_AUTHENTICATED', payload: isAuthenticated });
  };

  return (
    <AppContext.Provider value={{ ...state, toggleSidebar, setAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { useAppContext, AppProvider, type AppAction, type AppState };
