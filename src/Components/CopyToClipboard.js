import { Tooltip } from "@mui/material"
import copy from "clipboard-copy"
import * as React from "react"

/**
 * Render prop component that wraps element in a Tooltip that shows "Copied to clipboard!" when the
 * copy function is invoked
 */
class CopyToClipboard extends React.Component {
  state = { showTooltip: false }

  render() {
    return (
      <Tooltip
        open={this.state.showTooltip}
        title={"Copied to clipboard!"}
        leaveDelay={1500}
        onClose={this.handleOnTooltipClose}
        {...(this.props.TooltipProps || {})}
      >
        {this.props.children({ copy: this.onCopy })}
      </Tooltip>
    )
  }

  onCopy = content => {
    copy(content)
    this.setState({ showTooltip: true })
  }

  handleOnTooltipClose = () => {
    this.setState({ showTooltip: false })
  }
}

export default CopyToClipboard
