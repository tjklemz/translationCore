(function() {
  const ReactDOM = require('react-dom');
  const React = require('react');
  const PhrasseModuleView = require('../components/modules/phrase_check_module/CheckModuleView');
  const LexicalModuleView = require('../components/modules/lexical_check_module/CheckModuleView');

  const NavMenu = require('../components/NavigationMenu');\
  const remote = window.electron.remote;
  const {Menu} = remote;
  const TPane = require('../components/core/TPane');

// var db = require('./db-init');
  const LoginModal = require('../components/LoginModal');
  const UploadModal = require('../components/core/UploadModal');
  const MenuBar = require('../components/core/MenuBar');
  const SettingsModal = require('../components/core/SettingsModal');
  const RootStyles = require('./RootStyle');
  const Grid = require('react-bootstrap/lib/Grid.js');
  const Row = require('react-bootstrap/lib/Row.js');
  const Col = require('react-bootstrap/lib/Col.js');

  var App = {
    init: function() {
      var menu = Menu.buildFromTemplate(MenuBar.template);
      Menu.setApplicationMenu(menu);
      console.log('hi');
      var Application = (
        <div>
          <NavBar/>
          <LoginModal />
          <TPane />
          <UploadModal />
          <LexicalModuleView />
          <SettingsModal />
          <UploadModal />
          <Grid fluid>
            <Row>
              <Col style={RootStyles.SideMenu} xs={2} md={2} lg={2}>
                <NavMenu />
              </Col>
            </Row>
            <Row>
              <Col style={RootStyles.CheckSection} xs={10} md={10} lg={10} xsOffset={2} mdOffset={2}>
                <TPane />
                <CheckModuleView />
              </Col>
            </Row>
          </Grid>
>>>>>>> lw-tuesday-demo
        </div>
      );
      ReactDOM.render(Application, document.getElementById('content'));
    }
  };

  window.App = App;
})();
document.addEventListener('DOMContentLoaded', App.init);
