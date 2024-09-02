"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";
import { getClerkUsers } from "@/lib/actions/user.actions";

function Provider({ children }: { children: ReactNode }) {
  const resolveUsersHandler = async function ({
    userIds,
  }: {
    userIds: string[];
  }) {
    const users = await getClerkUsers({ userIds });
    return users;
  };

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={resolveUsersHandler}
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
