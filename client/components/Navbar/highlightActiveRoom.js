function highlightActiveRoom(e) {
  const activeRoom = document.querySelector('.active-room');
  activeRoom?.classList.remove('active-room');
  e.target.classList.add('active-room');
}

export { highlightActiveRoom };
