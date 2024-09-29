// src/reducers/app-reducer.ts

import { AppState, AppAction } from './App-context'; // Adjust the path based on your directory structure

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    default:
      return state;
  }
};

export default appReducer;
