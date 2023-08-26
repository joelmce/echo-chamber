-- CreateTable
CREATE TABLE "Song" (
    "songId" TEXT NOT NULL,
    "songLink" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("songId")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "playlistId" SERIAL NOT NULL,
    "playlistName" TEXT NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("playlistId")
);

-- CreateTable
CREATE TABLE "_PlaylistToSong" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistToSong_AB_unique" ON "_PlaylistToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistToSong_B_index" ON "_PlaylistToSong"("B");

-- AddForeignKey
ALTER TABLE "_PlaylistToSong" ADD CONSTRAINT "_PlaylistToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("playlistId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToSong" ADD CONSTRAINT "_PlaylistToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("songId") ON DELETE CASCADE ON UPDATE CASCADE;
