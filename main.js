const newBookFormButton = document.querySelector("#submit_button");

// Contructors

function MyLibrary() {
  this.library = [];
  this.bookRenderer = createBookDiv();
  this.addToLibrary = function(book) {
    this.library.push(book);
  };
  
  this.render = function() {
    this.library.forEach(book => {
      this.bookRenderer(book);
    })
  }
  
  this.displayBook = function(book) {
    this.bookRenderer(book);
  }
  
  this.findBook = function(bookInfo) {
    return this.library.find(book => {
      return book.title == bookInfo[0] && book.author == bookInfo[1];
    })
  }
  
  this.deleteBook = function(book) {
    const index = this.library.indexOf(book);
    this.library.splice(index, 1);
  }
}

function Book(title, author, read_status) {
  this.title = title;
  this.author = author;
  this.read_status = read_status;
}

// utility functions

const createEl = (el) => {
  return document.createElement(el);
}

const setText = (el, text) => {
  el.textContent = text;
  return el;
}

const getSiblings = el => {
  return [...el.parentElement.parentElement.childNodes];
}

const locateBookFromLibrary = el => {
  const bookText = getTagElementsTextContent(getSiblings(el), "P")
  return myLib.findBook(bookText);
}

const getTagElementsTextContent = (nodes, tagName) => {
  const bookText = [];
  nodes.forEach(node => {
    if(node.tagName === tagName) bookText.push(node.textContent);
  });
  return bookText;
}

const addReadButtonEventListeners = button => {
  button.addEventListener('click', function() {
    this.classList.add('spinning');
    const bookToUpdate = locateBookFromLibrary(this);
    const status = bookToUpdate.read_status
    bookToUpdate.read_status = status === "read" ? "unread" : "read";
    getSiblings(this).filter(node => node.tagName === "P")[2].textContent = bookToUpdate.read_status;
  });
  
  button.addEventListener('animationend', function() {
    this.classList.remove('spinning');
  });
}

const AddDeleteButtonEventListeners = button => {
  button.addEventListener('click', function() {
    myLib.deleteBook(locateBookFromLibrary(this))
    this.parentElement.parentElement.parentElement.remove(this);
  });
}

// Library management functions

const createBookDiv = () => {
  const container = document.getElementById('container');
  return (book) => {
    const outerDiv = document.createElement('div')
    outerDiv.classList.add('books');
    const div = createEl('div');
    Object.values(book).forEach(bookProperty => {
      div.append(setText(createEl('p'),bookProperty));
    });
  div.classList.add('book');
  const bookReadButton = createEl('button');
  bookReadButton.classList.add('refresh-button');
  const deleteButton = createEl('button');
  deleteButton.classList.add('delete-button');
  addReadButtonEventListeners(bookReadButton);
  AddDeleteButtonEventListeners(deleteButton);
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-div');
  buttonDiv.append(bookReadButton);
  buttonDiv.append(deleteButton);
  div.append(buttonDiv);
  outerDiv.append(div)
  container.append(outerDiv);
  } 
}

const formValsArray = form => {
  return [form.title.value, form.author.value, form.read.checked ? "read" : "unread"]
}

const myLib = new MyLibrary();

// event listeners

newBookFormButton.addEventListener('click', function(event) {
  event.preventDefault();
  const formVals = formValsArray(this.form);
  const book = new Book(...formVals);
  this.form.reset();
  myLib.addToLibrary(book);
  myLib.displayBook(book);
});

myLib.addToLibrary(new Book("whatever", "whoever", "read"));
myLib.addToLibrary(new Book("whatever2", "whoever2", "unread"));
myLib.addToLibrary(new Book("whatever3", "whoever3", "read"));
myLib.addToLibrary(new Book("whatever4", "whoever4", "unread"));
myLib.addToLibrary(new Book("whatever5", "whoever5", "read"));
myLib.addToLibrary(new Book("whatever6", "whoever6", "unread"));
myLib.addToLibrary(new Book("whatever7", "whoever7", "read"));
myLib.addToLibrary(new Book("whatever8", "whoever8", "unread"));
myLib.addToLibrary(new Book("whatever9", "whoever9", "read"));
myLib.addToLibrary(new Book("whatever10", "whoever10", "unread"));

myLib.render();