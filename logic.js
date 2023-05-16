"use strict";

const formContainer = document.querySelector(".container");
const form = document.querySelector("#form");
const newBook = document.querySelector("#new-book");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close");
const bookShelf = document.querySelector(".bookshelf");
let books = JSON.parse(localStorage.getItem("books")) || [];
let formOpen = false;

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

function formOpenOrClosed() {
  if (formOpen) {
    formContainer.style.transform = "scale(0)";
    newBook.style.transform = "rotate(0)";
    form.reset();
    overlay.style.opacity = 0;
    formOpen = false;
  } else {
    formContainer.style.transform = "scale(1)";
    newBook.style.transform = "rotate(45deg)";
    overlay.style.opacity = 1;
    formOpen = true;
  }
}

function closeModal() {
  formContainer.style.transform = "scale(0)";
  overlay.style.opcaity = 0;
  newBook.style.transform = "rotate(0)";
  form.reset();
  formOpen = false;
}

function addBook(i) {
  let bookNode = document.createElement("div");
  bookNode.classList.add("book");
  bookNode.setAttribute("data-index", `${i}`);

  const title = document.getElementById("title").value;
  let titleNode = document.createElement("h2");
  titleNode.innerHTML = `Title: ${title}`;

  const author = document.getElementById("author").value;
  let authorNode = document.createElement("h3");
  authorNode.innerHTML = `Author: ${author}`;

  const pages = document.getElementById("pages").value;
  let pagesNode = document.createElement("h3");
  pagesNode.innerHTML = `Pages: ${pages}`;

  const rating = document.getElementById("rating").value;
  let ratingNode = document.createElement("h3");
  ratingNode.innerHTML = `Rating:`;
  for (let x = 0; x < rating; x++) {
    ratingNode.innerHTML += `⭐`;
  }

  const read = document.getElementById("read").value;
  let readNode = document.createElement("h3");
  readNode.innerHTML = `Status: ${read}`;

  let updateNode = document.createElement("button");
  updateNode.classList = "update";
  updateNode.innerHTML = "📖 Update";

  let trashNode = document.createElement("button");
  trashNode.classList = "trash";
  trashNode.innerHTML = `🗑️ Delete <i class "fas fa-trash-alt">`;

  const book = new Book(title, author, pages, rating);
  books.push(book);

  localStorage.setItem("books", JSON.stringify(books));
  bookNode.appendChild(titleNode);
  bookNode.appendChild(authorNode);
  bookNode.appendChild(pagesNode);
  bookNode.appendChild(ratingNode);
  bookNode.appendChild(readNode);
  bookNode.appendChild(updateNode);
  bookNode.appendChild(trashNode);
  bookShelf.appendChild(bookNode);
  formOpenOrClosed();

  updateNode.addEventListener("click", () => {
    if (readNode.innerHTML === "Status: Read") {
      readNode.innerHTML = "Status: Unread";
      localStorage.setItem("books", JSON.stringify(books));
    } else {
      readNode.innerHTML = "Status: Read";
      localStorage.setItem("books", JSON.stringify(books));
    }
  });

  trashNode.addEventListener("click", () => {
    bookShelf.removeChild(bookNode);
    books.splice(bookNode, 1);
    localStorage.setItem("books", JSON.stringify(books));
  });
}

function getBooks() {
  books.forEach(function (book, i) {
    let bookNode = document.createElement("div");
    bookNode.classList.add("book");
    bookNode.setAttribute("data-index", `${i}`);

    const title = document.getElementById("title").value;
    let titleNode = document.createElement("h2");
    titleNode.innerHTML = `Title: ${book.title}`;

    const author = document.getElementById("author").value;
    let authorNode = document.createElement("h3");
    authorNode.innerHTML = `Author: ${book.author}`;

    const pages = document.getElementById("pages").value;
    let pagesNode = document.createElement("h3");
    pagesNode.innerHTML = `Pages: ${pages}`;

    const rating = document.getElementById("rating").value;
    let ratingNode = document.createElement("h3");
    ratingNode.innerHTML = `Rating:`;
    for (let x = 0; x < rating; x++) {
      ratingNode.innerHTML += `⭐`;
    }

    const read = document.getElementById("read").value;
    let readNode = document.createElement("h3");
    readNode.innerHTML = `Status: ${read}`;

    let updateNode = document.createElement("button");
    updateNode.classList = "update";
    updateNode.innerHTML = "📖 Update";

    let trashNode = document.createElement("button");
    trashNode.classList = "trash";
    trashNode.innerHTML = `🗑️ Delete <i class="fas fa-trash-alt">`;

    bookNode.appendChild(titleNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pagesNode);
    bookNode.appendChild(ratingNode);
    bookNode.appendChild(readNode);
    bookNode.appendChild(updateNode);
    bookNode.appendChild(trashNode);
    bookShelf.appendChild(bookNode);

    updateNode.addEventListener("click", () => {
      if (readNode.innerHTML === "Status: Read") {
        readNode.innerHTML = "Status: Unread";
        localStorage.setItem("books", JSON.stringify(books));
      } else {
        readNode.innerHTML = "Status: Read";
        localStorage.setItem("books", JSON.stringify(books));
      }
    });

    trashNode.addEventListener("click", () => {
      bookShelf.removeChild(bookNode);
      books.splice(bookNode, 1);
      localStorage.setItem("books", JSON.stringify(books));
    });
  });
}

function readFunction(read) {
  if ((read = "read")) {
    read = "unread";
    readNode.innerHTML = `${read}`;
  }
  if ((read = "unread")) {
    read = "read";
    readNode.innerHTML = `${read}`;
  }
}

function clearForm() {
  $name.value = "";
  $author.value = "";
  $pages.value = "";
  $rating.value = "";
}

function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));
}

function checkLocalStorage() {
  if (localStorage.getItem("library")) {
    library = JSON.parse(localStorage.getItem("library"));
  } else {
    library = DEFAULT_DATA;
  }
}

window.addEventListener("load", getBooks);
newBook.addEventListener("click", formOpenOrClosed);
closeButton.addEventListener("click", closeModal);
form.addEventListener("submit", (e, i) => {
  e.preventDefault();
  addBook(i);
});
