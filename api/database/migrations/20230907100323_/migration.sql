/*
  Warnings:

  - You are about to drop the `Playlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_roomId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "messageId" SET DEFAULT (concat('msg_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "songs" JSONB[],
ALTER COLUMN "roomId" SET DEFAULT (concat('room_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userId" SET DEFAULT (concat('usr_', gen_random_uuid()))::TEXT;

-- DropTable
DROP TABLE "Playlist";
