function handleLike(e) {
  e.target.classList.toggle('liked');
  // TODO: update song likes in database
}

export { handleLike };
