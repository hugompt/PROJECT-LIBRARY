//Global variables
let myLibrary = [];
let saveBtn = document.querySelector('#add-book');
let modal = document.getElementById('modal');
let addBookBtn = document.querySelector('.addBook');
let span = document.getElementsByClassName('close')[0];
let deleteRow = document.querySelectorAll('.delete');
let confirmDelete = document.getElementById('dialog');
var modalDelete = document.querySelector(".modalDelete");
let newCheckBox;
let newDelete;

//Object Constructor for a Book
function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.printBook = function(){
        console.log(this);
    }
}


//Function to add a new book into the user's library
//and respective table to display the books
function addBookToLibrary(book){
    myLibrary.push(book);
}


//Listen in for click on the save button and call function
//to add the new book onto the user's library
saveBtn.addEventListener('click', function(){
    let newTitle = document.getElementById('title').value;
    let newAuthor = document.getElementById('name').value;
    let newPages = document.getElementById('number').value;
    let newRead = document.getElementById('checkbox').checked;
    let newBook = new Book(newTitle, newAuthor, newPages, newRead);

    //Check if string is just empty spaces before adding
    if(newTitle.trim() != "" && newAuthor.trim() != "" && newPages.trim() != ""){
        //Check if a book with the same title and author already exists before adding
        if(myLibrary.some(x => x.title === newTitle.trim() && x.author === newAuthor.trim())){
            alert("Book already exists, no need to add it again.");
        }
        else{
            //Add the new book
            addBookToLibrary(newBook);
            localStorage.pushArrayItem("Books", newBook);
            //Reset modal form fields and hide the form
            document.getElementById("modal-content").reset();
            modal.style.display = "none";

            //Show the new added book
            displayBooks();
        }
    }
    else{
        alert("Please enter a valid input...")
    }
});


//Function to display current books stored in the library
function displayBooks(){
    //Loop trought all the array to individually display each book
    if(myLibrary.length != null){
        $("tbody").children().remove()

        let tbodyRef = document.getElementById('booksTable').getElementsByTagName('tbody')[0];
        for(i=0; i <= (myLibrary.length-1); i++){
            let newRow = tbodyRef.insertRow();
            newRow.id = "row_" + i;
            newDelete = document.createElement('div');
            newDelete.classList = 'delete';
            newCheckBox = document.createElement('input');
            newCheckBox.type = 'checkbox';
            newCheckBox.checked = myLibrary[i].read;
            newRow.insertCell().appendChild(document.createTextNode(myLibrary[i].title));
            newRow.insertCell().appendChild(document.createTextNode(myLibrary[i].author));
            newRow.insertCell().appendChild(document.createTextNode(myLibrary[i].pages));
            newRow.insertCell().appendChild(newCheckBox);
            newRow.insertCell().appendChild(newDelete);
            deleteRow = document.querySelectorAll('.delete');
            for (let i = 0; i < deleteRow.length; i++) {
                deleteRow[i].addEventListener('click', function() {
                    modalDelete.style.display = "block";
                });
            }
        }
    }
}

$('table').on('click', 'input[type="button"]', function(e){
    $(this).closest('tr').remove()
 })

//When the page loads, display current books
window.addEventListener("load", function(){
    myLibrary = localStorage.getArray('Books');
    console.log(myLibrary);
    displayBooks()
});

//Show modal form to input new data for new book to be added
addBookBtn.addEventListener('click', function(){
    modal.style.display="block";
})

//Close modal form
span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("modal-content").reset();
}

//When the user clicks anywhere outside of a modal, close it
window.onclick = function(event) {
    if (event.target == modal || event.target == modalDelete) {    
      hideModal();
    }
  }

//Function to hide modals and reset inputs
function hideModal() {
   modalDelete.style.display = "none";
   modal.style.display = "none";
   document.getElementById("modal-content").reset();
}


//Local storage
Storage.prototype.getArray = function(arrayName) {
    var thisArray = [];
    var fetchArrayObject = this.getItem(arrayName);
    if (typeof fetchArrayObject !== 'undefined') {
      if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
    }
    return thisArray;
  }
  
  Storage.prototype.pushArrayItem = function(arrayName,arrayItem) {
    var existingArray = this.getArray(arrayName);
    existingArray.push(arrayItem);
    this.setItem(arrayName,JSON.stringify(existingArray));
  }
  
  Storage.prototype.popArrayItem = function(arrayName) {
    var arrayItem = {};
    var existingArray = this.getArray(arrayName);
    if (existingArray.length > 0) {
      arrayItem = existingArray.pop();
      this.setItem(arrayName,JSON.stringify(existingArray));
    }
    return arrayItem;
  }
  
  Storage.prototype.shiftArrayItem = function(arrayName) {
    var arrayItem = {};
    var existingArray = this.getArray(arrayName);
    if (existingArray.length > 0) {
      arrayItem = existingArray.shift();
      this.setItem(arrayName,JSON.stringify(existingArray));
    }
    return arrayItem;
  }
  
  Storage.prototype.unshiftArrayItem = function(arrayName,arrayItem) {
    var existingArray = this.getArray(arrayName);
    existingArray.unshift(arrayItem);
    this.setItem(arrayName,JSON.stringify(existingArray));
  }
  
  Storage.prototype.deleteArray = function(arrayName) {
    this.removeItem(arrayName);
  }