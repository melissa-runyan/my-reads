# MyReads Project

This project is an application built in React to move books from one shelf into another. Books can
be added into three bookshelves currently reading, want to read, and read.  

Books can be moved from one shelf to another from the main page, or by adding a book through searching.  
When the add button is clicked the search page will be displayed.  On the search page a book can be 
searched for and added into one of the three bookshelves.

## Deployment Instructions

To run this project:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms.
├── package.json # npm package manager file.
├── public
│   ├── mel.ico # Application Icon
│   └── index.html 
└── src
    ├── App.css # Styles for the app.
    ├── App.js # This is the root of the app.
    ├── App.test.js # Used for testing.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── Bookshelf.js # This the bookshelf component that handles rendering the three bookselves.
    ├── BookshelfChanger.js # Creates the bookshelf dropdown using the UI Dropdown Components   
    ├── Bookview # the bookview to display the books and bookshelf changer
    ├── icons # Images for the application
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    │   └── checkbox.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # Used for rendering the DOM.
    └── MainApp.js # Main page of the application where the bookshelves are displayed with link to the search page.   
    └── SearchPage.js # This is the search page used to add a book to a shelf.    
    ├── ui # Ui Components for Dropdown Menu
    │   ├── DropdownMenu.js
    │   ├── DropdownMenuItem.js 
```

## Backend Server

To simplify the development process, a backend server for you to develop against was used. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods used need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
