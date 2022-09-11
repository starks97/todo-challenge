import { TagProps, TagState } from ".";

type TagActionType =
  | { type: "[Tag] - Create a tag"; payload: TagProps[] }
  | { type: "[Tag] - Get tags from DB"; payload: TagProps[] }
  | { type: "[Tag] - Update  tag"; payload: TagProps[] }
  | { type: "[Tag] - Delete tag"; payload: TagProps };

export const TagReducer = (state: TagState, action: TagActionType) => {
  switch (action.type) {
    case "[Tag] - Create a tag":
      return {
        ...state,
        tag: [...action.payload],
      };

    case "[Tag] - Get tags from DB":
      return {
        ...state,
        tag: action.payload,
      };

    case "[Tag] - Update  tag":
      return {
        ...state,
        tag: [...action.payload],
      };

    case "[Tag] - Delete tag":
      return {
        ...state,
        tag: state.tag.filter((elem) => !(elem.id === action.payload.id)),
      };

    default:
      return state;
  }
};
