import consts from './ActionTypes';
// actions
import * as AlertModalActions from './AlertModalActions';
import * as ProjectLoadingActions from './MyProjects/ProjectLoadingActions';
import * as BodyUIActions from './BodyUIActions';
import * as OnlineModeConfirmActions from './OnlineModeConfirmActions';
// helpers
import * as GogsApiHelpers from '../helpers/GogsApiHelpers';

export function loginUser(newUserdata, local = false) {
  return (dispatch => {
    if (local) {
      dispatch({
        type: consts.LOGIN_USER,
        userdata: newUserdata,
        localUser: local
      });
    } else {
      dispatch(OnlineModeConfirmActions.confirmOnlineAction(() => {
        GogsApiHelpers.login(newUserdata).then(newUserdata => {
          dispatch({
            type: consts.LOGIN_USER,
            userdata: newUserdata
          });
          dispatch(BodyUIActions.goToStep(1));
        }).catch(function (err) {
          var errmessage = "An error occurred while trying to login";
          if (err.syscall === "getaddrinfo") {
            errmessage = "Unable to connect to server";
          } else if (err.status === 404) {
            errmessage = "Incorrect Username";
          } else if (err.status === 401) {
            errmessage = "Incorrect Password";
          }
          dispatch(AlertModalActions.openAlertDialog(errmessage));
        });
      }));
    }
    dispatch(BodyUIActions.goToStep(1));
  });
}

export function logoutUser() {
  return ((dispatch) => {
    dispatch({
      type: consts.LOGOUT_USER
    });
    dispatch(ProjectLoadingActions.clearLastProject());
    dispatch(BodyUIActions.toggleHomeView(true));
    dispatch({ type: consts.RESET_ONLINE_MODE_WARNING_ALERT });
    dispatch(BodyUIActions.goToStep(1));
    dispatch(BodyUIActions.updateStepLabel(1, null));
    dispatch(BodyUIActions.resetStepLabels(1));
  });
}

export function feedbackChange(e) {
  return {
    type: consts.FEEDBACK_CHANGE,
    val: e
  };
}

export function subjectChange(subject) {
  return {
    type: 'FEEDBACK_SUBJECT_CHANGE',
    val: subject
  };
}

export function submitFeedback() {
  return ((dispatch) => {
    dispatch(OnlineModeConfirmActions.confirmOnlineAction(() => {
      dispatch({
        type: consts.SUBMIT_FEEDBACK
      });
    }));
  });
}
