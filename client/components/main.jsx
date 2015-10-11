const {
  RaisedButton, List, ListItem, ListDivider, DropDownMenu, AppBar, LeftNav, MenuItem, Avatar,FlatButton,
  Dialog,TextField,Snackbar,CardHeader,CardMedia,CardTitle,CardText,CardActions,Card,
  DropDownIcon,IconMenu
} = mui;

// Main components for the application
const ThemeManager = new mui.Styles.ThemeManager();



Main = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
    }
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState () {
    return {
      currentSnippet  : null
    }
  },
  render() {



    let dialogActions = [
      { text: 'Annuler' },
      { text: 'Valider', onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];

    menuItems = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'customization', text: 'Customization' },
      { route: 'components', text: 'Components' },
      { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
      {
        type: MenuItem.Types.LINK,
        payload: 'https://github.com/callemall/material-ui',
        text: 'GitHub'
      },
      {
        text: 'Disabled',
        disabled: true
      },
      {
        type: MenuItem.Types.LINK,
        payload: 'https://www.google.com',
        text: 'Disabled Link',
        disabled: true
      },
    ];

    let iconMenuItems = [
      { payload: '1', text: 'Download' },
      { payload: '2', text: 'More Info' }
    ];


    return (


      <SplitPane split="vertical" minSize="50" defaultSize="400">
        <div>

          <LeftNav header={<Avatar src="http://www.thinkstockphotos.fr/CMS/StaticContent/Hero/TS_AnonHP_462882495_01.jpg" />} ref="leftNav" docked={false}  menuItems={menuItems} />
          <SnippetEditor/>

          <Dialog
            title="Nouvel utilisateur"
            ref="addNewUser"
            actionFocus="submit"
            actions={dialogActions}
            modal={false}>
            Créer un nouvel utilisateur<br/>
          <TextField ref="firstName"
            hintText="Prénom" />
          <br/>
          <TextField ref="lastName"
            hintText="Nom" />
        </Dialog>

        <Snackbar
          style={{float : 'right'}}
          ref="information"
          message="Event added to your calendar"
          action="undo"
          autoHideDuration={5000}
          onActionTouchTap={this._handleAction}/>
      </div>
      <div>
        <div>
          <SplitPane split="vertical" minSize="50" defaultSize="400">
            <SnippetList onSelectSnippet={this.setCurrentState}/>
            <SnippetDisplay currentSnippet={this.state.currentSnippet}/>
          </SplitPane>
        </div>
      </div>
    </SplitPane>
  );
},

openNav() {
  this.refs.leftNav.toggle();
},
displayNewTaskDialog() {
  this.refs.addNewUser.show();
},

setCurrentState(newSnippet) {
  this.setState({currentSnippet : newSnippet});
}

});
