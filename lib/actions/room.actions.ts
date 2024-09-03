"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { CreateDocumentParams, RoomAccesses } from "@/types";

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
  userId,
  roomId,
}: {
  userId: string;
  roomId: string;
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

export const getDocuments = async function (email: string) {
  try {
    const rooms = await liveblocks.getRooms({ userId: email });

    return parseStringify(rooms);
  } catch (error) {
    console.log(error);
  }
};
