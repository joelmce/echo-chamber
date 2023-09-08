function handlePlay(e) {
  const urlId = e.target.parentNode.dataset.urlId;
  const iframe = document.querySelector('iframe');
  iframe.src = `https://www.youtube.com/embed/${urlId}?autoplay=1`;
}

export { handlePlay };
