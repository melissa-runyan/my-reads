import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import Bookview from './Bookview'

class SearchPage extends Component {

    state = {
        bookResults: [],
        query: '',
        bookshelf:  "none"
    }

    toggleMenu = (id) => {
        let bookShelf = "none"
        let currentlyReading = this.props.currentlyReading.filter((b) => {
            return (b.id === id)
        })

        let wantToRead = this.props.wantToRead.filter((b) => {
            return (b.id === id)
        })

        let read = this.props.read.filter((b) => {
            return (b.id === id)
        })

        if (currentlyReading.length > 0) {
            bookShelf = "currentlyReading"
        }

        if (wantToRead.length > 0) {
            bookShelf = "wantToRead"
        }

        if (read.length > 0) {
            bookShelf = "read"
        }

        this.setState({ bookshelf: bookShelf })
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query,
            bookResults: [],
            bookShelf: "none"
        }))

        if (query !== '') {
            BooksAPI.search(query).then((booklist) => {
                if (booklist !== null && booklist.error === undefined) {
                    let bookResults = booklist.filter((b) => {
                        return ((b.imageLinks !== undefined))
                    })

                    this.setState(() => ({
                        bookResults: bookResults
                    }))
                }
                else {
                    this.setState(() => ({
                        bookResults: []
                    }))
                }
            })
        }
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    render() {
        const { bookshelf, bookResults, query } = this.state
        const { moveToBookshelf } = this.props

        return (
            <div className="search-books" ref={node => { this.node = node; }}>
                <div className="search-books-bar">
                    <Link
                        className='close-search'
                        to='/'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            className='search-contacts'
                            type='text'
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <Bookview booklist={bookResults} bookshelf={bookshelf} node={this.node} moveToBookshelf={moveToBookshelf} onToggleMenu={this.toggleMenu} />
                </div>
            </div>
        )
    }
}

export default SearchPage