"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient, UserRequest } from "@stream-io/node-sdk";

export const tokenProvider = async () => {
  // 1. Get the logged-in user from Clerk
  const user = await currentUser();

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const apiSecret = process.env.STREAM_SECRET_KEY;

  if (!apiKey || !apiSecret) {
    throw new Error("Stream API key or secret not configured");
  }

  // 2. Initialize the Stream server-side client
  const client = new StreamClient(apiKey, apiSecret);

  // 3. Create the user object for Stream, mapping Clerk user data
  const streamUser: UserRequest = {
    id: user.id, // Use the unique ID from Clerk
    name: user.username || user.id, // Use username, or fallback to ID
    image: user.imageUrl,
    role: "user", // Assign a default role
  };

  // 4. Create or update the user in Stream
  await client.upsertUsers([streamUser]);

  // 5. Generate a token for the user
  const validityInSeconds = 60 * 60; // Token is valid for 1 hour
  const token = client.generateUserToken({ user_id: user.id, validity_in_seconds: validityInSeconds });

  return token;
};