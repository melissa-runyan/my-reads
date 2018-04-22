import React, { Component } from 'react'

import Bookview from './Bookview'

class Bookshelf extends Component {
    moveToBookshelf = (book, id) => {
        if (this.props.moveToBookshelf) {
            this.props.moveToBookshelf(book, id);
        }
    }

    render() {
        const { bookshelf, bookshelfTitle, node } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelfTitle}</h2>
                <Bookview booklist={bookshelf} node={node} moveToBookshelf={this.moveToBookshelf} />
            </div>
        )
    }
}

export default Bookshelf