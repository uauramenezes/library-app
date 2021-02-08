import axios from 'axios';

export default function Home() {
    function fetchData() {
        let input: HTMLInputElement = document.getElementById('input') as HTMLInputElement;
        let inputText = input.value.trim().replace(' ', '+');
        
        axios.get(`http://openlibrary.org/search.json?q=${inputText}`)
          .then((res) => {
            let vol = res.data.docs;
            vol.forEach((el: object) => {
                console.log(el);
            });
          })
          .catch(err => console.log(err))
    }

    return(
        <div className="home">
            <input type='text' id='input'></input> 
            <button onClick={fetchData}>Click Me</button>
            <select id='fields'>
                <option value='inauthor'>Author</option>
                <option value='intitle'>Title</option>
            </select>
            <div id='result'></div>
        </div>
    )
}