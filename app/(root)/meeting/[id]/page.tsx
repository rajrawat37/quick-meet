//         Part 1                        Part 2
// (Object Destructuring)     (TypeScript Type Annotation)
// "Give me the 'params'    "The object you receive will look
//  property"                like this"
//      ▼                           ▼
// ({params})         : {params: Promise<{ id: string }>}

'use client'

import MeetingRoom from "@/components/ui/MeetingRoom";
import MeetingSetup from "@/components/ui/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

export default async function Meeting({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user, isLoaded } = useUser();

  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = await useGetCallById(id);

  if (!isLoaded || isCallLoading) return <div>Loading...</div>;

  return (
    <main className="h-screen w-full">

      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>

    </main>
  );
}
