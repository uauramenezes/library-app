function redirect() {
  setTimeout(() => {
    window.location.replace(process.env.PUBLIC_URL);
  }, 500);
}

export default redirect;