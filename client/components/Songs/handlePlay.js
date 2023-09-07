function handlePlay(id) {
  const iframe = document.querySelector('iframe');
  iframe.style.display = 'block';
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
}

export { handlePlay };
