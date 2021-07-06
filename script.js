let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    if(read){
      return `${title} by ${author}, ${pages} pages, have read`
    } else {
      return `${title} by ${author}, ${pages} pages, not read yet`
    }
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const cardContainer = document.getElementById('CardContainer');

function displayLibrary(){
  for(let i = 0; i < myLibrary.length; i++){
    const newDiv = document.createElement('div');
    const newDivContent = document.createElement('ul');
    const bookTitle = document.createElement('li');
    const bookAuthor = document.createElement('li');
    const bookPages = document.createElement('li');
    const bookRead = document.createElement('li');

    newDiv.classList.add('BookCard');
    newDiv.setAttribute('id', `book${i}`)
    
    newDivContent.classList.add('BookList');
    newDivContent.setAttribute('id', `list${i}`)

    const bookContent = Object.values(myLibrary[i]);
    
    bookTitle.appendChild(document.createTextNode(bookContent[0]));
    bookTitle.classList.add('title');
    bookAuthor.appendChild(document.createTextNode(bookContent[1]));
    bookAuthor.classList.add('author');
    bookPages.appendChild(document.createTextNode(`${bookContent[2]} pages`));
    bookPages.classList.add('pages');
    bookRead.appendChild(document.createTextNode(bookContent[3]));
    bookRead.classList.add('read');


    newDivContent.appendChild(bookTitle);
    newDivContent.appendChild(bookAuthor);
    newDivContent.appendChild(bookPages);
    newDivContent.appendChild(bookRead);

    newDiv.appendChild(newDivContent);
    cardContainer.appendChild(newDiv);
  }
}

function openForm() {
  document.getElementById('bookForm').style.display = 'block';
}

function closeForm() {
  document.getElementById('bookForm').style.display = 'none';
}

function submitBook() {
  if (submittedRead == 'Yes'){
    submittedRead = true;
  } else if (submittedRead == 'No'){
    submittedRead = false;
  }
  let submittedBook = new Book(submittedTitle, submittedAuthor, submittedPages, submittedRead)
  addBookToLibrary(submittedBook);
}

let submittedTitle = document.getElementById('submittedTitle').value;
let submittedAuthor = document.getElementById('submittedAuthor').value;
let submittedPages = document.getElementById('submittedPages').value;
let submittedRead = document.getElementById('submittedRead').value;


document.getElementById('submittedTitle').value;

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false)
const farenheit451 = new Book('Fahrenheit 451', 'Ray Bradbury', '158', false)
const hgttg = new Book('The Hitchhiker\'s Guide to the Galaxy', 'Douglas Adams', '193', true)

addBookToLibrary(theHobbit);
addBookToLibrary(farenheit451);
addBookToLibrary(hgttg);

displayLibrary();