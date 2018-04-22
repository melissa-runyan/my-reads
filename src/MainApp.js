import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './Bookshelf'

import './App.css'

class MainApp extends Component {
  moveToBookshelf = (book, shelf) => {
    if(this.props.moveToBookshelf) {
      this.props.moveToBookshelf(book, shelf);
    }
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.props

    return (
      
      <div className="app" ref={node => { this.node = node; }}>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf bookshelfTitle='Currently Reading' 
              bookshelf={currentlyReading}  
              moveToBookshelf={this.moveToBookshelf}
              node={this.node}
              />
            <Bookshelf bookshelfTitle='Want to Read' 
              bookshelf={wantToRead} 
              moveToBookshelf={this.moveToBookshelf}
              node={this.node}
              />
            <Bookshelf bookshelfTitle='Read' 
              bookshelf={read} 
              moveToBookshelf={this.moveToBookshelf}
              node={this.node}
              />
          </div>
        </div>

        <div className="open-search">
          <Link 
              to='/search'
              >Add Book
          </Link>
        </div>
      </div>
    )
  }
}

export default MainApp
