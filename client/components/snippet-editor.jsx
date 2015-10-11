// Import comonents
const {
  RaisedButton, List, DropDownMenu, Avatar,
  TextField,Snackbar,CardHeader,CardMedia,CardTitle,CardText,CardActions,Card,
  DropDownIcon,IconMenu,AppBar,Slider
} = mui;

// Define the SnippetList components
SnippetEditor = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      languages: Languages.find({}).fetch()
    }
  },
  render() {

    return (
      <div>
        <AppBar title="add new snippet" iconElementRight="">
        </AppBar>

        <Card>
          <CardText>

            <div>Language</div>
            <DropDownMenu ref="language" displayMember="name" valueMember="code" menuItems={this.data.languages}
              style={{'margin-top' : '24px', width : '100%'}} />

            <br/>
            <TextField ref="title" floatingLabelText="Title ?"
              hintText="little title for the snippet" style={{width : '100%'}}/>
            <br/>
            <TextField ref="content" style={{'margin-top' : '24px', width : '100%'}}
              floatingLabelText="Snippet content"
              multiLine={true}  />
            <br/>
            <div style={{'margin-top' : '24px'}}>Level</div>
            <Slider ref="level" name="level" defaultValue={1} step={1} min={1} max={3} />
            <br/>
            <RaisedButton onClick={this._onSnippetSave} label="save" secondary={true} />
          </CardText>
        </Card>
      </div>
    );
  },
  _onSnippetSave() {
    let language = this.data.languages[this.refs.language.state.selectedIndex].code;
    Snippets.insert({language : language, content : this.refs.content.getValue(),
      title : this.refs.title.getValue(), level : this.refs.level.state.value});
      //this.refs.information.show();
    }
  });
