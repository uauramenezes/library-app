import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import {getBookList, updateBookList} from './utils/bookList'
import blackCover from '../static/images/black-cover.jpg';
import {changeCursor} from './utils/utils';
import Book from './utils/BookInterface';

export default function Home() {
  const [cookie] = useCookies(["user"]);
  const [bookList, setBookList] = useState<Book[]>(Array);
  const [bookData, setBookData] = useState<Book[]>(Array);
  const [showList, setShowList] = useState(false);
  const [page, setPage] = useState(0);

  const userBookList:Book[] = [];

  if (cookie.user) {
    let url = `http://localhost:5555/library/${cookie.user}`
    getBookList(url)
        .then(data => {
            userBookList.push(data)
        })
  } else {
    console.log(cookie.user)
  }

  function getBookData() {
    const input = document.getElementById('input') as HTMLInputElement;
    const value = document.getElementById('fields') as HTMLInputElement;

    const inputText = input.value.trim().replace(' ', '+');
    const option = value.value;

    if (inputText === "") {
      input.style.border = "2px solid red";
    } else {
      getBookList(`http://openlibrary.org/search.json?${option}=${inputText}`)
        .then(data => {
            setBookData(data);
            setShowList(true);
        })
    }
  }

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop < document.body.scrollHeight
      || showList || bookData.length === bookList.length) return;

      changeCursor('wait');
      setPage(page + 1);
      setShowList(true);
    }
      
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [bookData, bookList, page, showList]);

  useEffect(() => {
    if (!showList || bookData.length === bookList.length) return;

    setTimeout(() => {
      setBookList(bookData.slice(0, (page + 1) * 12));
      changeCursor('unset');
    }, 500);

    setShowList(false);
  }, [bookData, bookList, page, showList]);

  function createBookCard(book: Book) {
    const coverId = book.cover_i;

    let action = 'Add';

    const src = coverId
      ? `http://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : blackCover;

    const authorName = book.author_name === undefined
      ? 'Unknown Author'
      : book.author_name[0];

    userBookList.forEach(userBook => {
      if (userBook.key === book.key) {
        action = 'Remove';
      }
    })

    return(
      <li className="book" key={book.key}>
        <img className='book-cover' src={src} alt={book.title} />
        <div className="details">
          <h6 className="book-title">{book.title}</h6>
          <p className="book-author">by {authorName}</p>
        </div>
        <button
        type="submit"
        className='add-button'
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
        onClick={() => getBookData()}>
          Search
        </Button>
      </div>
      
      <div className="search-results" id='search-result'>
        <ul className="book-list">
          {bookList.map(book => createBookCard(book))}
        </ul>
      </div>
    </div>
  );
}
