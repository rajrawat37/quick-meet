'use client'

import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { toast } from 'sonner';
import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';

const MeetingTypeList = () => {

  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  })

  const [callDetails, setCallDetails] = useState<Call | null>(null);

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      const callType = 'default';
      const id = crypto.randomUUID(); // crypto is a browser API and randomUUID is a method that generates a random UUID

      const call = client.call(callType, id);

      if (!call) throw new Error("Failed to create call");

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          }
        }
      })

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast.success("Meeting created successfully");

    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')}
      />

      {/*    */}

      {!callDetails ?
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Start an InstantMeeting"
          className="text-center"
          buttonText="Schedule Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e: any) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
        :
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Start an InstantMeeting"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link copied to clipboard");
          }}
          image="/icons/checked.svg"
          buttonIcon='icons/copy.svg'
          buttonText='Copy Meeting Link'
        />}

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an InstantMeeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList
