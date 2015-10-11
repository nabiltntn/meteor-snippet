// Mark down display
MarkdownDisplayer = React.createClass({

  /*
  propTypes: {
      snippet:  React.PropTypes.shape({
      language:  React.PropTypes.string.isRequired,
      content:   React.PropTypes.string.isRequired
    })
  },
  */
  render() {
    return (
      <Highlight className={this.props.snippet.language}>
           {this.props.snippet.content}
      </Highlight>
    )
  }
});
