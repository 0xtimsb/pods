type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Dragging = "DRAGGING",
  NotDragging = "NOT_DRAGGING",
}

type DraggingPayload = {
  [Types.Dragging]: undefined;
  [Types.NotDragging]: undefined;
};

export type DraggingActions = ActionMap<DraggingPayload>[keyof ActionMap<DraggingPayload>];

export const draggingReducer = (state: boolean, action: DraggingActions) => {
  switch (action.type) {
    case Types.Dragging:
      return true;
    case Types.NotDragging:
      return false;
    default:
      return state;
  }
};
