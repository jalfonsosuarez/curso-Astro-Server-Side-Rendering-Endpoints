import { defineAction } from "astro/actions/runtime/virtual/server.js";
import { z } from "astro/zod";
import { db, Posts, eq } from "astro:db";

export const updatePostLikes = defineAction({
  accept: "json",
  input: z.object({
    postId: z.string(),
    likes: z.number(),
  }),
  handler: async ({ postId, likes }) => {
    const posts = await db.select().from(Posts).where(eq(Posts.id, postId));

    if (posts.length === 0) {
      const newPost = {
        id: postId,
        title: "Post not found",
        likes: 0,
      };

      await db.insert(Posts).values(newPost);
      posts.push(newPost);
    }

    const post = posts.at(0)!;
    post.likes = post.likes + likes;

    await db.update(Posts).set(post).where(eq(Posts.id, postId));

    return true;
  },
});
