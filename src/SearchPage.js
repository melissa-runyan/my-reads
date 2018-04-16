import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {

    state = {
        bookResults: [],
        query: '',
        activeBookId: null,
        activeClass: false,
        bookShelf: null
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

    onToggleMenu = (book) => (event) => {
        this.setState({ activeBookId: event.currentTarget.dataset.id });
        this.state.activeClass ? this.setState({ activeClass: false }) : this.setState({ activeClass: true })

        // attach/remove event handler
        if (!this.state.activeClass) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        let bookShelf = "";
        let currentlyReading = this.props.currentlyReading.filter((b) => {
            return (b.id === book.id)
        })

        let wantToRead = this.props.wantToRead.filter((b) => {
            return (b.id === book.id)
        })

        let read = this.props.read.filter((b) => {
            return (b.id === book.id)
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

        this.setState({ bookShelf: bookShelf })
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query,
            bookResults: [],
            activeBookId: null,
            activeClass: false,
            bookShelf: null
        }))

        if (query !== '') {
            BooksAPI.search(query).then((booklist) => {
                console.log(booklist)
                console.log(query)
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

    handleChange = (book) => (e) => {
        e.preventDefault()

        if (this.props.moveToBookshelf) {
            this.props.moveToBookshelf(book, e.currentTarget.dataset.id);
        }
    }

    render() {
        const { bookResults, query } = this.state

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
                    <ol className='books-grid'>
                        {bookResults.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                            className='book-cover'
                                            style={{
                                                width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`
                                            }}
                                        ></div>
                                        <div className="book-shelf-changer" data-id={book.id} onClick={this.onToggleMenu(book)}>
                                            <div className={((this.state.activeBookId === book.id) &&
                                                this.state.activeClass) ? "add-menu-active" : "add-menu"}>
                                                <div className="book-shelf-changer-option disabled-option">
                                                    Move to...
                                            </div>
                                                <div className={((this.state.activeBookId === book.id)
                                                    && this.state.bookShelf === "currentlyReading"
                                                ) ? "book-shelf-changer-option disabled-option" : "book-shelf-changer-option"} data-id="currentlyReading" onClick={this.handleChange(book)}>
                                                    <div className="shelf-name">Currently Reading</div>
                                                    <span id="currentlyReading" className={((this.state.activeBookId === book.id)
                                                        && this.state.bookShelf === "currentlyReading"
                                                    ) ? "in-shelf" : null}
                                                    />
                                                </div>
                                                <div className={((this.state.activeBookId === book.id)
                                                    && this.state.bookShelf === "wantToRead"
                                                ) ? "book-shelf-changer-option disabled-option" : "book-shelf-changer-option"} data-id="wantToRead" onClick={this.handleChange(book)}>
                                                    <div className="shelf-name">Want To Read</div>
                                                    <span id="wantToRead" className={((this.state.activeBookId === book.id)
                                                        && this.state.bookShelf === "wantToRead"
                                                    ) ? "in-shelf" : null}
                                                    />
                                                </div>
                                                <div className={((this.state.activeBookId === book.id)
                                                    && this.state.bookShelf === "read"
                                                ) ? "book-shelf-changer-option disabled-option" : "book-shelf-changer-option"} data-id="read" onClick={this.handleChange(book)}>
                                                    <div className="shelf-name">Read</div>
                                                    <span id="read" className={((this.state.activeBookId === book.id)
                                                        && this.state.bookShelf === "read"
                                                    ) ? "in-shelf" : null}
                                                    />
                                                </div>
                                                <div className={((this.state.activeBookId === book.id)
                                                    && this.state.bookShelf === "none"
                                                ) ? "book-shelf-changer-option disabled-option" : "book-shelf-changer-option"} data-id="none" onClick={this.handleChange(book)}>
                                                    <div className="shelf-name">None</div>
                                                    <span id="none" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage