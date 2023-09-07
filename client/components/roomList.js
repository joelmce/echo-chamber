/**
 * Return all the rooms exist on the server
 * @returns {Object}
 */
export default function rooms() {
  const url = `/api/room/`;

  const rooms = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('No response from DB');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error fetching rooms:', error);
      throw error;
    });

  return rooms;
}
