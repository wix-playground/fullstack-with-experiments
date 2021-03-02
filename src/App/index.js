import React from 'react';
import PropTypes from 'prop-types';
import {withExperiments} from '@wix/wix-experiments-react';

const App = props => {
  if (props.experiments.enabled('specs.infra.ExampleSpec')) {
    return <div id="main">experiment enabled!</div>;
  } else {
    return <div id="main">experiment disabled!</div>;
  }
};

App.propTypes = {
  experiments: PropTypes.any
};

export default withExperiments(App);
