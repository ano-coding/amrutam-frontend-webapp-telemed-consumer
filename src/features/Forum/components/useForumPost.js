import { useContext } from "react";
import { ForumPostContext } from "./ForumPostContext";

const useForumPost = () => {
  const context = useContext(ForumPostContext);
  if (context === undefined) {
    throw new Error("useForumPost must be used within a ForumPostProvider");
  }
  return context;
};

export default useForumPost;
