'use strict';

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Define public routes that should bypass authentication
    const publicRoutes = [
      { method: 'GET', path: /^\/api\/global$/ },
      { method: 'GET', path: /^\/api\/global\/[^\/]+$/ },
      { method: 'GET', path: /^\/api\/pages$/ },
      { method: 'GET', path: /^\/api\/pages\/[^\/]+$/ },
    ];

    // Check if current request matches any public route
    const isPublicRoute = publicRoutes.some(route => {
      return route.method === ctx.method && route.path.test(ctx.path);
    });

    // hjhj

    if (isPublicRoute) {
      // Set authentication context to public role
      ctx.state.auth = {
        strategy: {
          name: 'api-token'
        },
        credentials: {
          id: null,
          type: 'public'
        }
      };
    }

    await next();
  };
};
