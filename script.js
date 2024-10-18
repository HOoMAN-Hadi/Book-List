const $ = document;
const bookNameInput = $.getElementById("book-name");
const authorNameInput = $.getElementById("author-name");
const publishYearInput = $.getElementById("publish-year");
const addBookBtn = $.getElementById("addBookBtn");
const bookTableBody = $.getElementById("book-table-body");

//   پایان گرفتن المنت ها از دام
let bookListArray = [];

addBookBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let bookNameValue = bookNameInput.value;
  let authorNameValue = authorNameInput.value;
  let publishYearValue = publishYearInput.value;

  createNewBook(bookNameValue, authorNameValue, publishYearValue);
  setLocalStorage();
  bookTableBody.innerHTML = "";
  createElemsInDom();
});

//   فانکشن ساختن یک آبجکت برای کتاب جدید
function createNewBook(bookNameValue, authorNameValue, publishYearValue) {
  let newBookObj = {
    id: bookListArray.length + 1,
    title: bookNameValue,
    author: authorNameValue,
    publishYear: publishYearValue,
  };

  if (newBookObj.title) {
    bookListArray.push(newBookObj);
  } else {
    alert("نام کتاب نمی تواند خالی باشد");
  }

  bookNameInput.value = "";
  authorNameInput.value = "";
  publishYearInput.value = "";
}

//   فانکشن ست کردن آرایه در لوکال استوریج boolListArray
function setLocalStorage() {
  localStorage.setItem("BookList", JSON.stringify(bookListArray));
}

//   فانکشن گرفتن آرایه از لوکال استوریج
function getLocalStorage() {
  let savedBookListArray = JSON.parse(localStorage.getItem("BookList"));
  if (savedBookListArray) {
    bookListArray = savedBookListArray;
  }
  console.log(bookListArray);
  createElemsInDom();
}

//   DOM فانکشن ساختن المنت های
function createElemsInDom() {
  bookListArray.forEach(function (book) {
    let newBookTrElem = $.createElement("tr");

    let newBookTitleTdElem = $.createElement("td");
    newBookTitleTdElem.innerHTML = book.title;

    let newBookAuthorTdElem = $.createElement("td");
    newBookAuthorTdElem.innerHTML = book.author;

    let newBookYearTdElem = $.createElement("td");
    newBookYearTdElem.innerHTML = book.publishYear;

    newBookTrElem.append(
      newBookTitleTdElem,
      newBookAuthorTdElem,
      newBookYearTdElem
    );
    bookTableBody.append(newBookTrElem);
  });
}

window.addEventListener("load", getLocalStorage);
