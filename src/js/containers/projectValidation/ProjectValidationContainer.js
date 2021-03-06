import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// actions
import * as ProjectImportStepperActions from '../../actions/ProjectImportStepperActions';
import * as CopyrightCheckActions from '../../actions/CopyrightCheckActions';
import * as ProjectInformationCheckActions from '../../actions/ProjectInformationCheckActions';
import * as MergeConflictActions from '../../actions/MergeConflictActions';
import * as MissingVersesActions from '../../actions/MissingVersesActions';
//components
import Dialog from 'material-ui/Dialog';
import ProjectValidationStepper from '../../components/projectValidation/ProjectValidationStepper';
import CopyrightCheck from '../../components/projectValidation/CopyrightCheck';
import ProjectInformationCheck from '../../components/projectValidation/ProjectInformationCheck';
import MergeConflictsCheck from '../../components/projectValidation/MergeConflictsCheck';
import MissingVersesCheck from '../../components/projectValidation/MissingVersesCheck';
import ProjectValidationNavigation from '../../components/projectValidation/ProjectValidationNavigation';
import {withLocale} from '../../components/Locale';

class ProjectValidationContainer extends Component {
  render() {
    let { stepIndex } = this.props.reducers.projectValidationReducer.stepper;
    const { showProjectValidationStepper } = this.props.reducers.projectValidationReducer;

    const projectValidationContentStyle = {
      opacity: "1",
      width: '90%',
      maxWidth: 'none',
      height: '100%',
      maxHeight: 'none',
      padding: 0,
      top: -30
    };

    let displayContainer = <div />;

    switch (stepIndex) {
      case 0:
        displayContainer = <CopyrightCheck {...this.props} />;
        break;
      case 1:
        displayContainer = <ProjectInformationCheck {...this.props} />;
        break;
      case 2:
        displayContainer = <MergeConflictsCheck {...this.props} />;
        break;
      case 3:
        displayContainer = <MissingVersesCheck {...this.props} />;
        break;
      default:
        break;
    }
    return (
      <MuiThemeProvider>
        <Dialog
          actionsContainerStyle={{ backgroundColor: 'var(--background-color-light)' }}
          actions={<ProjectValidationNavigation {...this.props} />}
          modal={true}
          style={{ padding: "0px" }}
          contentStyle={projectValidationContentStyle}
          bodyStyle={{ padding: 0, minHeight: '80vh', backgroundColor: 'var(--background-color-light)' }}
          open={showProjectValidationStepper}>
          <div style={{ height: '80vh' }}>
            <ProjectValidationStepper {...this.props} />
            {displayContainer}
          </div>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducers: {
      projectValidationReducer: state.projectValidationReducer,
      projectDetailsReducer: state.projectDetailsReducer,
      copyrightCheckReducer: state.copyrightCheckReducer,
      projectInformationCheckReducer: state.projectInformationCheckReducer,
      mergeConflictReducer: state.mergeConflictReducer,
      missingVersesReducer: state.missingVersesReducer
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      goToProjectValidationStep: (val) => {
        dispatch(ProjectImportStepperActions.goToProjectValidationStep(val));
      },
      cancel:() => {
        dispatch(ProjectImportStepperActions.confirmContinueOrCancelImportValidation());
      },
      selectProjectLicense: (selectedLicenseId) => {
        dispatch(CopyrightCheckActions.selectProjectLicense(selectedLicenseId));
      },
      toggleNextDisabled: (isDisabled) => {
        dispatch(ProjectImportStepperActions.toggleNextButton(isDisabled));
      },
      updateStepData:(stepIndex, data) => {
        dispatch(ProjectImportStepperActions.updateStepData(stepIndex, data));
      },
      loadProjectLicenseMarkdownFile: (licenseId) => {
        dispatch(CopyrightCheckActions.loadProjectLicenseMarkdownFile(licenseId));
      },
      setBookIDInProjectInformationReducer: (bookId) => {
        dispatch(ProjectInformationCheckActions.setBookIDInProjectInformationReducer(bookId));
      },
      setLanguageIdInProjectInformationReducer: (languageId) => {
        dispatch(ProjectInformationCheckActions.setLanguageIdInProjectInformationReducer(languageId));
      },
      setLanguageNameInProjectInformationReducer: (languageName) => {
        dispatch(ProjectInformationCheckActions.setLanguageNameInProjectInformationReducer(languageName));
      },
      setLanguageDirectionInProjectInformationReducer: (languageDirection) => {
        dispatch(ProjectInformationCheckActions.setLanguageDirectionInProjectInformationReducer(languageDirection));
      },
      setContributorsInProjectInformationReducer: (contributors) => {
        dispatch(ProjectInformationCheckActions.setContributorsInProjectInformationReducer(contributors));
      },
      setCheckersInProjectInformationReducer: (checkers) => {
        dispatch(ProjectInformationCheckActions.setCheckersInProjectInformationReducer(checkers));
      },
      updateVersionSelection: (mergeConflictIndex, versionIndex, value) => {
        dispatch(MergeConflictActions.updateVersionSelection(mergeConflictIndex, versionIndex, value));
      },
      updateCheckerName: (checkerName, index) => {
        dispatch(ProjectInformationCheckActions.updateCheckerName(checkerName, index));
      },
      updateContributorName: (contibutorName, index) => {
        dispatch(ProjectInformationCheckActions.updateContributorName(contibutorName, index));
      },
      finalizeCopyrightCheck: () => {
        dispatch(CopyrightCheckActions.finalize());
      },
      finalizeMergeConflictCheck: () => {
        dispatch(MergeConflictActions.finalize());
      },
      finalizeMissingVersesCheck: () => {
        dispatch(MissingVersesActions.finalize());
      },
      finalizeProjectInformationCheck: () => {
        dispatch(ProjectInformationCheckActions.finalize());
      },
      saveAndCloseProjectInformationCheck: () => {
        dispatch(ProjectInformationCheckActions.saveAndCloseProjectInformationCheck());
      },
      cancelAndCloseProjectInformationCheck: () => {
        dispatch(ProjectInformationCheckActions.cancelAndCloseProjectInformationCheck());
      }
    }
  };
};

ProjectValidationContainer.propTypes = {
  translate: PropTypes.func,
  actions: PropTypes.object.isRequired,
  reducers: PropTypes.shape({
    projectValidationReducer: PropTypes.shape({
      stepper: PropTypes.shape({
        stepIndex: PropTypes.number.isRequired
      }),
      showProjectValidationStepper:PropTypes.bool.isRequired
    }),
    mergeConflictReducer: PropTypes.object.isRequired,
    missingVersesReducer: PropTypes.object.isRequired
  })
};

export default withLocale(connect(mapStateToProps, mapDispatchToProps)(ProjectValidationContainer));
