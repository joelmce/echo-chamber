/* Get all the songs in room by room id */
export async function getSongs(roomId) {
  return fetch(`/api/playlist/${roomId}`).then((res) => res.json());
}
