import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import Markdown from 'react-remarkable';

const LicenseMarkdown = ({
  toggleShowLicenseFile,
  markdownFile,
  translate
}) => {
  return (
    <div style={{ padding: "20px"}}>
      <button className='btn-second' onClick={() => toggleShowLicenseFile()}>
          <Glyphicon glyph="share-alt" style={{transform: "scaleX(-1)"}} />&nbsp;
        {translate('go_back')}
      </button>
      <Markdown options={{ html: true }} source={markdownFile} />
    </div>
  );
};

LicenseMarkdown.propTypes = {
  translate: PropTypes.func.isRequired,
  toggleShowLicenseFile: PropTypes.func.isRequired,
  markdownFile: PropTypes.any
};

export default LicenseMarkdown;
