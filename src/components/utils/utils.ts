function changeCursor(style: string) {
  document.body.style.cursor = style;
}

function changeDivPosition() {
  let div = document.getElementById('search') as HTMLInputElement;

  if (div.id === 'search') {
    div.className = 'search-after';
  }
}

function redirect() {
  setTimeout(() => {
    window.location.replace(`${process.env.PUBLIC_URL}/`);
  }, 100);
}

function showMessage(msg: string):boolean {
  let msgTag = document.getElementById('msg') as HTMLInputElement;

  if (msg === 'none') {
    msgTag.style.display = 'none';
    return true;
  } else {
    msgTag.style.display = 'inline';
    msgTag.textContent = msg;
    return false;
  }
}

export {changeCursor, changeDivPosition, redirect, showMessage }