import 'describe-jsdom';
import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import App from '../../src/App';
import {ExperimentsProvider} from 'wix-experiments-react';

describe.jsdom('app', () => {
  function render(experiments) {
    return mount(
      <ExperimentsProvider options={{experiments}}>
        <App/>
      </ExperimentsProvider>,
    );
  }

  it('should display experiment enabled', () => {
    const element = render({'specs.infra.ExampleSpec': 'true'});
    expect(element.text()).to.equal('experiment enabled!');
  });

  it('should display experiment disabled', () => {
    const element = render({'specs.infra.ExampleSpec': 'false'});
    expect(element.text()).to.equal('experiment disabled!');
  });
});
