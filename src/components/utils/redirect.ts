function redirect() {
  setTimeout(() => {
    window.location.replace(`${process.env.PUBLIC_URL}/`);
  }, 100);
}

export default redirect;