const myLibrary = [];
const form = document.getElementById('form');

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary() {
    this.title = document.getElementById('title').value;
    this.author = document.getElementById('author').value;
    this.pages = document.getElementById('pages').value;
    this.read = document.getElementById('read').checked;
    this.id = myLibrary.length;
}

displayForm(1);

window.onload = function () {
    resetForm();
    if (localStorage.getItem('book')) {
        getLocalStorage();
    } else {
        getBooks();
    }
}

function getBooks() {
    let book = []
    book[0] = new Book("King Lear", "William Shakespeare", 145, true, 0);
    book[2] = new Book("I'm a Cat", "Natsume Soseki", 480, true, 1);
    book[3] = new Book("Macbeth", "William Shakespeare", 170, true, 2);
    for (i = 0; i < book.length; i++) {
        myLibrary.push(book[i]);
        showBook();
    }
}

function getLocalStorage() {
    let book = JSON.parse(localStorage.getItem('book'));
    for (let i = 0; i < book.length; i++) {
        myLibrary.push(book[i]);
        showBook();
    }
}

let addBook = document.getElementById('addBook')
addBook.addEventListener('click', function () {
    hideShowForm();
    darker();
})

function hideShowForm() {
    if (form.style.display === 'none') {
        displayForm(2);
    } else {
        displayForm(1);
    }
}

function darker() {
    let body = document.getElementById('body');
    let main = document.getElementById('library');
    if (form.style.display === 'inline') {
        body.style.backgroundColor = 'rgba(90, 217, 240, 0.7)';
        main.style.opacity = '0.7';
    } else {
        body.style.backgroundColor = 'rgb(90, 217, 240)';
        main.style.opacity = '1';
    }
}

let submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function () {
    submit();
})

function submit() {
    if (title.value == '' || author.value == '' || pages.value == '') {
        return false;
    } else {
        pushInput();
        displayForm(1);
        showBook();
        resetForm();
        darker();
    }
}

function pushInput() {
    let book = new addBookToLibrary();
    myLibrary.push(book);
    addBookToStorage();
}

function addBookToStorage() {
    let book = JSON.stringify(myLibrary);
    localStorage.setItem('book', book);
}

function displayForm(x) {
    if (x === 1) {
        form.style.display = 'none';
    } else {
        form.style.display = 'inline';
    }
}

function resetForm() {
    let frm = document.getElementById('form');
    frm.reset();
}

function showBook() {
    createDiv();
    makeTemplate();
    createReadButton();
    createDeleteButton();
}

function createDiv() {
    let library = document.getElementById('library');
    div = document.createElement('div');
    library.appendChild(div);
    div.id = myLibrary.length - 1;
    div.className = 'book';
};

let render = function (template, book) {
    book.innerHTML = template;
}

function makeTemplate() {
    for (i = 0; i < myLibrary.length; i++) {
        let template = `<h3>${myLibrary[i].author}</h3><h2>${myLibrary[i].title}</h2><p>${myLibrary[i].pages} pages</p>`;
        render(template, div);
    }
}

function createReadButton() {
    let readButton = document.createElement('input');
    readButton.type = 'button';;
    readButton.className = 'readButton';
    readButton.value = changeReadButtonValue;(readButton);
    div.appendChild(readButton);
}

function changeReadButtonValue(readButton) {
    onSubmit(readButton);
    readButton.onclick = function () {
        onClick(readButton);
        addBookToStorage();
    }
    return readButton.value;
}

function onSubmit(readButton) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].read) {
            readButton.value = 'Read';
        } else {
            readButton.value = 'Not Read';
        }
    }
    return readButton.value;
}

function onClick(readButton) {
    let index = readButton.parentNode.id
        if (readButton.value === 'Read') {
            readButton.value = 'Not Read';
            myLibrary[index].read = false;
        } else {
            readButton.value = 'Read';
            myLibrary[index].read = true;
        }
    return readButton.value;
}

function createDeleteButton() {
    let delBtn = document.createElement('input');
    delBtn.type = 'button';
    delBtn.className = 'delete';
    delBtn.onclick = function () {
        deleteBook(delBtn.parentNode.id);
        return false;
    }
    div.appendChild(delBtn);
}

function deleteBook(id) {
    removeBook(id);
    changeDivId();
    changeObjectId();
    if (myLibrary.length === 0) {
        localStorage.clear();
    } else {
        addBookToStorage();
    }
}

function removeBook(id) {
    let book = document.getElementById(id);
    book.parentNode.removeChild(book);
    myLibrary.splice(id, 1);
}

function changeDivId() {
    let book = document.querySelectorAll('div.book')
    for (let i = 0; i < book.length; i++) {
        if (book[i].id > i) {
            book[i].id = i;
        }
    }
}

function changeObjectId() {
    for (i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id > i) {
            myLibrary[i].id = i;
        }
    }
}