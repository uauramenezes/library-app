import axios from 'axios';
import Book from './BookInterface';
import {showMessage} from './utils';

function createBookList(user:string) {
  return axios.post('http://localhost:5555/library/create', {
    email: user
  })
  .then((res) => {
    if (res.status === 200) {
      return showMessage('none');
    }
  })
  .catch(error => {
    let status = (error.message as string).slice(-3);

    if (status === '403' || status === '404') {
      let errorMsg = error.response.data.error;
      return showMessage(errorMsg);
    } else {
      console.log(error);
      return showMessage('OOPS! An error occurred!');
    }
  });
}

function deleteBookList(user:string) {
  return axios.delete('', {
    data: {
      email: user
    }
  })
}

async function getBookList(url: string, path: string) {
  let data:Book[] = [];
  
  await axios.get(url)
    .then((res) => {
      if (res.status === 200) {
        if (path === 'MongoDB') {
          data = res.data.bookList
        } else {
          data = res.data.docs
        }
      } else if (res.status === 404) {
        showMessage(res.data.error)
      } else {
        showMessage('OOPS! An error occurred!')
      };
    })
    .catch(err => {
      console.log(err);
      showMessage('OOPS! An error occurred!');
    });

  return data;
}

function updateBookList(action:string, book:Book, user:string) {
  let url = `http://localhost:5555/library/${action}`;
  return axios.put(url, {
    email: user,
    book: book,
  })
  .then((res) => {
    if (res.status === 200) {
      return showMessage('none');
    } else if (res.status === 404) {
      return showMessage(res.data.error);
    } else {
      return showMessage('OOPS! An error occurred!');
    }
  })
  .catch(error => {
    console.log(error);
    return showMessage('OOPS! An error occurred!');
  });
}



export {createBookList, deleteBookList, getBookList, updateBookList}