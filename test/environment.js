import testkit from '@wix/wix-bootstrap-testkit';
import configEmitter from '@wix/wix-config-emitter';
import petriTestkit from '@wix/wix-petri-testkit';

export const app = bootstrapServer();
export const petriServer = petriTestkit.server({port: 3020});

export const start = function () {
  beforeEach(() => emitConfigs());
  app.beforeAndAfterEach();
  petriServer.beforeAndAfterEach();
};

function emitConfigs() {
  return configEmitter({sourceFolders: ['./templates'], targetFolder: './target/configs'})
    .fn('scripts_domain', 'static.parastorage.com')
    .fn('static_url', 'com.wixpress.fed.fullstack-with-experiments', 'http://localhost:3200/')
    .emit();
}

function bootstrapServer() {
  return testkit.app('./index', {
    env: {
      PORT: 3100,
      MANAGEMENT_PORT: 3104,
      NEW_RELIC_LOG_LEVEL: 'warn',
      DEBUG: ''
    }
  });
}
