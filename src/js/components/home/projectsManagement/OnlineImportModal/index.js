import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import { Dialog, CardHeader } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// components
import SearchOptions from './SearchOptions';
import URLInput from './URLInput';
import SearchResults from './SearchResults';

export default class OnlineImportModal extends Component {
  render() {
    let {
      translate,
      importOnlineReducer: {
        importLink,
        repos
      },
      loginReducer: {
        userdata
      },
      homeScreenReducer: {
        onlineImportModalVisibility
      },
      actions: {
        closeOnlineImportModal,
        handleURLInputChange,
        loadProjectFromLink
      }
    } = this.props;

    const buttonActions = [
      <button
        key={1}
        label={translate('cancel')}
        className="btn-second"
        onClick={closeOnlineImportModal}
      >
        Cancel
      </button>,
      <button
        key={2}
        label={translate('import')}
        className="btn-prime"
        disabled={importLink ? false : true}
        onClick={() => {
          closeOnlineImportModal();
          loadProjectFromLink();
        }}
      >
       <Glyphicon glyph={"cloud-download"} style={{}} />&nbsp;{translate('import')}
      </button>
    ];

    const headerContent = (
      <div>
        <span>{translate('home.project.import_from_door43', {door43: translate('_.door43')})}</span>
          <Glyphicon
            onClick={closeOnlineImportModal}
            glyph={"remove"}
            style={{color: "var(--reverse-color)", cursor: "pointer", fontSize: "18px", float: "right"}}
          />
       </div>
    );

    return (
      <MuiThemeProvider>
        <Dialog
          contentStyle={{ height: "100%", width: "900px", maxWidth: "900px" }}
          style={{ padding: "0px" }}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          open={onlineImportModalVisibility}
          actions={buttonActions}
          modal={false}
        >
          <CardHeader
            style={{ color: "var(--reverse-color)", backgroundColor: 'var(--accent-color-dark)', padding: '15px', margin: "-44px -24px -24px -24px"}}
          >
            {headerContent}
          </CardHeader><br />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px 20px 0px" }}>
            <p>
              {translate('home.project.only_titus_supported')}
            </p>
          </div>
          <URLInput
            handleURLInputChange={handleURLInputChange}
            importLink={importLink}
          />
          <SearchOptions
            translate={translate}
            actions={this.props.actions}
            importLink={importLink}
            username={userdata.username}
          />
          <SearchResults repos={repos}
                         translate={translate}
                         importLink={importLink}
                         handleURLInputChange={handleURLInputChange} />
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

OnlineImportModal.propTypes = {
  translate: PropTypes.func.isRequired,
  importOnlineReducer: PropTypes.object.isRequired,
  homeScreenReducer: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
