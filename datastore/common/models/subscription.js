var app = require('../../server/server');
var debug = require('debug')('strong-gateway:data-store');
var OptimizedData = require('./optimizedData.js');


module.exports = function(Subscriptions) {

  Subscriptions.observe(
    'after save',
    function(ctx, next) {
      debug('supports isNewInstance?', ctx.isNewInstance !== undefined);
      if (ctx.isNewInstance) {
        debug('new subscription received: ',
            JSON.stringify(ctx.instance,null,4));
        OptimizedData.gatherPieces(app, ctx);
      }
      next();
    }
  );
};

