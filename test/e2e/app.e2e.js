import {petriServer} from '../environment';

describe('fullstack with experiments', () => {
  it('should display experiment enabled', () => {
    petriServer.onConductAllInScope(() => ({'specs.infra.ExampleSpec': 'true'}));
    browser.get('/');
    expect($('#main').getText()).toEqual('experiment enabled!');
  });

  it('should display experiment disabled', () => {
    petriServer.onConductAllInScope(() => ({'specs.infra.ExampleSpec': 'false'}));
    browser.get('/');
    expect($('#main').getText()).toEqual('experiment disabled!');
  });
});
