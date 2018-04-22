import React, { Component } from 'react'

import DropdownMenu from './ui/DropdownMenu'
import DropdownMenuItem from './ui/DropdownMenuItem'

class BookshelfChanger extends Component {

    state = {
        activeItemId: null
    }

    onToggleMenu = (id) => {
        this.setState({ activeItemId: id })  

        if (this.props.toggleMenu) {
            this.props.toggleMenu(id);
        }
    }

    handleChange = (book) => (id) => {
        if (this.props.moveToBookshelf) {
            this.props.moveToBookshelf(book, id);
        }
    }

    render() {
        const { book, node, bookshelf } = this.props
        const { activeItemId } = this.state

        return (
            <DropdownMenu itemId={book.id} node={node} onClick={this.onToggleMenu}>
                <DropdownMenuItem
                    optionName="Currently Reading"
                    optionId="currentlyReading"
                    activeItemName={!bookshelf ? book.shelf: bookshelf}
                    onClick={this.handleChange(book)}
                    itemId={book.id}
                    activeItemId={activeItemId}
                />
                <DropdownMenuItem
                    optionName="Want To Read"
                    optionId="wantToRead"
                    activeItemName={!bookshelf ? book.shelf: bookshelf}
                    onClick={this.handleChange(book)}
                    itemId={book.id}
                    activeItemId={activeItemId}
                />
                <DropdownMenuItem
                    optionName="Read"
                    optionId="read"
                    activeItemName={!bookshelf ? book.shelf: bookshelf}
                    onClick={this.handleChange(book)}
                    itemId={book.id}
                    activeItemId={activeItemId}
                />
                <DropdownMenuItem
                    optionName="None"
                    optionId="none"
                    activeItemName={!bookshelf ? book.shelf: bookshelf}
                    onClick={this.handleChange(book)}
                    itemId={book.id}
                    activeItemId={activeItemId}
                />
            </DropdownMenu>

        )
    }
}

export default BookshelfChanger