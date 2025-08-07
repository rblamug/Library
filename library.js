const myLibrary = [
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
        pages: '464 pages',
        id: 123
    },
    {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        pages: '1077 pages',
        id: 345
    }
];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = `${pages} pages`;
    this.status = status;
    this.id = crypto.randomUUID();
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
            if (key !== 'id') {
                const listItem = document.createElement('li');
                listItem.textContent = book[key];
                bookCard.appendChild(listItem);
            }
        }
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute('data-id', book.id);
        removeBtn.classList.add('removeBtn');
        bookCard.appendChild(removeBtn);

        document.querySelectorAll('.removeBtn').forEach(button => {
            button.addEventListener('click', function () {
                const bookId = this.getAttribute("data-id");
                removeBook(bookId);
             });
        });
    });
}

displayBooks();

//remove button function
function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(index, 1);
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
})
