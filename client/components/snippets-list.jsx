// Import comonents
const {
  RaisedButton, List, ListItem, ListDivider, DropDownMenu, AppBar, LeftNav, MenuItem, Avatar,FlatButton,
  Dialog,TextField,Snackbar,CardHeader,CardMedia,CardTitle,CardText,CardActions,Card,
  DropDownIcon,IconMenu
} = mui;

// Define the SnippetList components
SnippetList = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      snippets: Snippets.find({},{sort : {createdAt : -1}}).fetch()
    }
  },

  render() {
    return(
      <div>
        <AppBar onLeftIconButtonTouchTap={this.openNav}
          title="snippets list">
        </AppBar>

        <List subheader="snippets list">
          {this.displaySnippets()}
        </List>

      </div>
    );

  },
  displaySnippets() {
    return this.data.snippets.map((task) => {
      return(
        <div>
          <ListItem onTouchTap={this.changeCurrentSnippet} secondaryTextLines={2} id={task._id} primaryText={task.title} secondaryText={
              <MarkdownDisplayer snippet={{language : task.language , content : task.content}} />
            }/>
            <ListDivider />
          </div>);
        });
      },
  changeCurrentSnippet(event) {
        let currentId = event.currentTarget.id;
        let currentSnippet = this.data.snippets.find((snippet) => {
          return snippet._id === currentId;
        });
        currentSnippet = currentSnippet ? currentSnippet : {content :'', language : ''};
        console.log(currentSnippet);
        this.props.onSelectSnippet(currentSnippet);
      }
    });
