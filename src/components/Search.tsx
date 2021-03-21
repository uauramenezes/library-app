import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import {changeCursor, changeDivPosition, showMessage} from './utils/utils';
import blackCover from '../static/images/black-cover.jpg';
import Book from './utils/BookInterface';
import {redirect} from './utils/utils';

import axios from 'axios';

export default function Search(props:any) {
  const [userBookList, setUserBookList] = useState<Book[]>(Array);
  const [bookList, setBookList] = useState<Book[]>(Array);
  const [bookData, setBookData] = useState<Book[]>(Array);
  const [showList, setShowList] = useState(false);
  const [cookie] = useCookies(["user"]);
  const [page, setPage] = useState(0);
  const [id, setId] = useState('search');

  let path = props.location.pathname;

  useEffect(() => {
    if(bookList.length > 0) return;

    if (path === '/my-library') {
      if (!cookie.user) redirect();
  
      setId('none')
  
      let url = `${process.env.REACT_APP_API}/library/${cookie.user}`;
      axios.get(url)
        .then(res => {
          setUserBookList(res.data.bookList);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [bookList, cookie.user, path])

  function validateInput() {
    const input = document.getElementById('input') as HTMLInputElement;
    const value = document.getElementById('fields') as HTMLInputElement;

    const inputText = input.value.trim().replaceAll(' ', '+');
    const option = value.value;

    if (inputText === "") {
      input.style.border = "2px solid red";
    } else {
      const url = `${process.env.REACT_APP_SEARCH}${option}=${inputText}`;
      getBookData(url);
    }
  }

  function getBookData(url: string) {
    changeCursor('wait');
    changeDivPosition();

    if (cookie.user) {
      fetchData(`${process.env.REACT_APP_API}/library/${cookie.user}`, 'BL');
    }

    fetchData(url, 'BD')
  }

  function fetchData(url:string, ars:string) {
    axios.get(url)
    .then(res => {
      if (res.data.numFound === 0) {
      changeCursor('unset');
      return showMessage('No results found.')
      }

      if (ars === 'BD') {
        setBookData(res.data.docs);
      } else {
        setUserBookList(res.data.bookList);
        setBookData(res.data.bookList);
      }

      setShowList(true);
      showMessage('none')
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  function createBookCard({key, title, author_name, cover_i}: Book) {
    let book: Book = {key: key, title: title, author_name: author_name, cover_i: cover_i};

    let action = 'Add';

    const coverId = cover_i;

    const src = coverId
      ? `${process.env.REACT_APP_COVER}/${coverId}-M.jpg`
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
      <li className="book" key={key} id={`book-${key}`}>
        <img className='book-cover' src={src} alt={title} />
        <div className="details">
          <h6 className="book-title">{title}</h6>
          <p className="book-author">by {authorName}</p>
        </div>
        <button
        type="submit"
        className='add-button'
        id={`btn-${key}`}
        onClick={() => {
          updateBookList(action, book, cookie.user);
        }}>
          {action}
        </button>
      </li>
    )
  }

  function updateBookList(action:string, book:Book, user:string) {
    if (!user) return;

    let btn = document.getElementById(`btn-${book.key}`) as HTMLInputElement;
    action = (btn && btn.textContent) ? btn.textContent : action;

    let url = `${process.env.REACT_APP_API}/library/${action.toLowerCase()}`;
    axios.put(url, {
      email: user,
      book: book,
    })
    .then((res) => {
      if (res.status === 200) {
        btn.textContent = btn.textContent === 'Add' ? "Remove" : "Add";
        removeBookCard(book.key)
      } 
    })
    .catch(error => {
      console.log(error);
    });
  }

  function removeBookCard(id: string) {
    if (path === '/') return;
    let bookCard = document.getElementById(`book-${id}`) as HTMLInputElement;
    setTimeout(() => {
      bookCard.remove();
    }, 100)
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

  return(
    <div className="home">
      <div className="search-before" id={id}>
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

      <div id="msg"></div>
      
      <div className="search-results" id='search-result'>
        <ul className="book-list">
          {bookList.map(book => createBookCard(book))}
        </ul>
      </div>
    </div>
  );
}
