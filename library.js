const myLibrary = [
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
        pages: '464 pages',
        id: '123'
    },
    {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        pages: '1077 pages',
        id: '345'
    }
];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = `${pages} pages`;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// display library
const library = document.getElementById('my-library');

myLibrary.forEach(book => {
    const bookCard = document.createElement('div');
    library.appendChild(bookCard);
    for (const key in book) {
        const listItem = document.createElement('li');
        listItem.textContent = book[key];
        bookCard.appendChild(listItem);
    }
});