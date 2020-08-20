let myLibrary = [];

function Book(name, author, pages) {
    this.name = name;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary() {
    this.name = prompt("What is the name of the book?")
    this.author = prompt("Who is the author of the book?")
    this.pages = prompt('How many pages does it have?')
}

let render = function (template, node) {
    node.innerHTML = template
}

let library = document.getElementById('library')

let nB = document.getElementById('newBook')
nB.addEventListener('click', function () {
    let book = new addBookToLibrary()
    myLibrary.push(book)
    console.log(myLibrary)
})
