-- CreateTable
CREATE TABLE "Room" (
    "roomId" TEXT NOT NULL DEFAULT (concat('room_', gen_random_uuid()))::TEXT,
    "roomName" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "playlistId" TEXT NOT NULL DEFAULT (concat('pl_', gen_random_uuid()))::TEXT,
    "playlistName" TEXT NOT NULL,
    "songs" JSONB[],
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("playlistId")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL DEFAULT (concat('usr_', gen_random_uuid()))::TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR(80) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "roomId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Message" (
    "messageId" TEXT NOT NULL DEFAULT (concat('msg_', gen_random_uuid()))::TEXT,
    "messageContent" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_roomId_key" ON "Playlist"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
