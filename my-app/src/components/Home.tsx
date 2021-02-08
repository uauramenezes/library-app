import axios from 'axios';

import { useState } from "react";

interface Book {
    key: string;
    title: string;
    cover_i: number;
    author_name: Array<string>;
    first_publish_year: number;
}

export default function Home() {
    const [cards, setCards] = useState(Array);

    function fetchData() {
        let input: HTMLInputElement = document.getElementById('input') as HTMLInputElement;
        let inputText = input.value.trim().replace(' ', '+');

        let url = `http://openlibrary.org/search.json?q=${inputText}`;
        
        axios.get(url)
            .then((res) => {
                let data = res.data.docs;
                createCards(data)  
            })
            .catch(err => console.log(err))
    }

    function createCards(data: Array<Book>) {
        let card = [];
        
        for (let i = 0; i < 10; i++) {
            let coverId = data[i].cover_i;

            let src = coverId
                ? `http://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                : "https://covers.openlibrary.org/b/olid/OL5743173M-M.jpg";

            card.push(
                <li className="book" key={data[i].key}>
                    <img className='book-cover' src={src} alt={data[i].title} />
                    <div className="details">
                        <h5 className="book-title">{data[i].title}</h5>
                        <p className="book-author">by {data[i].author_name}</p>
                        <p className="published-year">
                            First published in {data[i].first_publish_year}
                        </p>
                    </div>
                    <button type="submit" className='add-button'>Add</button>
                </li>
            ) 
        }
        setCards(card);
    }

    return(
        <div className="home">
            <div className="search">
                <input type='text' id='input'></input>
                <select id='fields'>
                    <option value='inauthor'>Author</option>
                    <option value='intitle'>Title</option>
                </select>
                <button onClick={fetchData}>Click Me</button>
            </div>
            
            <div className="search-results">
                <ul className="book-list">
                    {cards}
                </ul>
            </div>
        </div>
    )
}