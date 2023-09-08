-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "messageId" SET DEFAULT (concat('msg_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "roomId" SET DEFAULT (concat('room_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "songId" SET DEFAULT (concat('song_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userId" SET DEFAULT (concat('usr_', gen_random_uuid()))::TEXT;
