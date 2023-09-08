async function getUser() {
  const res = await fetch('/api/sessions');
  const { data: user } = await res.json();
  return user;
}

export default getUser;
