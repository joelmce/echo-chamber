export default function rooms() {
  const url = `http://localhost:3000/api/room/`;

  const rooms = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('No response from DB');
      }
      console.log(response);
      return response.json();
    })
    .catch((error) => {
      console.error('Error fetching rooms:', error);
      throw error;
    });

  return rooms;
}
