"use client"
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import {
  StreamVideo,
  StreamVideoClient
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;


export const StreamVideoProvider = ({ children }: { children: React.ReactNode }) => {

  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  // The useEffect hook creates the client instance with new StreamVideoClient(...). 
  // At this point, there is still no network connection.
  useEffect(() => {
    if (!isLoaded || !user) return;

    if (!apiKey) throw new Error("Stream API key missing");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.fullName || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider: tokenProvider,
    })
    setVideoClient(client);
  }, [user, isLoaded])

  if (!videoClient) return <Loader />;


  return (
    // The StreamVideo component is the main component that provides the video client to the children.
    // This official component from the Stream SDK is responsible for taking the configured client 
    // and initiating the actual WebSocket connection to Stream's servers behind the scenes.
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
};

export default StreamVideoProvider;


/*
Handling Initial Page Load ⏳
    isLoaded is initially false, and user is null during first load.
    useEffect runs but early exits due to if (!isLoaded || !user) return.
    When Clerk loads: isLoaded = true, user gets actual user object.
    Effect re-runs because isLoaded and user changed (dependency array triggers it).
    If deps array was [], the effect wouldn't run again — client not created.

Handling Login and Logout 🔄
    On logout: user becomes null, effect detects and halts.
    On new login: user changes, effect re-runs due to updated dependency.
    Ensures new StreamVideoClient is created for the correct user.
    Prevents logged-in user from using client of a previous session.
*/

