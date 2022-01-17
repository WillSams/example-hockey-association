const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

const routes = { views: importRoutes('./views'), };

module.exports = app => {
  app.get('/', routes.views.index);
  app.get('/terms', routes.views.terms);
  app.get('/privacy', routes.views.privacy);

  app.use((req, res) => { res.status(404).render('errors/404'); });
  app.use((req, res) => { res.status(500).render('errors/500'); });
};
