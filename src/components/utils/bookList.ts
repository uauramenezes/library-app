import axios from 'axios';
import Book from './BookInterface';
import {showMessage} from './utils';

function createBookList(user:string) {
  return axios.post(`${process.env.REACT_APP_API}library/create`, {
    email: user
  })
  .then((res) => {
    if (res.status === 200) {
      return showMessage('none');
    } 
  })
  .catch(error => {
    if (error.response.status === 500) {
      console.log(error)
      return showMessage('OOPS! An error occurred!');
    } else {
      return showMessage(error.response.data.error)
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
        if (path === 'bookList') {
          data = res.data.bookList
        } else {
          data = res.data.docs
        }
      } 
    })
    .catch(error => {
      if (error.response.status === 500) {
        console.log(error)
        return showMessage('OOPS! An error occurred!');
      } else {
        return showMessage(error.response.data.error)
      }
    });

  return data;
}

function updateBookList(action:string, book:Book, user:string) {
  let url = `${process.env.REACT_APP_API}/${action}`;
  return axios.put(url, {
    email: user,
    book: book,
  })
  .then((res) => {
    if (res.status === 200) {
      return showMessage('none');
    } 
  })
  .catch(error => {
    if (error.response.status === 500) {
      console.log(error)
      return showMessage('OOPS! An error occurred!');
    } else {
      return showMessage(error.response.data.error)
    }
  });
}

export {createBookList, deleteBookList, getBookList, updateBookList}