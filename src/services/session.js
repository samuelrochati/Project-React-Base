export const isAuthenticated = () => {
  const p_token = localStorage.getItem("VP_TOKEN");

  if (p_token != null) {
    return true;
  } else {
    return false;
  }
};
