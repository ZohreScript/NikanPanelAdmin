// src/context/AppContext.tsx

import { createContext, useContext, useReducer, ReactNode } from "react";
import PropTypes from "prop-types";
import appReducer from "./appReducer" 

// Define the shape of the state
export interface AppState {
  showSidebar: boolean;
}

// Define the action types
interface ToggleSidebarAction {
  type: 'TOGGLE_SIDEBAR';
}

export type AppAction = ToggleSidebarAction; // Add more actions as needed

const AppContext = createContext<{ state: AppState; toggleSidebar: () => void } | undefined>(undefined);

const initialState: AppState = {
  showSidebar: true,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  return (
    <AppContext.Provider value={{ state, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// PropTypes for runtime validation
// This will work, but you might want to consider using TypeScript types instead
// PropTypes is optional when using TypeScript
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
