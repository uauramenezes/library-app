import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import {updateBookList} from './utils/bookList'
import blackCover from '../static/images/black-cover.jpg';
import {changeCursor, changeDivPosition, showMessage} from './utils/utils'
import Book from './utils/BookInterface';

import axios from 'axios';

export default function Home() {
  const [userBookList, setUserBookList] = useState<Book[]>(Array);
  const [bookList, setBookList] = useState<Book[]>(Array);
  const [bookData, setBookData] = useState<Book[]>(Array);
  const [showList, setShowList] = useState(false);
  const [cookie] = useCookies(["user"]);
  const [page, setPage] = useState(0);

  function validateInput() {
    const input = document.getElementById('input') as HTMLInputElement;
    const value = document.getElementById('fields') as HTMLInputElement;

    const inputText = input.value.trim().replace(' ', '+');
    const option = value.value;

    if (inputText === "") {
        input.style.border = "2px solid red";
    } else {
        const url = `${process.env.REACT_APP_SEARCH_API}${option}=${inputText}`;
        getBookData(url);
    }
  }

  function getBookData(url: string) {
    changeCursor('wait');
    changeDivPosition();

    if (cookie.user) {
      axios.get(`${process.env.REACT_APP_API}/library/${cookie.user}`)
        .then(res => {
          let data: Array<Book> = res.data.bookList;
          setUserBookList(data);
        })
        .catch(err => {
          console.log(err);
        });  
    }

    axios.get(url)
      .then(res => {
        let data: Array<Book> = res.data.docs
        setBookData(data);
        setShowList(true);
        showMessage('none');
      })
      .catch(err => {
        console.log(err);
        showMessage('OOPS! An error occurred!');
      });    
  }

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop < document.body.scrollHeight
      || showList || (bookData.length === 0 || bookData.length === bookList.length)) return;

      changeCursor('wait');
      setPage(page + 1);
      setShowList(true);
    }
      
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [bookData, bookList, page, showList]);

  useEffect(() => {
    if ((bookData.length === 0 || bookData.length === bookList.length)
    || !showList) return;

    setTimeout(() => {
      setBookList(bookData.slice(0, (page + 1) * 12));
      changeCursor('unset');
    }, 500);

    setShowList(false);
  }, [bookData, bookList, page, showList]);

  function createBookCard({key, title, author_name, cover_i}: Book) {
    let book: Book = {key: key, title: title, author_name: author_name, cover_i: cover_i};

    let action = "Add";

    const coverId = cover_i;

    const src = coverId
      ? `${process.env.REACT_APP_COVER_API}/${coverId}-M.jpg`
      : blackCover;

    const authorName = author_name === undefined
      ? 'Unknown Author'
      : author_name[0];

    if (cookie.user) {
      userBookList.forEach(book => {
        if (book.key === key) {
          action = 'Remove';
        }
      })
    }

    return(
      <li className="book" key={key}>
        <img className='book-cover' src={src} alt={title} />
        <div className="details">
          <h6 className="book-title">{title}</h6>
          <p className="book-author">by {authorName}</p>
        </div>
        <button
        type="submit"
        className='add-button'
        id={key}
        onClick={() => updateBookList(action, book, cookie.user)}>
          {action}
        </button>
      </li>
    )
  }

  return(
    <div className="home">
      <div className="search-before" id='search'>
        <input type='text' className='input' id='input' placeholder='Search'></input>
        <select className='fields' id='fields'>
          <option value='q'>All</option>
          <option value='title'>Title</option>
          <option value='author'>Author</option>
        </select>
        <Button
        variant="outline-info"
        className='ml-sm-2 button search-button'
        onClick={() => validateInput()}>
          Search
        </Button>
      </div>
      
      <div className="search-results" id='search-result'>
        <ul className="book-list">
          {bookList.map(book => createBookCard(book))}
        </ul>
        <p id="msg"></p>
      </div>
    </div>
  );
}
