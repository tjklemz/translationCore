import { combineReducers } from 'redux';
// List of reducers
import toolsReducer from './toolsReducer';
import modalReducer from './modalReducer';
import loginReducer from './loginReducer';
import recentProjectsReducer from './recentProjectsReducer';
import importOnlineReducer from './importOnlineReducer';
import groupMenuReducer from './groupMenuReducer';
import settingsReducer, * as fromSettingsReducer from './settingsReducer';
import loaderReducer from './loaderReducer';
import popoverReducer from './popoverReducer';
import resourcesReducer from './resourcesReducer';
import projectDetailsReducer from './projectDetailsReducer';
import alertModalReducer from './alertModalReducer';
import commentsReducer from './commentsReducer';
import selectionsReducer from './selectionsReducer';
import remindersReducer from './remindersReducer';
import contextIdReducer from './contextIdReducer';
import groupsDataReducer from './groupsDataReducer';
import groupsIndexReducer from './groupsIndexReducer';
import verseEditReducer from './verseEditReducer';
import homeScreenReducer from './homeScreenReducer';
import myProjectsReducer from './myProjectsReducer';
import projectValidationReducer from './projectValidationReducer';
import copyrightCheckReducer from './copyrightCheckReducer';
import projectInformationCheckReducer from './projectInformationCheckReducer';
import mergeConflictReducer from './mergeConflictReducer';
import missingVersesReducer from './missingVersesReducer';
import wordAlignmentReducer from './wordAlignmentReducer';
import localImportReducer from './localImportReducer';
import { localeReducer as locale } from 'react-localize-redux';
import localeSettings, * as fromLocaleSettings from './localeSettingsReducer';
// combining reducers
const rootReducers = combineReducers({
  locale,
  localeSettings,
  toolsReducer,
  modalReducer,
  loginReducer,
  settingsReducer,
  recentProjectsReducer,
  importOnlineReducer,
  groupMenuReducer,
  loaderReducer,
  popoverReducer,
  resourcesReducer,
  projectDetailsReducer,
  alertModalReducer,
  commentsReducer,
  selectionsReducer,
  remindersReducer,
  contextIdReducer,
  groupsDataReducer,
  groupsIndexReducer,
  verseEditReducer,
  homeScreenReducer,
  myProjectsReducer,
  projectValidationReducer,
  copyrightCheckReducer,
  projectInformationCheckReducer,
  mergeConflictReducer,
  missingVersesReducer,
  wordAlignmentReducer,
  localImportReducer
});

export default rootReducers;

// state selectors

/**
 * Retrieves an application setting
 * @param state
 * @param key
 * @return {*}
 */
export const getSetting = (state, key) =>
  fromSettingsReducer.getSetting(state.settingsReducer, key);

/**
 * Returns a list of loaded languages available for the app locale.
 * This is a wrapper around react-localize-redux
 * @param state
 * @return {Language[]}
 */
export const getLocaleLanguages = (state) =>
  fromLocaleSettings.getLanguages(state);

/**
 * Returns the currently active app locale.
 * This is a wrapper around react-localize-redux
 * @param state
 * @return {Language}
 */
export const getActiveLocaleLanguage = (state) =>
  fromLocaleSettings.getActiveLanguage(state);

/**
 * Checks if the locale has finished loading
 * @param state
 * @return {*}
 */
export const getLocaleLoaded = (state) =>
  fromLocaleSettings.getLocaleLoaded(state.localeSettings);

/**
 * Checks if the locale settings screen is open
 * @param state
 * @return {*}
 */
export const getLocaleSettingsOpen = (state) =>
  fromLocaleSettings.getLocaleSettingsOpen(state.localeSettings);
