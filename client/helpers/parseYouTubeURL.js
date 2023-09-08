async function parseYouTubeURL(songUrl) {
  const url = new URL(songUrl);
  const urlId = url.searchParams.get('v');

  return fetch(`/api/songs/youtube-api/${urlId}`)
    .then((res) => res.json())
    .then((data) => {
      const songName = data.title.replace(/\[[^\]]*]/g, '').trim();
      return { urlId, songName };
    });
}

export { parseYouTubeURL };
