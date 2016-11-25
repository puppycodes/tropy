'use strict'

const React = require('react')
const { Component, PropTypes } = React
const { Editable } = require('../editable')
const { imageURL } = require('../../common/cache')
const cn = require('classnames')

const ICON_SIZE = 24

class Cell extends Component {
  constructor(props) {
    super(props)
  }


  activate = () => {
    this.props.onActivate(this.props.property.uri)
  }

  changed = (value) => {
    this.props.onChange({
      [this.props.property.uri]: { value, type: this.type }
    })
  }


  get value() {
    const { data, property } = this.props

    return data[property.uri] ?
      data[property.uri].value : null
  }

  get type() {
    const { data, property } = this.props

    return data[property.uri] ?
      data[property.uri].type : (property.type || 'text')
  }

  get icon() {
    const { item, cache } = this.props

    switch (true) {
      case !!item.cover:
        return imageURL(cache, item.cover, ICON_SIZE * 2)
      case !!item.photos.length:
        return imageURL(cache, item.photos[0], ICON_SIZE * 2)
      default:
        return 'ITEM_ICON'
    }
  }

  renderIcon() {
    if (this.props.hasIcon) {
      return <CellIcon src={this.icon} size={ICON_SIZE}/>
    }
  }

  render() {
    const {
      isActive, isDisabled, width, onCancel
    } = this.props

    return (
      <td
        className={cn({ metadata: true, [this.type]: true })}
        style={{ width }}>

        {this.renderIcon()}

        <Editable
          value={this.value}
          editing={isActive}
          disabled={isDisabled}
          onActivate={this.activate}
          onCancel={onCancel}
          onChange={this.changed}/>
      </td>
    )
  }


  static propTypes = {
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    hasIcon: PropTypes.bool,

    property: PropTypes.shape({
      uri: PropTypes.string.isRequired,
      type: PropTypes.string,
    }),

    item: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    cache: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,

    onActivate: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func
  }
}


const CellIcon = ({ src, size }) => {
  return (
    <img srcSet={`${encodeURI(src)} 2x`} width={size} height={size}/>
  )
}

CellIcon.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}


module.exports = {
  Cell,
  CellIcon
}
