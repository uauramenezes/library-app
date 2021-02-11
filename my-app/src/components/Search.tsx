import axios from 'axios';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import blackCover from '../images/black-cover.jpg';

interface Book {
    key: string;
    title: string;
    cover_i: number;
    author_name: Array<string>;
    first_publish_year: number;
}

export default function Home() {
    const [bookList, setBookList] = useState(Array);

    function fetchData() {
        let input = document.getElementById('input') as HTMLInputElement;
        let value = document.getElementById('fields') as HTMLInputElement;

        let inputText = input.value.trim().replace(' ', '+');
        let option = value.value;

        let url = `http://openlibrary.org/search.json?${option}=${inputText}`;
        
        axios.get(url)
            .then((res) => {
                let data = res.data.docs;
                createBookList(data); 
            })
            .catch(err => console.log(err));
    }

    function changeClass() {
        let div: HTMLInputElement = document.getElementById('search') as HTMLInputElement;
        if (div.className === 'search-before') {
            div.className = 'search-after';
        }
    }

    function createBookList(data: Array<Book>) {
        let books = [];
        
        for (let i = 0; i < data.length; i++) {
            let coverId = data[i].cover_i;

            let src = coverId
                ? `http://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                : blackCover;

            let authorName = data[i].author_name === undefined
                ? 'Unknown Author'
                : data[i].author_name[0];

            books.push(
                <li className="book" key={data[i].key}>
                    <img className='book-cover' src={src} alt={data[i].title} />
                    <div className="details">
                        <h6 className="book-title">{data[i].title}</h6>
                        <p className="book-author">by {authorName}</p>
                        <p className="published-year">
                            First published in {data[i].first_publish_year}
                        </p>
                    </div>
                    <button type="submit" className='add-button'>Add</button>
                </li>
            )
        }

        setBookList(books);
    }

    return(
        <div className="home">
            <div className="search-before" id='search'>
                <input type='text' id='input' placeholder='Search'></input>
                <select id='fields'>
                    <option value='q'>All</option>
                    <option value='title'>Title</option>
                    <option value='author'>Author</option>
                </select>
                <Button variant="outline-info" className='ml-sm-2 button' id='search-button' onClick={
                    () => {
                        fetchData();
                        changeClass();
                    }
                }>Search</Button>
            </div>
            
            <div className="search-results">
                <ul className="book-list">
                    {bookList}
                </ul>
            </div>
        </div>
    )
}
