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

//Listen in for click on the save button and call function
//to add the new book onto the user's library
saveBtn.addEventListener('click', function(){
    let newTitle = document.getElementById('title').value;
    let newAuthor = document.getElementById('author').value;
    let newPages = document.getElementById('pages').value;
    let newBook = new Book(newTitle, newAuthor, newPages)

    //Check if string is just empty spaces before adding
    if(newTitle.trim() != "" && newAuthor.trim() != "" && newPages.trim() != ""){
        //Check if a book with the same title and author already exists before adding
        if(myLibrary.some(x => x.title === newTitle.trim() && x.author === newAuthor.trim())){
            alert("Book already exists, no need to add it again.");
        }
        else{
            addBookToLibrary(newBook);
        }
    }
    else{
        alert("Please enter a valid input...")
    }
});
