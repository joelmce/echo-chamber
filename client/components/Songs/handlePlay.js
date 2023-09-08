function handlePlay(e) {
  const songId = e.target.dataset.songId;
  const iframe = document.querySelector('iframe');
  iframe.style.display = 'block';
  iframe.src = `https://www.youtube.com/embed/${songId}?autoplay=1`;
}

export { handlePlay };
