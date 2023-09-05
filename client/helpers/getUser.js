async function getUser() {
  const res = await fetch('http://localhost:3000/api/sessions');
  const { data: user } = await res.json();
  return user;
}

export default getUser;
