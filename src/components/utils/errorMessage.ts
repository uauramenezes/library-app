function errorMessage(error: string) {
  let errorMsg = document.getElementById('error-msg') as HTMLInputElement;
  errorMsg.style.display = 'inline';

  if (error === 'invalid') {
    errorMsg.textContent = "Invalid email format";
  } else if (error === "match") {
    errorMsg.textContent = "Passwords did not match";
  } else if (error === 'length') {
    errorMsg.textContent = "Password must contain at least 8 characters";
  } else if (error === 'used') {
    errorMsg.textContent = "Email already in use";
  } else if (error === 'not found') {
    errorMsg.textContent = "Email not found";
  } else if (error === 'incorrect') {
    errorMsg.textContent = "Incorrect Password";
  } else if (error === 'server') {
    errorMsg.textContent = "Ops! Something went wrong!";
  } else {
    errorMsg.style.display = 'none';
  }
}

export default errorMessage;