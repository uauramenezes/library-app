let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary() {
    this.title = document.getElementById('title').value
    this.author = document.getElementById('author').value
    this.pages = document.getElementById('pages').value
}

let addBook = document.getElementById('addBook')
addBook.addEventListener('click', function () {
    displayForm(1)
})

let submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function() {
    if (title.value == '' || author.value == '' || pages.value == '') {
        return false
    } else {
        pushInput()
        displayForm(2)
        showBook()
        resetForm()
    }
})

let cancelButton = document.getElementById('cancel');
cancelButton.addEventListener('click', function() {
    displayForm(2)
    resetForm()
})

function pushInput() {
    let book = new addBookToLibrary()
    myLibrary.push(book)
}

function displayForm(x) {
    if (x === 1) {
        document.getElementById('form').style.display = 'block'
    } else {
        document.getElementById('form').style.display = 'none'
    }
}

function resetForm() {
    let frm = document.getElementById('form');
    frm.reset()
}

let render = function (template, book) {
    book.innerHTML = template
}

function showBook() {
    makeDiv()
    makeTemplate()
}

function makeDiv() {
    let library = document.getElementById('library')
    for (i = 0; i < myLibrary.length; i++) {
        book = document.createElement('div');
        book.className = 'book';
        library.appendChild(book);       
    }
};

function makeTemplate() {
    for (i = 0; i < myLibrary.length; i++) {
        let template = `<h3>${myLibrary[i].title} by ${myLibrary[i].author} has ${myLibrary[i].pages} pages.</h3>`
        render(template, book)
    }
}