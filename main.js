//Global variables
let myLibrary = [];
let saveBtn = document.querySelector('#add-book');
let deleteBtn = document.querySelector('#rowDelete');
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let modal = document.getElementById('modal');
let addBookBtn = document.querySelector('.addBook');
let span = document.getElementsByClassName('close')[0];
let deleteRow = document.querySelectorAll('.delete');
let checkChange = document.querySelectorAll('.checkboxClass');
let confirmDelete = document.getElementById('dialog');
let modalDelete = document.querySelector(".modalDelete");
let newCheckBox;
let newDelete;
let auxDelete;

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


//When the page loads, display current books
window.addEventListener("load", function(){
    displayBooks()
});


//Function to display current books stored in the library
function displayBooks(){
    myLibrary = localStorage.getArray('Books');
    //Loop trought all the array to individually display each book
    if(myLibrary.length != null){
        $("tbody").children().remove()

        let tbodyRef = document.getElementById('booksTable').getElementsByTagName('tbody')[0];
        for(i=0; i <= (myLibrary.length - 1); i++){
            let newRow = tbodyRef.insertRow();
            newRow.id = "row_" + i;
            newDelete = document.createElement('div');
            newDelete.classList = 'delete';
            newCheckBox = document.createElement('input');
            newCheckBox.type = 'checkbox';
            newCheckBox.classList = 'checkboxClass';
            newCheckBox.id = 'chk_' + i;
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
                    auxDelete = i
                });
            }

            checkChange = document.querySelectorAll('.checkboxClass');
            for (let i = 0; i < checkChange.length; i++) {
                checkChange[i].addEventListener('change', function() {
                    myLibrary[i].read = checkChange[i].checked;

// NEEDS TO BE CHECKED; NOT WORKING!
                    localStorage.deleteArray('Books');
                    localStorage.pushArrayItem('Books', myLibrary[i]);
                });
            }
        }
    }
}


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

//Function to add a new book into the user's library
//and respective table to display the books
function addBookToLibrary(book){
    myLibrary.push(book);
    localStorage.pushArrayItem("Books", book);
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

            //Reset modal form fields and hide the form
            document.getElementById("modal-content").reset();
            document.getElementById('validationTitle').style.visibility =  "hidden";
            document.getElementById('validationAuthor').style.visibility =  "hidden";
            document.getElementById('validationPages').style.visibility =  "hidden";
            modal.style.display = "none";

            //Show the new added book
            displayBooks();
        }
    }
    else{
        if(newTitle.trim() == ""){
            document.getElementById('validationTitle').style.visibility =  "visible";
        }else{
            document.getElementById('validationTitle').style.visibility =  "hidden";
        }
        if(newAuthor.trim() == ""){
            document.getElementById('validationAuthor').style.visibility =  "visible";
        }else{
            document.getElementById('validationAuthor').style.visibility =  "hidden";
        }
        if(newPages.trim() == ""){
            document.getElementById('validationPages').style.visibility =  "visible";
        }else{
            document.getElementById('validationPages').style.visibility =  "hidden";
        }
    }
});


//Keeps placeholder text small if input fields are invalid
document.getElementById('validationTitle').addEventListener('visibilitychange', event => {
    document.getElementById('lblTitle').style.transform = "scale(0.7) translateY(-40px)";
});
document.getElementById('validationAuthor').addEventListener('visibilitychange', event => { 
    document.getElementById('lblAuthor').style.transform = "scale(0.7) translateY(-40px)";

});
document.getElementById('validationPages').addEventListener('visibilitychange', event => { 
    document.getElementById('lblPages').style.transform = "scale(0.7) translateY(-40px)";
});

function validate() {
    var element = document.getElementById('name');
    element.value = element.value.replace(/[^a-zA-Z@]+/, '');
  };



//Delete row event
deleteBtn.addEventListener('click', function(){
    //Remove book from the array
    myLibrary.splice(auxDelete,1);

    //Delete the whole localstorage
    localStorage.deleteArray("Books");

    //Add the new array back onto the localstorage
    for (let i = 0; i < myLibrary.length; i++)
    {
        localStorage.pushArrayItem("Books", myLibrary[i]);
    }

    //Display the books back onto the main table
    displayBooks();
})


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