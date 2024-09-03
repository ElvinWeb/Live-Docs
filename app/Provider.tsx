"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

function Provider({ children }: { children: ReactNode }) {
  const { user: clerkUser } = useUser();

  const resolveUsersHandler = async function ({ userIds }: { userIds: any[] }) {
    console.log(userIds);

    const users = await getClerkUsers({ userIds });
    return users;
  };

  const resolveMentionHandler = async function ({
    text,
    roomId,
  }: {
    text: string;
    roomId: string;
  }) {
    const roomUsers = await getDocumentUsers({
      text,
      roomId,
      currentUser: clerkUser?.emailAddresses[0].emailAddress as string,
    });

    return roomUsers;
  };

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={resolveUsersHandler}
      resolveMentionSuggestions={resolveMentionHandler}
    >
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export default Provider;
