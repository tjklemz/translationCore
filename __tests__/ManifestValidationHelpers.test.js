/* eslint-env jest */
/* eslint-disable no-console */
'use strict';

jest.mock('fs-extra');
import fs from 'fs-extra';
import path from 'path';
//helpers
import * as ManifestValidationHelpers from '../src/js/helpers/ProjectValidation/ManifestValidationHelpers';
const MANIFEST_EXISTS_PATH = path.join('path', 'to', 'project', 'where', 'manifest', 'exists');
const MANIFEST_NOT_EXISTS_PATH = path.join('path', 'to', 'project', 'where', 'manifest', 'doesnt', 'exists');
beforeEach(() => {
  fs.__setMockFS({
    [MANIFEST_EXISTS_PATH]: [],
    [path.join(MANIFEST_EXISTS_PATH, 'manifest.json')]: []
  });
});

describe('ManifestValidationHelpers.manifestExists', () => {
  test('should return that the manifest exists', async () => {
    console.log(MANIFEST_EXISTS_PATH);
    let result = await ManifestValidationHelpers.manifestExists(MANIFEST_EXISTS_PATH);
    expect(result).toBeTruthy();
  });
  test('should return that the manifest does not exists', async () => {
    try {
      await ManifestValidationHelpers.manifestExists(MANIFEST_NOT_EXISTS_PATH);
    }
    catch (e) {
      expect(e).toBe('Unable to find the manifest for project '+path.basename(MANIFEST_NOT_EXISTS_PATH)+'. It will not be loaded.');
    }
  });
});