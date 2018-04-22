import React, { Component } from 'react'

import BookshelfChanger from './BookshelfChanger'

class Book extends Component {

    render() {
        const { booklist, node, moveToBookshelf, onToggleMenu, bookshelf } = this.props

        return (
            <div className="booklist-view">
                <ol className='books-grid'>
                    {booklist.map((book) => (
                        <li key={book.id ? book.id : ""}>
                            <div className="book">
                                <div className="book-top">
                                    <img
                                        alt="Book Cover"
                                        className="book-cover"
                                        src={book.imageLinks ?
                                            book.imageLinks.thumbnail :
                                            "https://books.google.com/googlebooks/images/no_cover_thumb.gif"
                                        }
                                        style={{
                                            width: 128, height: 193
                                        }}
                                    />
                                    <BookshelfChanger
                                        book={book}
                                        node={node}
                                        bookshelf={bookshelf}
                                        moveToBookshelf={moveToBookshelf}
                                        toggleMenu={onToggleMenu}
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default Book