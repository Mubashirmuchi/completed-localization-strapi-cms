'use strict';

/**
 * page router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::page.page', {
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: ["api::page.page-populate-middleware"]
    },
    findOne: {
      auth: false,
      policies: [],
      middlewares: ["api::page.page-populate-middleware"]
    },
    count: {
      auth: false,
      policies: [],
      middlewares: []
    }
  }
});
