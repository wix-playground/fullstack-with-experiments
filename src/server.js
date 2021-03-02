import 'regenerator-runtime/runtime';
import wixRenderer from '@wix/wix-renderer';
import wixRunMode from '@wix/wix-run-mode';
import wixExpressRenderingModel from '@wix/wix-express-rendering-model';

module.exports = (app, context) => {
  const config = context.config.load('fullstack-with-experiments');
  const petri = aspects => context.petri.client(aspects);

  async function loadExperiments(aspects) {
    if (process.env.NODE_ENV === 'development') {
      //this is the value used during `npm start`
      return {'specs.infra.ExampleSpec': 'true'};
    } else {
      return petri(aspects).conductAllInScope('infra-examples');
    }
  }

  app.get('/', async (req, res) => {
    const experiments = JSON.stringify(await loadExperiments(req.aspects));
    const data = {title: 'fullstack with experiments', experiments};
    const templatePath = './src/index.ejs';

    const renderModel = await wixExpressRenderingModel.generate(req, config);
    const html = await wixRenderer.render(templatePath, renderModel, data, wixRunMode.isProduction());
    res.send(html);
  });

  return app;
};
