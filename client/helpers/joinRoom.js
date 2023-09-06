const socket = io('http://localhost:3000');

async function userId() {
  const { success, data } = await fetch('/api/sessions').then((res) =>
    res.json()
  );

  return data.userId;
}

export default async function joinRoom(roomId) {
  // render room

  socket.emit('join-room', roomId);

  // send connection status
  // const url = `http://localhost:3000/api/users/connect`;
  // const userUuid = await userId();

  // const connectUser = await fetch(url, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   },
  //   body: JSON.stringify({
  //     roomId: roomId,
  //     userId: userUuid,
  //   }),
  // });

  // console.log(connectUser);
}
