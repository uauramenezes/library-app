import axios from 'axios';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

import blackCover from '../static/images/black-cover.jpg';

interface Book {
    key: string;
    title: string;
    cover_i: number;
    author_name: Array<string>;
    first_publish_year: number;
}

export default function Home() {
    const [bookList, setBookList] = useState<Book[]>(Array);
    const [bookData, setBookData] = useState<Book[]>(Array);
    const [showList, setShowList] = useState(false);
    const [page, setPage] = useState(0);

    function validateInput() {
        const input = document.getElementById('input') as HTMLInputElement;
        const value = document.getElementById('fields') as HTMLInputElement;

        const inputText = input.value.trim().replace(' ', '+');
        const option = value.value;

        if (inputText === "") {
            input.style.border = "2px solid red";
        } else {
            const url = `http://openlibrary.org/search.json?${option}=${inputText}`;
            fetchData(url);
        }
    }

    function fetchData(url: string) {
        changeCursor('wait');
        changeDivPosition();
        setPage(0);

        axios.get(url)
            .then((res) => {
                let data: Array<Book> = res.data.docs;
                setBookData(data);
                setShowList(true);
            })
            .catch(err => {
                console.log(err);
                showErrorMessage();
            });
    }

    function changeCursor(style: string) {
        document.body.style.cursor = style;
    }

    function changeDivPosition() {
        let div = document.getElementById('search') as HTMLInputElement;
        if (div.className === 'search-before') {
            div.className = 'search-after';
        }
    }

    function showErrorMessage() {
        let div = document.getElementById('search-result') as HTMLInputElement;
        div.innerHTML = `
        <h3 id='error-title'>
            OOPS! An error occurred!
        </h3>`;
        changeCursor('unset');
    }

    useEffect(() => {
        function handleScroll() {
            if (window.innerHeight + document.documentElement.scrollTop < document.body.scrollHeight
            || showList) return;

            changeCursor('wait');
            setPage(page + 1);
            setShowList(true);
        }
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, showList]);

    useEffect(() => {
        if (!showList || bookData.length === bookList.length) return;

        setTimeout(() => {
            setBookList(bookData.slice(0, (page + 1) * 12));
            changeCursor('unset');
        }, 500);

        setShowList(false);
    }, [bookData, bookList, page, showList]);

    function createBookCard({key, title, cover_i, author_name, first_publish_year}: Book) {
        const coverId = cover_i;

        const src = coverId
            ? `http://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : blackCover;

        const authorName = author_name === undefined
            ? 'Unknown Author'
            : author_name[0];

        return(
            <li className="book" key={key}>
                <img className='book-cover' src={src} alt={title} />
                <div className="details">
                    <h6 className="book-title">{title}</h6>
                    <p className="book-author">by {authorName}</p>
                    <p className="published-year">
                        First published in {first_publish_year}
                    </p>
                </div>
                <button type="submit" className='add-button'>Add</button>
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
                <Button variant="outline-info" className='ml-sm-2 button search-button' onClick={
                    () => {
                        validateInput();
                    }
                }>Search</Button>
            </div>
            
            <div className="search-results" id='search-result'>
                <ul className="book-list">
                    {bookList.map(book => createBookCard(book))}
                </ul>
            </div>
        </div>
    );
}
