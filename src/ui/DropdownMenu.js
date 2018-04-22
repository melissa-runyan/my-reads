import React, { Component } from 'react'

class DropdownMenu extends Component {

    state = {
        activeItemId: null,
        activeClass: false,
        dropUp: false
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    handleOutsideClick = (e) => {
        // ignore clicks on the component itself
        if (this.props.node.contains(e.target)) {
            this.state.activeClass ? this.setState({ activeClass: false }) : this.setState({ activeClass: true })
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
    }

    onToggleMenu = (event) => {
        this.setState({ activeItemId: event.currentTarget.dataset.id });
        this.state.activeClass ? this.setState({ activeClass: false }) : this.setState({ activeClass: true })

        const windowHeight = window.innerHeight;
        let bottomShowMenuButtonPos = event.currentTarget.getBoundingClientRect().bottom
        let menuHeight = event.currentTarget.firstChild.offsetHeight

        let roomLeft = windowHeight - bottomShowMenuButtonPos - menuHeight

        roomLeft > 0 ? this.setState({ dropUp: false }) : this.setState({ dropUp: true })

        // attach/remove event handler
        if (!this.state.activeClass) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        if (this.props.onClick) {
            this.props.onClick(event.currentTarget.dataset.id);
        }
    }

    render() {
        const { itemId, children } = this.props
        const { activeItemId, activeClass, dropUp } = this.state
        
        let dropDownMenuClass = "add-menu"
        if((activeItemId === itemId) && activeClass && dropUp) {
            dropDownMenuClass = "add-menu-active dropUp"
        }
        else if ((activeItemId === itemId) && activeClass && !dropUp) {
            dropDownMenuClass = "add-menu-active"
        }

        return (
            <div className="drop-down-menu" data-id={itemId} onClick={this.onToggleMenu} >
                <div className={dropDownMenuClass}>
                    <div className="drop-down-menu-option disabled-option">
                        Move to...
                    </div>
                    {children}
                </div>
            </div>
        );
    }
}

export default DropdownMenu