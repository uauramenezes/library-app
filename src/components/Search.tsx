import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import {getBookList, updateBookList} from './utils/bookList'
import blackCover from '../static/images/black-cover.jpg';
import {changeCursor, changeDivPosition} from './utils/utils'
import Book from './utils/BookInterface';

export default function Home() {
  const [cookie] = useCookies(["user"]);
  const [bookList, setBookList] = useState<Book[]>(Array);
  const [bookData, setBookData] = useState<Book[]>(Array);
  const [showList, setShowList] = useState(false);
  const [page, setPage] = useState(0);

  let userBookList:Book[];

  window.addEventListener('load', async () => {
    if (cookie.user) {
      let url = `${process.env.REACT_APP_API}/library/${cookie.user}`
      let data = await getBookList(url, 'bookList');
      
      if (data.length > 0) {
        userBookList = data;
      }
    }
  })

  async function getBookData() {
    const input = document.getElementById('input') as HTMLInputElement;
    const value = document.getElementById('fields') as HTMLInputElement;

    const inputText = input.value.trim().replace(' ', '+');
    const option = value.value;

    if (inputText === "") {
      input.style.border = "2px solid red";
    } else {
      changeCursor('wait');
      changeDivPosition();

      let url = `${process.env.REACT_APP_OL_API}?${option}=${inputText}`;

      let data = await getBookList(url, 'bookData');

      console.log(data)
      
      if (data.length > 0) {
        setBookData(data);
        setShowList(true);
        console.log(2)
      }
    }
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

  async function createBookCard({key, title, author_name, cover_i}: Book) {
    let book: Book = {key: key, title: title, author_name: author_name, cover_i: cover_i}
    const coverId = cover_i;
    let action = 'Add';

    const src = coverId
      ? `${process.env.REACT_APP_OL_COVER_API}/${coverId}-M.jpg`
      : blackCover;

    const authorName = author_name === undefined
      ? 'Unknown Author'
      : author_name[0];

      console.log(userBookList)

    userBookList.forEach(userBook => {
      if (userBook.key === key) {
        action = 'Remove';
      }
    })

    changeCursor('unset');

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
        onClick={() => updateBookList(action.toLowerCase(), book, cookie.user)}>
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
        <p id="msg"></p>
      </div>
    </div>
  );
}
