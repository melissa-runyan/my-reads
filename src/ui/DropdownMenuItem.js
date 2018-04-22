import React, { Component } from 'react'

class DropdownMenuItem extends Component {

    handleChange = (e) => {
        e.preventDefault()

        if (this.props.onClick) {
            this.props.onClick(e.currentTarget.dataset.id);
        }
    }

    render() {
        const { activeItemId, itemId, optionName, optionId, activeItemName } = this.props

        return (
            <div className={((activeItemId === itemId)
                && (activeItemName === optionId)
            ) ? "drop-down-menu-option disabled-option" : "drop-down-menu-option"} data-id={optionId} onClick={this.handleChange}>
                <div className="item-name">{optionName}</div>
                <span id={optionId} className={((activeItemId === itemId)
                    && (activeItemName === optionId)
                ) ? "current-item" : null}
                />
            </div>
        );
    }
}

export default DropdownMenuItem