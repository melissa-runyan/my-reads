import React, { Component } from 'react'

class Bookshelf extends Component {
    onToggleMenu = (book) => (e) => {
        if (this.props.onToggleMenu) {
            this.props.onToggleMenu(book, e.currentTarget.dataset.id);
        }
    }

    handleChange = (book) => (e) => {
        e.preventDefault()

        if (this.props.moveToBookshelf) {
            this.props.moveToBookshelf(book, e.currentTarget.dataset.id);
        }
    }

    render() {
        const { bookshelf, bookshelfTitle, activeBookId, activeClass } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className='books-grid'>
                        {bookshelf.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                            className='book-cover'
                                            style={{
                                                width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`
                                            }}
                                        ></div>
                                        {/*  <div className="book-shelf-changer">
                                        <select onChange={ this.handleChange(book)} value={book.shelf} >
                                            <option value="" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div> */}

                                        <div className="book-shelf-changer" data-id={book.id} onClick={this.onToggleMenu(book)}>
                                            <div className={((activeBookId === book.id) &&
                                                activeClass) ? "add-menu-active" : "add-menu"}>
                                                <div className="book-shelf-changer-option disabled-option">
                                                    Move to...
                                            </div>
                                                <div className={((activeBookId === book.id)
                                                    && book.shelf === "currentlyReading"
                                                ) ? "book-shelf-changer-option disabled-option" : "book-shelf-changer-option"} data-id="currentlyReading" onClick={this.handleChange(book)}>
                                                    <div className="shelf-name">Currently Reading</div>
                                                    <span id="currentlyReading" className={((activeBookId === book.id)
                                                        && book.shelf === "currentlyReading"
                                                    ) ? "in-shelf" : null}
                                                    />
                                                </div>
                                                <div className={((activeBookId === book.id)
                                                    && book.shelf === "wantToRead"
                                                ) ? "book-shelf-changer-option disabled-option" : "book-shelf-changer-option"} data-id="wantToRead" onClick={this.handleChange(book)}>
                                                    <div className="shelf-name">Want To Read</div>
                                                    <span id="wantToRead" className={((activeBookId === book.id)
                                                        && book.shelf === "wantToRead"
                                                    ) ? "in-shelf" : null}
                                                    />
                                                </div>
                                                <div className={((activeBookId === book.id)
                                                    && book.shelf === "read"
                                                ) ? "book-shelf-changer-option disabled-option" : "book-shelf-changer-option"} data-id="read" onClick={this.handleChange(book)}>
                                                    <div className="shelf-name">Read</div>
                                                    <span id="read" className={((activeBookId === book.id)
                                                        && book.shelf === "read"
                                                    ) ? "in-shelf" : null}
                                                    />
                                                </div>
                                                <div className={((activeBookId === book.id)
                                                    && book.shelf === "none"
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

export default Bookshelf