function handlePlay(e) {
  const songId = e.target.parentNode.dataset.songId;
  const iframe = document.querySelector('iframe');
  iframe.src = `https://www.youtube.com/embed/${songId}?autoplay=1`;
}

export { handlePlay };
