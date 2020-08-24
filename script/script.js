let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary() {
    this.title = document.getElementById('title').value;
    this.author = document.getElementById('author').value;
    this.pages = document.getElementById('pages').value;
    this.readStatus = document.getElementById('readStatus').checked
}

let addBook = document.getElementById('addBook')
addBook.addEventListener('click', function () {
    displayForm(1);
})

let submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function() {
    if (title.value == '' || author.value == '' || pages.value == '') {
        return false
    } else {
        pushInput();
        displayForm(2);
        showBook();
        resetForm();
    }
})

let cancelButton = document.getElementById('cancel');
cancelButton.addEventListener('click', function() {
    displayForm(2);
    resetForm();
})

function pushInput() {
    let book = new addBookToLibrary();
    myLibrary.push(book);
}

function displayForm(x) {
    if (x === 1) {
        document.getElementById('form').style.display = 'block';
    } else {
        document.getElementById('form').style.display = 'none';
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
    let library = document.getElementById('library')
    div = document.createElement('div');
    library.appendChild(div); 
    div.id = myLibrary.length;
    div.className = 'book';
};

let render = function (template, book) {
    book.innerHTML = template;
}

function makeTemplate() {
    for (i = 0; i < myLibrary.length; i++) {
        let template = `<h3>${myLibrary[i].title} by ${myLibrary[i].author} has ${myLibrary[i].pages} pages.</h3>`;
        render(template, div);
    }
}

function createReadButton() {
    let readButton = document.createElement('input');
    readButton.type = 'button';
    readButton.value = readNotRead(readButton)
    div.appendChild(readButton);
}

function readNotRead(readButton) {
    if (readStatus.checked) {
        readButton.value = 'Read';
    } else  {
        readButton.value = 'Not Read';
    }
    readButton.onclick = function() {
        if (readButton.value === 'Read') {
            readButton.value = 'Not Read'
        } else {
            readButton.value = 'Read'
        }
    }
    return readButton.value;
}

function createDeleteButton() {
    let delBtn = document.createElement('input');
    delBtn.type = 'button';
    delBtn.value = 'del';
    delBtn.onclick = function() {
        deleteBook(delBtn.parentNode.id);
        return false;
    }
    div.appendChild(delBtn);
}

function deleteBook(id) {
    let index = id - 1;
    myLibrary.splice(index, 1);
    let book = document.getElementById(id);
    book.parentNode.removeChild(book);
}