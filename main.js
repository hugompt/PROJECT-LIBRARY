//Global variables
let myLibrary = [];

let saveBtn = document.querySelector('#save');

//Object Constructor for a Book
function Book (title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;

    this.printBook = function(){
        console.log(this);
    }
}

//Function to add a new book into the user's library
function addBookToLibrary(book){
    book.printBook();
    myLibrary.push(book);
    console.log(myLibrary);
}


saveBtn.addEventListener('click', function(){
    let newTitle = document.getElementById('title').value;
    let newAuthor = document.getElementById('author').value;
    let newPages = document.getElementById('pages').value;
    let newBook = new Book(newTitle, newAuthor, newPages)
    addBookToLibrary(newBook);
});
