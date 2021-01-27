import React, { createContext, useReducer } from "react";
import { draggingReducer, DraggingActions } from "./reducers";

type InitialStateType = {
  isDragging: boolean;
};

const initialState = {
  isDragging: false,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<DraggingActions>;
}>({ state: initialState, dispatch: () => null });

const mainReducer = (
  { isDragging }: InitialStateType,
  action: DraggingActions
) => ({
  isDragging: draggingReducer(isDragging, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
