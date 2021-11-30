// Home scripts

(async () => {
  const response = await api.post('/api/users');
  console.log(response);
})();
