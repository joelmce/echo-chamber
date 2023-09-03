-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "messageId" SET DEFAULT (concat('msg_', gen_random_uuid()))::TEXT,
ALTER COLUMN "messageId" DROP DEFAULT;
DROP SEQUENCE "Message_messageId_seq";

-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "playlistId" SET DEFAULT (concat('pl_', gen_random_uuid()))::TEXT,
ALTER COLUMN "playlistId" DROP DEFAULT;
DROP SEQUENCE "Playlist_playlistId_seq";

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "roomId" SET DEFAULT (concat('room_', gen_random_uuid()))::TEXT,
ALTER COLUMN "roomId" DROP DEFAULT;
DROP SEQUENCE "Room_roomId_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userId" SET DEFAULT (concat('usr_', gen_random_uuid()))::TEXT,
ALTER COLUMN "userId" DROP DEFAULT;
DROP SEQUENCE "User_userId_seq";
