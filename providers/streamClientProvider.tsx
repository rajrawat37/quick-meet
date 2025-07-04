import {
  StreamVideoClient
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;


export const StreamVideoProvider = ({ children }: { children: React.ReactNode }) => {

  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  // const {user,isLoaded} = useUser();

  useEffect(() => {
    if (!videoClient) {
      const client = new StreamVideoClient({ apiKey: apiKey || "" });
      setVideoClient(client);
    }
  }, [videoClient])


  return (
    <></>
    // <StreamVideo client={videoClient}>

    // </StreamVideo>
  );
};

export default StreamVideoProvider;
