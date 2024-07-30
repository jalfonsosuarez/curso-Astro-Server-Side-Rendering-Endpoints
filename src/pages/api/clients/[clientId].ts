import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { db, Clients, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const clientId = params ?? "";

  const client = await db
    .select()
    .from(Clients)
    .where(eq(Clients.id, +clientId));

  return new Response(JSON.stringify({ client }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId ?? "";

  console.log({ clientId });

  try {
    const { id, ...body } = await request.json();

    const results = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, +clientId));

    const updatedClient = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, +clientId));

    return new Response(JSON.stringify(updatedClient.at(0)), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        msg: "no body found",
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const clientId = params.clientId ?? "";

  const { rowsAffected } = await db
    .delete(Clients)
    .where(eq(Clients.id, +clientId));

  if (rowsAffected > 0) {
    return new Response(
      JSON.stringify({
        msg: "Deleted",
        clientId,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        msg: "No rows deleted",
        clientId,
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
