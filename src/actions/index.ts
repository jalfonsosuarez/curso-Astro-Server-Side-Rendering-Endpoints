import { getPostLikes } from "./posts/get-post-likes.actions";
import { updatePostLikes } from "./posts/update-post-likes.action";

export const server = {
  // Posts
  getPostLikes,
  updatePostLikes,
};
