async function parseYouTubeURL(songURL) {
  const url = new URL(songURL);
  const id = url.searchParams.get('v');

  return fetch('/api/playlist/youtube-api/' + id)
    .then((res) => res.json())
    .then((data) => {
      const name = data.title.replace(/\[[^\]]*]/g, '').trim();
      console.log('youtube data:', data);
      console.log('youtube name:', name);
      return { id, name };
    });
}

export { parseYouTubeURL };
