'use strict'

const React = require('react')
const { PureComponent } = React
const { Toolbar, ToolbarLeft, ToolGroup } = require('../toolbar')
const { IconButton } = require('../button')
const { Slider } = require('../slider')
const { bool, func, number } = require('prop-types')
const throttle = require('lodash.throttle')

const {
  IconArrow,
  IconSelection,
  IconRotate,
  IconNut,
  IconHand,
  IconMinusCircle,
  IconPlusCircle,
  IconFit
} = require('../icons')

class EsperToolbar extends PureComponent {
  handleRotate = () => {
    this.props.onRotationChange(-90)
  }

  handleZoomChange = throttle((zoom) => {
    this.props.onZoomChange(zoom)
  }, 150)

  render() {
    return (
      <Toolbar>
        <ToolbarLeft>
          <ToolGroup>
            <IconButton
              icon={<IconArrow/>}
              isDisabled={this.props.isDisabled}/>
            <IconButton
              icon={<IconSelection/>}
              isDisabled={this.props.isDisabled}/>
          </ToolGroup>
          <ToolGroup>
            <IconButton
              icon={<IconRotate/>}
              isDisabled={this.props.isDisabled}
              onClick={this.handleRotate}/>
            <IconButton
              icon={<IconNut/>}
              isDisabled={this.props.isDisabled}/>
          </ToolGroup>
          <ToolGroup>
            <IconButton
              icon={<IconHand/>}/>
            <Slider
              value={this.props.zoom}
              min={0.2}
              max={5}
              precision={100}
              size="sm"
              minIcon={<IconMinusCircle/>}
              maxIcon={<IconPlusCircle/>}
              isDisabled={this.props.isDisabled}
              onChange={this.handleZoomChange}/>
            <IconButton
              icon={<IconFit/>}
              isDisabled={this.props.isDisabled}
              isActive={this.props.isAutoZoomActive}
              onClick={this.props.onZoomToggle}/>
          </ToolGroup>
        </ToolbarLeft>
      </Toolbar>
    )
  }

  static propTypes = {
    isDisabled: bool.isRequired,
    isAutoZoomActive: bool.isRequired,
    zoom: number.isRequired,
    onRotationChange: func.isRequired,
    onZoomChange: func.isRequired,
    onZoomToggle: func.isRequired
  }
}

module.exports = {
  EsperToolbar
}
