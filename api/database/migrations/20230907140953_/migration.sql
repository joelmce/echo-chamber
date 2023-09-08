-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "messageId" SET DEFAULT (concat('msg_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "roomId" SET DEFAULT (concat('room_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userId" SET DEFAULT (concat('usr_', gen_random_uuid()))::TEXT;
