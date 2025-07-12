'use client'

import { useCall, VideoPreview } from '@stream-io/video-react-sdk';
import { useEffect } from 'react';

const MeetingSetup = () => {

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  const call = useCall();

  useEffect(() => {
    if (isMicCamToggled) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggled, call?.camera, call?.microphone]);


  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
    </div>
  )
}

export default MeetingSetup

function useState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}
