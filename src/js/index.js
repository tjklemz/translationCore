(function() {
  const ReactDOM = require('react-dom');
  const React = require('react');
// var db = require('./db-init');
  const UploadModal = require('./uploadmodal');
  const remote = window.electron.remote;
  const {Menu} = remote;
  const menubar = require('./menubar');

var Root = require('./root');

  var App = {
    init: function() {
      var menu = Menu.buildFromTemplate(menubar.template);
      Menu.setApplicationMenu(menu);
      ReactDOM.render(<Root />, document.getElementById('content'));
    }
  };

  window.App = App;
})();
document.addEventListener('DOMContentLoaded', App.init);
