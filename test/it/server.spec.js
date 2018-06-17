import axios from 'axios';
import {expect} from 'chai';
import {start, app, petriServer} from '../environment';

describe('server', () => {
  start();

  it('should display experiment enabled', async () => {
    petriServer.onConductAllInScope(() => ({'specs.infra.ExampleSpec': 'true'}));
    const page = await axios.get(app.getUrl('/'));
    expect(page.data).to.contain('{"specs.infra.ExampleSpec":"true"}');
  });

  it('should display experiment disabled', async () => {
    petriServer.onConductAllInScope(() => ({'specs.infra.ExampleSpec': 'false'}));
    const page = await axios.get(app.getUrl('/'));
    expect(page.data).to.contain('{"specs.infra.ExampleSpec":"false"}');
  });
});
