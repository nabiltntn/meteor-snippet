// Component to display tha snippet with comments and buttons to interact with
const {
  AppBar,Card,CardText,TextField,CardTitle,RaisedButton
} = mui;

// Define the SnippetDisplay Component
SnippetDisplay = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var snippetId = this.props.currentSnippet ? this.props.currentSnippet._id : null;
    return {
      comments: Comments.find({snippetId : snippetId },{sort : {createdAt : -1}}).fetch()
    }
  },
  render() {
    return (
      <div>
        <AppBar title="snippet detail">
        </AppBar>

        <Card>
          <CardText>
            <MarkdownDisplayer snippet={this.props.currentSnippet || {content : '' , language : ''}} />
          </CardText>
        </Card>

        <Card>
          <CardText>
            <CardTitle subtitle="add acomment or question ?"/>
            <TextField ref="comment" style={{width : '100%'}}
                floatingLabelText="comment or question"
            multiLine={true}  />
          <RaisedButton onClick={this._onCommentSave} label="add" secondary={true} />


          </CardText>
        </Card>
        {this.displayComments()}

      </div>
    );
  },
  _onCommentSave() {
    var snippetId = this.props.currentSnippet ? this.props.currentSnippet._id : null;
    Comments.insert({content : this.refs.comment.getValue(),
      snippetId : snippetId});
    },
    displayComments() {
      return this.data.comments.map((comment) => {
        return(
          <Card>
            <CardText>
              {comment.content}
            </CardText>
          </Card>
        );
    });
  }
});
