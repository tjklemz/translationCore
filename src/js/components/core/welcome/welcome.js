const React = require('react');

const RB = require('react-bootstrap');
const {Glyphicon, Button, Popover} = RB;
const CoreActions = require('../../../actions/CoreActions.js');
const ProjectModal = require('../create_project/ProjectModal');

const Login = require('../login/Login');
const Upload = require('../Upload');
const loadOnline = require('../LoadOnline');
const SideNavBar = require('../SideBar/SideNavBar');

const NUM_OF_SLIDES = 2;

const Styles = {
  navButtons: {
    float: 'right',
    margin: '0px 50px',
    height: '50px',
    alignSelf: 'center',
    fontSize: '200%',
    color: '#fff'
  },
  menuButtons: {
    width: '25%',
    margin: '5px'
  },
  welcomePage: {
    width: '100%',
    margin: 'auto',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fff'
  },
  tutorialPage: {
    backgroundColor: '#4d4d4d',
    height: '100%'
  },
  skipTutorialButton: {
    color: '#fff',
    float: 'right',
    margin: '20px'
  },
  nextTutorialButton: {
    color: '#000',
    float: 'right'
  },
  tutorialPopover: {
    maxWidth: '200px'
  },
  welcomeFrame: {
    backgroundColor: '#1a2133',
    height: '100%',
    display: 'flex'
  },
  bigGlyph: {
    color: '#fff',
    fontSize: '1000%'
  },
  loginBox: {
    width: '50%',
    margin: 'auto'
  },
  uploadBox: {
    width: '50%',
    margin: 'auto',
    backgroundColor: '#fff',
    borderRadius: '5px'
  },
  tutorialInfo: {
    fontSize: '1.5em'
  }
}

class Welcome extends React.Component{

  constructor(){
    super();

    this.state = {
      index: 1,
      tutorial: false,
      ImportProjectIntroPage: false,
      tutorialIndex: 1,
    }

    this.getPage = this.getPage.bind(this);
    this.setIndex = this.setIndex.bind(this);
    this.getTutorialOverlay = this.getTutorialOverlay.bind(this);
  }

  setIndex(e){
    this.setState({
      index: e
    });
  }

  getPage(e){
    switch(e){
      case 1:
        return (
          <div style={Styles.welcomePage}>
            <img src="./images/TC_Icon_White.png" />
            <h1>Welcome to translationCore</h1>
            <p style={Styles.tutorialInfo}>We are glad that you are here. We just need to set up a few things before we can begin.</p>
          </div>
        )
        break;
      case 2:
        return(
          <div style={Styles.welcomePage}>
            <Glyphicon style={Styles.bigGlyph} glyph="user" />
            <h1>Connect a Door43 account</h1>
            <p style={Styles.tutorialInfo}>Connecting your Door43 account lets you save your checks online, you can create an account if you dont already have one.</p>
            <div style={Styles.loginBox}>
              <Login success={()=>{this.setState({index:this.state.index+1})}}/>
            </div>
          </div>
        )
        break;
    }
  }

  getImportProjectIntro(){
    return(
      <div style={Styles.welcomeFrame}>
        <div style={Styles.welcomePage}>
        <Glyphicon style={Styles.bigGlyph} glyph="cloud-download" />
          <h1>Load your first project</h1>
          <p style={Styles.tutorialInfo}>You can load in your first project from Door43 or from your hard drive.</p>
            <Button onClick={this.props.initialize}>Import Project</Button>
        </div>
      </div>
    );
  }

  getTutorialOverlay(e){
    var _this = this;
    switch(e){
      case 1:
        return(
          <Popover
            id="accountSettings"
            placement="right"
            positionLeft={88}
            positionTop={35}
            title="Changing Accounts">
            <div style={Styles.tutorialPopover}>
              <p>Clicking here will allow you to log out or see more information about your account</p>
            </div>
            <Button
              style={Styles.nextTutorialButton}
              onClick={() => {_this.setState({tutorialIndex: this.state.tutorialIndex+1})}}
              bsStyle="link">
              {'Next'} <Glyphicon glyph="chevron-right" />
            </Button>
          </Popover>
        )
      break;
      case 2:
        return(
          <Popover
            id="openProject"
            placement="right"
            positionLeft={88}
            positionTop={113}
            title="Opening an Existing Project">
            <div style={Styles.tutorialPopover}>
              <p>You can also open an existing translationCore project and continue yours or someone elses work.</p>
            </div>
            <Button
              style={Styles.nextTutorialButton}
              onClick={() => {_this.setState({tutorialIndex: this.state.tutorialIndex+1})}}
              bsStyle="link">
              {'Next'} <Glyphicon glyph="chevron-right" />
            </Button>
          </Popover>
        )
      break;
      case 3:
        return(
          <Popover
            id="syncProject"
            placement="right"
            positionLeft={88}
            positionTop={202}
            title="Sync Your Work To Door43">
            <div style={Styles.tutorialPopover}>
              <p>Clicking here while connected to the internet will save a copy of what you are working on to Door43</p>
            </div>
            <Button
              style={Styles.nextTutorialButton}
              onClick={() => {_this.setState({tutorialIndex: this.state.tutorialIndex+1})}}
              bsStyle="link">
              {'Next'} <Glyphicon glyph="chevron-right" />
            </Button>
          </Popover>
        )
      break;
      case 4:
        return(
          <Popover
            id="generateReport"
            placement="right"
            positionLeft={88}
            positionTop={293}
            title="Generating a Report">
            <div style={Styles.tutorialPopover}>
              <p>This will generate a report for all of the checks performed by you or anyone else working on the project you have open.</p>
            </div>
            <Button
              style={Styles.nextTutorialButton}
              onClick={() => {_this.setState({tutorialIndex: this.state.tutorialIndex+1})}}
              bsStyle="link">
              {'Next'} <Glyphicon glyph="chevron-right" />
            </Button>
          </Popover>
        )
      break;
      case 5:
        return(
          <Popover
            id="loadApp"
            placement="right"
            positionLeft={88}
            positionTop={379}
            title="Loading a Check">
            <div style={Styles.tutorialPopover}>
              <p>This is where you load in a tool so that you can perform a check on your draft.</p>
            </div>
            <Button
              style={Styles.nextTutorialButton}
              onClick={() => {_this.setState({tutorialIndex: this.state.tutorialIndex+1})}}
              bsStyle="link">
              {'Next'} <Glyphicon glyph="chevron-right" />
            </Button>
          </Popover>
        )
      break;
      case 6:
        return(
          <Popover
            id="appSettings"
            placement="right"
            positionLeft={88}
            positionTop={465}
            title="Settings">
            <div style={Styles.tutorialPopover}>
              <p>Here you can access various settings relating to how translationCore looks and functions</p>
            </div>
            <Button
              style={Styles.nextTutorialButton}
              onClick={() => {_this.setState({tutorialIndex: this.state.tutorialIndex+1})}}
              bsStyle="link">
              {'Next'} <Glyphicon glyph="chevron-right" />
            </Button>
          </Popover>
        )
      break;
      case 7:
        return(
          <Popover
            id="packageManager"
            placement="right"
            positionLeft={88}
            positionTop={551}
            title="Package Manager">
            <div style={Styles.tutorialPopover}>
              <p>Here you can download diffrent tools to perform different types of checks</p>
            </div>
            <Button
              style={Styles.nextTutorialButton}
              onClick={this.skipToProjectPage.bind(this)}
              bsStyle="link">
              {'Done'} <Glyphicon glyph="chevron-right" />
            </Button>
          </Popover>
        )
      break;
  }
}

  skipToProjectPage(){
    this.setState({ImportProjectIntroPage: true});
  }

  render(){
    var _this = this;
    if(this.state.ImportProjectIntroPage){
      return(
        this.getImportProjectIntro()
      );
    }else if(this.state.tutorial){
      return(
        <div style={Styles.tutorialPage}>
          <SideNavBar />
          {this.getTutorialOverlay(this.state.tutorialIndex)}
          <Button
            style={Styles.skipTutorialButton}
            onClick={this.skipToProjectPage.bind(this)}
            bsStyle="link">
            {'Skip'} <Glyphicon glyph="chevron-right" />
          </Button>
        </div>
      )
    } else {
      return(
        <div style={Styles.welcomeFrame}>

          <Button
            bsStyle='link'
            onClick={
              ()=>{
                //If you are on the first slide you cant go backwards
                if(this.state.index == 1){
                  return;
                } else {
                  _this.setState({index:this.state.index-1})
                }
              }
            }
            style={Styles.navButtons}
          >
            <Glyphicon glyph='chevron-left'
                       style={{
                         display: this.state.index == 1 ? "none" : "inline"
                       }}/>
          </Button>

          {this.getPage(this.state.index)}

          <Button
            bsStyle='link'
            onClick={ () => {
                if(this.state.index == NUM_OF_SLIDES){
                  _this.setState({tutorial: true})
                } else {
                  _this.setState({index: this.state.index+1})
                }
              }
            }
            style={Styles.navButtons}
          >
            <Glyphicon glyph='chevron-right' />
          </Button>

        </div>
      )
    }
  }
}

module.exports = Welcome
