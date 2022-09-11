import Cookies from "js-cookie";
import { FC, useReducer, useEffect, useContext } from "react";
import { TagContext, TagProps, TagReducer } from ".";
import { AuthContext } from "../auth";

export interface TagState {
  tag: TagProps[];
}

const TAG_INITIAL_STATE = {
  tag: [],
};

export const TagProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tagState, dispatch] = useReducer(TagReducer, TAG_INITIAL_STATE);

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth === null) {
      return;
    }
    const getTag = async () => {
      const response = await fetch("/api/tag/get_tag", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response) return null;

      const { tags } = await response.json();

      dispatch({ type: "[Tag] - Get tags from DB", payload: tags });
    };

    getTag();
  }, [auth]);

  const createTag = async (
    title: string,
    color: string
  ): Promise<boolean | null> => {
    try {
      const response = await fetch("/api/tag/createTag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          color,
        }),
      });

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const tagCreated = await response.json();

      const { tag } = tagCreated;

      dispatch({
        type: "[Tag] - Create a tag",
        payload: [...tagState.tag, tag],
      });

      return true;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const deleteTag = async (tag: TagProps): Promise<boolean | null> => {
    try {
      const response = await fetch(`/api/tag/delete_tag/?id=${tag.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("somenthing went wrong");
      }

      dispatch({ type: "[Tag] - Delete tag", payload: tag });
      return true;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const updateTag = async (tag: TagProps): Promise<boolean | null> => {
    try {
      const response = await fetch(`/api/tag/update_tag/?id=${tag.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tag),
      });

      if (!response.ok) {
        throw new Error("Could went wrong");
      }

      const updatedTag = tagState.tag.map((elem) => {
        if (elem.id !== tag.id) return elem;

        return tag;
      });

      dispatch({ type: "[Tag] - Update  tag", payload: updatedTag });
      return true;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <TagContext.Provider
      value={{ ...tagState, createTag, deleteTag, updateTag }}
    >
      {children}
    </TagContext.Provider>
  );
};
