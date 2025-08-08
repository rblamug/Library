const myLibrary = [
    // {
    //     title: 'Jurassic Park',
    //     author: 'by Michael Crichton',
    //     pages: '464 pages',
    //     id: 123,
    //     status: 'Read'
    // },
    // {
    //     title: 'The Lord of the Rings',
    //     author: ' by J.R.R. Tolkien',
    //     pages: '1077 pages',
    //     id: 345,
    //     status: 'Not Read'
    // } This was just for testing purposes
];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = `by ${author}`;
    this.pages = `${pages} pages`;
    this.status = status;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleStatus = function () {
    this.status = (this.status === 'Read') ? 'Not Read' : 'Read';
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// display library
function displayBooks() {
    const library = document.getElementById('my-library');
    library.innerHTML = '';
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        library.appendChild(bookCard);
        for (const key in book) {
            if (key !== 'id' && key !== 'toggleStatus') {
                const listItem = document.createElement('li');
                listItem.textContent = book[key];
                bookCard.appendChild(listItem);
            }
        }
        // create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute('data-id', book.id);
        removeBtn.classList.add('removeBtn');
        bookCard.appendChild(removeBtn);

        // create status button
        const statusBtn = document.createElement('button');
        statusBtn.textContent = 'Status';
        statusBtn.setAttribute('data-id', book.id);
        statusBtn.classList.add('statusBtn');
        bookCard.appendChild(statusBtn);

        // status button find book id for toggle function
        document.querySelectorAll('.statusBtn').forEach(button => {
            button.addEventListener('click', function () {
                const bookId = this.getAttribute("data-id");
                const index = myLibrary.findIndex(book => book.id === bookId);
                myLibrary[index].toggleStatus();
                displayBooks();
            });
        });

        // remove button find book id for remove function
        document.querySelectorAll('.removeBtn').forEach(button => {
            button.addEventListener('click', function () {
                const bookId = this.getAttribute("data-id");
                console.log(bookId);
                removeBook(bookId);
             });
        });
    });
}

displayBooks();

// remove button function pt.2
function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    console.log(index);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
    displayBooks();
}


//dialog form function
const showDialog = document.getElementById('show-dialog');
const addBookForm = document.getElementById('add-book-form');
const addButton = document.getElementById('addButton');
const bookTitle = addBookForm.querySelector('#book-title');
const bookAuthor = addBookForm.querySelector('#book-author');
const bookPages = addBookForm.querySelector('#book-pages');

showDialog.addEventListener("click", () => {
    addBookForm.showModal();
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
});

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    addBookForm.close();

    const bookStatus = addBookForm.querySelector('input[name="status"]:checked');
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.value);

    addBookToLibrary(newBook);
    displayBooks();
});
