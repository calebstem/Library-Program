let myLibrary = [];
myLibrary = JSON.parse(localStorage.getItem('myLibrary') || '[]');

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.info = function() {
  if(this.read){
    return `${this.title} by ${this.author}, ${this.pages} pages, have read`
  } else {
    return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const cardContainer = document.getElementById('CardContainer');

function displayLibrary(){
  while (cardContainer.firstChild){ //removes the display and redraws it
    cardContainer.removeChild(cardContainer.lastChild)
  }

  for(let i = 0; i < myLibrary.length; i++){
    const newDiv = document.createElement('div');
    const newDivContent = document.createElement('ul');
    const deleteBook = document.createElement('button');
    const deleteBookButton = document.getElementsByClassName('deleteBookButton')
    const bookTitle = document.createElement('li');
    const bookAuthor = document.createElement('li');
    const bookPages = document.createElement('li');
    const bookRead = document.createElement('li');

    newDiv.classList.add('BookCard');
    newDiv.setAttribute('id', `book${i}`)
    
    newDivContent.classList.add('BookList');
    newDivContent.setAttribute('id', `list${i}`)

    deleteBook.classList.add('deleteBookButton')
    deleteBook.setAttribute('id', `${i}`)
    deleteBook.appendChild(document.createTextNode('Remove Book'))
    
    const bookContent = Object.values(myLibrary[i]);
    
    bookTitle.appendChild(document.createTextNode(bookContent[0]));
    bookTitle.classList.add('title');
    bookAuthor.appendChild(document.createTextNode(bookContent[1]));
    bookAuthor.classList.add('author');
    bookPages.appendChild(document.createTextNode(`${bookContent[2]} pages`));
    bookPages.classList.add('pages');
    if(bookContent[3]){
      bookRead.appendChild(document.createTextNode('Read'));
    } else {
      bookRead.appendChild(document.createTextNode('Unread'));
    }
    
    bookRead.classList.add('read');

    newDivContent.appendChild(bookTitle);
    newDivContent.appendChild(bookAuthor);
    newDivContent.appendChild(bookPages);
    newDivContent.appendChild(bookRead);

    newDiv.appendChild(deleteBook);
    newDiv.appendChild(newDivContent);
    cardContainer.appendChild(newDiv);

    deleteBookButton[i].addEventListener('click', function() {
      removeBook(i);
    }, false);

    bookRead.addEventListener('click', function() {
      changeReadStatus(i)
    }, false);
  }
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function openForm() {
  document.getElementById('bookForm').style.display = 'block';
}

function closeForm() {
  document.getElementById('bookForm').style.display = 'none';
}


function submitBook() {
  closeForm();
  let submittedTitle = document.getElementById('submittedTitle').value;
  let submittedAuthor = document.getElementById('submittedAuthor').value;
  let submittedPages = document.getElementById('submittedPages').value;
  let submittedRead = document.getElementById('submittedRead').value;
  
  if (submittedRead == 'Yes'){
    submittedRead = true;
  } else {
    submittedRead = false;
  }

  let submittedBook = new Book(`${submittedTitle}`, `${submittedAuthor}`, `${submittedPages}`, submittedRead)
  addBookToLibrary(submittedBook);
  displayLibrary();
}

function removeBook(arrayPos){
  myLibrary.splice(arrayPos, 1);
  displayLibrary();
  //localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function changeReadStatus(arrayPos){
  myLibrary[arrayPos].read = !myLibrary[arrayPos].read
  displayLibrary();
}


// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false)
// const farenheit451 = new Book('Fahrenheit 451', 'Ray Bradbury', '158', false)
// const hgttg = new Book('The Hitchhiker\'s Guide to the Galaxy', 'Douglas Adams', '193', true)

// addBookToLibrary(theHobbit);
// addBookToLibrary(farenheit451);
// addBookToLibrary(hgttg);

displayLibrary();