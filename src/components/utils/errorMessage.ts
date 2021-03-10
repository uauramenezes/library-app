function errorMessage(msg: string):boolean {
  let errorMsg = document.getElementById('error-msg') as HTMLInputElement;

  if (msg === 'none') {
    errorMsg.style.display = 'none';
  } else {
    errorMsg.style.display = 'inline';
    errorMsg.textContent = msg
  }

  return false;
}

export default errorMessage;