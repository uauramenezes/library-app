function changeCursor(style: string) {
  document.body.style.cursor = style;
}

function changeDivPosition() {
  let div = document.getElementById('search') as HTMLInputElement;
  if (div.className === 'search-before') {
    div.className = 'search-after';
  }
}

function redirect() {
  setTimeout(() => {
    window.location.replace(`${process.env.PUBLIC_URL}/`);
  }, 100);
}

function showMessage(msg: string):boolean {
  let errorMsg = document.getElementById('error-msg') as HTMLInputElement;

  if (msg === 'none') {
    errorMsg.style.display = 'none';
    return true;
  } else {
    errorMsg.style.display = 'inline';
    errorMsg.textContent = msg;
    return false;
  }
}

export {changeCursor, changeDivPosition, redirect, showMessage }