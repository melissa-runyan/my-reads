import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'

import MainApp from './MainApp'
import SearchPage from './SearchPage'

import './App.css'

class App extends Component {
  state = {
    read: [],
    currentlyReading: [],
    wantToRead: [],
  }

  componentDidMount() {
    this.fetchBookshelves();
  }

  fetchBookshelves() {
    BooksAPI.getAll()
      .then((books) => {

        const filterItems = (query) => {
          return books.filter((b) =>
            b.shelf === query
          );
        }

        const currentlyReading = filterItems('currentlyReading')

        const wantToRead = filterItems('wantToRead')

        const read = filterItems('read')

        this.setState(() => ({ currentlyReading, wantToRead, read }))
      })
  }

  moveToBookshelf = (book, shelf) => {
    console.log(book);
    console.log(shelf);
    BooksAPI.update(book, shelf);
    this.fetchBookshelves();
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state

    return (
      <div>
        <Route exact path='/' render={({ history }) => (
          <MainApp
            currentlyReading={currentlyReading}
            wantToRead={wantToRead}
            read={read}
            moveToBookshelf={(book, shelf) => {
              this.moveToBookshelf(book, shelf)
            }}
          />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchPage
            currentlyReading={currentlyReading}
            wantToRead={wantToRead}
            read={read}
            moveToBookshelf={(book, shelf) => {
              this.moveToBookshelf(book, shelf)
            }}
          />
        )} />
      </div>
    )
  }
}

export default App
