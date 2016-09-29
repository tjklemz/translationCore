/**
 *@author: Manny Colon
 *@description: This component handles the view for The apps/plugins/modules
 package manager.
 ******************************************************************************/
const api = window.ModuleApi;
const React = api.React;
const ReactDOM = require("react-dom");
const ReactBootstrap = api.ReactBootstrap;
const RB = api.ReactBootstrap;
const {Glyphicon, FormGroup, FormControl, ControlLabel, InputGroup, Button} = RB;
const Style = require("./Style");

class PackageManagerView extends React.Component{
  constructor() {
    super();
    this.state = {
      visiblePackManager: true,
    };
    this.handlePackManagerVisibility = this.handlePackManagerVisibility.bind(this);
  }

  componentWillMount(){
    api.registerEventListener('PackManagerVisibility', this.handlePackManagerVisibility);
  }

  componentWillUnmount() {
    api.removeEventListener('PackManagerVisibility', this.handlePackManagerVisibility);
  }

  handlePackManagerVisibility(param){
    this.setState(param);
  }

  hidePackManager(){
    this.setState({visiblePackManager: false});
  }

  render(){
    if(!this.state.visiblePackManager){
      return (<div></div>);
    }else{
      return(
        <div style={Style.layout}>
          <Glyphicon glyph="remove" title="Close Package Manager" style={Style.removeGlypcIcon}
              onClick={this.hidePackManager.bind(this)}/>
            Hello
        </div>
      );
    }
  }

}
module.exports = ReactDOM.render(<PackageManagerView />, document.getElementById('package_manager'));
