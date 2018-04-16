import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './Bookshelf'

import './App.css'

class MainApp extends Component {

  state = {
    activeBookId: null,
    activeClass: false,
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
      document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleOutsideClick = (e) => {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
        this.state.activeClass ? this.setState({ activeClass: false }) : this.setState({ activeClass: true })
        document.removeEventListener('click', this.handleOutsideClick, false);
    }
  }

  onToggleMenu = (book, id) => {
    this.setState({ activeBookId: id });
    this.state.activeClass ? this.setState({ activeClass: false }) : this.setState({ activeClass: true })

    // attach/remove event handler
    if (!this.state.activeClass) {
        document.addEventListener('click', this.handleOutsideClick, false);
    } else {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }
  }

  moveToBookshelf = (book, shelf) => {
    if(this.props.moveToBookshelf) {
      this.props.moveToBookshelf(book, shelf);
    }
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.props
    const { activeBookId, activeClass } = this.state

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
              onToggleMenu={this.onToggleMenu}
              activeBookId={activeBookId}
              activeClass={activeClass}
              />
            <Bookshelf bookshelfTitle='Want to Read' 
              bookshelf={wantToRead} 
              moveToBookshelf={this.moveToBookshelf}
              onToggleMenu={this.onToggleMenu}
              activeBookId={activeBookId}
              activeClass={activeClass}
              />
            <Bookshelf bookshelfTitle='Read' 
              bookshelf={read} 
              moveToBookshelf={this.moveToBookshelf}
              onToggleMenu={this.onToggleMenu}
              activeBookId={activeBookId}
              activeClass={activeClass}
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
