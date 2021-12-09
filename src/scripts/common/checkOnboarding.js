// Check if the user has been onboarded
if (window?.localStorage) {
  const isOnboarded = window?.localStorage?.getItem('agora_is_onboarded');
  if (!isOnboarded) window.location.replace('/welcome');
}
