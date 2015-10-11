// Component to display tha snippet with comments and buttons to interact with
const {
  AppBar,Card,CardText,TextField,CardTitle,RaisedButton,Snackbar
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

    let levels = {1 : 'Beginner', 2 : 'Intermediate', 3 : 'Expert'};
    let level = this.props.currentSnippet ? levels[this.props.currentSnippet.level] : '';


    return (
      <div>
        <AppBar title="snippet detail">
        </AppBar>


        <Card>
          <CardText>
            {level}
          </CardText>

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


        <Snackbar
  style={{float : 'right'}}
  ref="forNewComent"
  message="comment saved !"
  action="Great !"
  autoHideDuration={5000}/>

      </div>
    );
  },
  _onCommentSave() {
    var snippetId = this.props.currentSnippet ? this.props.currentSnippet._id : null;
    Comments.insert({content : this.refs.comment.getValue(),
      snippetId : snippetId});

      //clean form afte saving a new comment
      this.refs.comment.setValue("");
      this.refs.forNewComent.show();
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
