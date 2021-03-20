import axios from 'axios';
import Book from './BookInterface';

function updateBookList(action:string, book:Book, user:string) {
  if (!user) return;

  let btn = document.getElementById(book.key) as HTMLInputElement;
  action = (btn && btn.textContent) ? btn.textContent : action;

  let url = `${process.env.REACT_APP_API}/library/${action.toLowerCase()}`;
  axios.put(url, {
    email: user,
    book: book,
  })
  .then((res) => {
    if (res.status === 200) {
      btn.textContent = btn.textContent === 'Add' ? "Remove" : "Add";
    } 
  })
  .catch(error => {
    console.log(error);
  });
}

export {updateBookList}