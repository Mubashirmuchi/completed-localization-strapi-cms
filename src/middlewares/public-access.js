'use strict';

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Bypass authentication for public content types
    const publicRoutes = [
      '/api/global',
      '/api/pages',
      '/api/pages/:id'
    ];
    
    const isPublicRoute = publicRoutes.some(route => {
      const regex = new RegExp(route.replace(':id', '[^/]+'));
      return regex.test(ctx.path);
    });

    if (isPublicRoute) {
      // Set public role for these routes
      ctx.state.auth = {
        strategy: 'public',
        credentials: {
          id: null,
          type: 'public'
        }
      };
    }

    await next();
  };
};
