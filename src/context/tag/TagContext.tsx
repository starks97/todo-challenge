import { createContext } from "react";

export interface TagProps {
  id: string;
  title: string;
  color: string;
  userId: string;
}

interface ContextProps {
  tag: TagProps[];
  createTag: (title: string, color: string) => Promise<boolean | null>;
  deleteTag: (tag: TagProps) => Promise<boolean | null>;
  updateTag: (tag: TagProps) => Promise<boolean | null>;
}

export const TagContext = createContext({} as ContextProps);
