Meteor.startup(function () {
    injectTapEventPlugin();
    React.render(<Main/>, document.getElementById("app"));
});
