async function parseYouTubeURL(songUrl) {
  const url = new URL(songUrl);
  const songId = url.searchParams.get('v');

  return fetch(`/api/playlist/youtube-api/${songId}`)
    .then((res) => res.json())
    .then((data) => {
      const songName = data.title.replace(/\[[^\]]*]/g, '').trim();
      return { songId, songName };
    });
}

export { parseYouTubeURL };
