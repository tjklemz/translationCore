import types from '../actions/ActionTypes';
import * as fromLocale from 'react-localize-redux';
import _ from 'lodash';

const defaultState = {
  open: false,
  loaded: false
};

const localeSettings = (state = defaultState, action) => {
  switch(action.type) {
    case types.SHOW_LOCALE_SCREEN:
      return {
        ...state,
        open: true
      };
    case types.CLOSE_LOCALE_SCREEN:
      return {
        ...state,
        open: false
      };
    case types.LOCALE_LOADED:
      return {
        ...state,
        loaded: true
      };
    default:
      return state;
  }
};

export default localeSettings;

/**
 * This is a wrapper around the library function getLanguages.
 * It passes the correct state key to the library function.
 * @param {object} state the root state object
 * @return {Language[]} a list of languages
 */
export const getLanguages = (state) => {
  let languages = fromLocale.getLanguages(state.locale);
  // TRICKY: we filter out short codes used for equivalence matching
  // because theses will appear to be duplicates (they technically are)
  languages = languages.map((language) => {
    if(language.code.indexOf('_') > -1) {
      return language;
    }
  });
  return _.without(languages, undefined);
};

/**
 * Returns the active language.
 * This is a wrapper around the library function.
 * it passes the correct state key to the function.
 * @param {object} state the root state object
 * @return {Language}
 */
export const getActiveLanguage = (state) => {
  return fromLocale.getActiveLanguage(state.locale);
};

/**
 * Checks if the locale is loaded
 * @param {object} state
 */
export const getLocaleLoaded = (state) => {
  return state.loaded;
};

/**
 * Checks if the locale settings screen is open
 * @param {object} state
 * @return {*}
 */
export const getLocaleSettingsOpen = (state) => {
  return state.open;
};
