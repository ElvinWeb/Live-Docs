"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled Document",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(error);
  }
};

export const getDocument = async function ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) {
  try {
    const room = await liveblocks.getRoom(roomId);

    //// LATER BRING BACK

    // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    // if (!hasAccess) {
    //   throw new Error("you don't have access to documents");
    // }

    return parseStringify(room);
  } catch (error) {
    console.log(error);
  }
};

export const updateDocument = async function (roomId: string, title: string) {
  try {
    const updateRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });

    revalidatePath(`document/${roomId}`);

    return parseStringify(updateRoom);
  } catch (error) {
    console.log(error);
  }
};
