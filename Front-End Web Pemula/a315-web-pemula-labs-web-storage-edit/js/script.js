const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'TODO_APPS';

function generateId() {
    return +new Date();
}

function generateTodoObject(id, inpTitle, inpAuthor, inpYear, isCompleted) {
    return {
        id,
        inpTitle,
        inpAuthor,
        inpYear,
        isCompleted
    };
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function bookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}


/**
 * @returns 
 */
function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}


function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

/**
 {@see books}
 */
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function insertBook() {
    const judul = document.getElementById('title').value;
    const penulis = document.getElementById('author').value;
    const tahun = document.getElementById('year').value;
    const generatedID = generateId();
    const bookObj = generateTodoObject(generatedID, judul, penulis, tahun, false);
    books.push(bookObj);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function addBook(bookObj) {

    const { id, inpTitle, inpAuthor, inpYear, isCompleted } = bookObj;

    const judulBuku = document.createElement('h2');
    judulBuku.innerText = inpTitle;

    const penulisBuku = document.createElement('p');
    penulisBuku.innerText = inpAuthor;

    const tahunBuku = document.createElement('p');
    tahunBuku.innerText = inpYear;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(judulBuku, penulisBuku, tahunBuku);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow')
    container.append(textContainer);
    container.setAttribute('id', `book-${id}`);

    if (isCompleted) {

        const notDoneButt = document.createElement('button');
        notDoneButt.classList.add('undo-button');
        notDoneButt.addEventListener('click', function() {
            notDoneRead(id);
        });

        const delButton = document.createElement('button');
        delButton.classList.add('trash-button');
        delButton.addEventListener('click', function() {
            deleteBook(id);
        });

        container.append(notDoneButt, delButton);
    } else {

        const doneButton = document.createElement('button');
        doneButton.classList.add('check-button');
        doneButton.addEventListener('click', function() {
            doneRead(id);
        });
        const delButton = document.createElement('button');
        delButton.classList.add('trash-button');
        delButton.addEventListener('click', function() {
            deleteBook(id);
        });
        container.append(doneButton, delButton);
    }

    return container;
}



function doneRead(bookId) {
    const bookItem = findBook(bookId);

    if (bookItem == null) return;

    bookItem.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function deleteBook(bookId) {
    const bookItem = bookIndex(bookId);

    if (bookItem === -1) return;

    books.splice(bookItem, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function notDoneRead(bookId) {

    const bookItem = findBook(bookId);
    if (bookItem == null) return;

    bookItem.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

document.addEventListener('DOMContentLoaded', function() {

    const submitForm = document.getElementById('form');

    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        insertBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener(SAVED_EVENT, () => {
    console.log('Data berhasil di simpan.');
});

document.addEventListener(RENDER_EVENT, function() {
    const uncBookList = document.getElementById('books');
    const compBookList = document.getElementById('completed-books');

    uncBookList.innerHTML = '';
    compBookList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = addBook(bookItem);
        if (bookItem.isCompleted) {
            compBookList.append(bookElement);
        } else {
            uncBookList.append(bookElement);
        }
    }
});