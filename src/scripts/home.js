// Home scripts

(async () => {
  const user = await api.post('/api/users', { username: '', password: '' });
  console.log(user);
})();
