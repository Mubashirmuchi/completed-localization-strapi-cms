// "use strict";

// /**
//  * `page-populate-middleware` middleware
//  */

// const populate = {
//   contentSections: {
//     populate: {
//       picture: {
//         fields: ["url", "alternativeText", "caption", "width", "height"],
//       },
//       buttons: {
//         populate: true,
//       },
//       button: {
//         populate: true,
//       },
//       feature: {
//         populate: {
//           fields: ["title", "description", "showLink", "newTab", "url", "text"],
//           media: {
//             fields: ["url", "alternativeText", "caption", "width", "height"],
//           },
//         },
//       },
//       testimonials: {
//         populate: {
//           picture: {
//             fields: ["url", "alternativeText", "caption", "width", "height"],
//           },
//         },
//       },
//       plans: {
//         populate: ["product_features"],
//       },
//       submitButton: {
//         populate: true,
//       },
//       poster: {
//         fields: ["url", "alternativeText", "caption", "width", "height"],
//       },
//       video: {
//         fields: ["url", "alternativeText", "caption", "width", "height"],
//       },
//       services: {
//         fields: ["title", "description", "iconName"],
//       },
//     },
//   },
//   seo: {
//     populate: true,
//   }
// };

// module.exports = (config, { strapi }) => {

//   return async (ctx, next) => {
//     const slug = ctx.query?.filters?.slug;
    
//     ctx.query = {
//       populate,
//       ...(slug && { filters: { slug } }),
//       locale: ctx.query?.locale,
//     };

//     console.log("page-populate-middleware.js: ctx.query = ", ctx.query);

//     await next();
//   };
// };


// "use strict";

// /**
//  * `page-populate-middleware` middleware
//  */

// const populate = {
//   contentSections: {
//     populate: '*'  // ✅ Use '*' for dynamic zones in Strapi v5
//   },
//   seo: {
//     populate: '*'  // ✅ Use '*' instead of true
//   }
// };

// module.exports = (config, { strapi }) => {
//   return async (ctx, next) => {
//     const slug = ctx.query?.filters?.slug;
    
//     ctx.query = {
//       populate,
//       ...(slug && { filters: { slug } }),
//       locale: ctx.query?.locale,
//     };

//     console.log("page-populate-middleware.js: ctx.query = ", ctx.query);

//     await next();
//   };
// };

// "use strict";

// /**
//  * `page-populate-middleware` middleware
//  */

// const populate = {
//   contentSections: {
//     on: {
//       // For each component type in your dynamic zone, use '*'
//       'sections.hero': { populate: '*' },
//       'sections.features': { populate: '*' },
//       'sections.testimonials': { populate: '*' },
//       'sections.pricing': { populate: '*' },
//       'sections.video': { populate: '*' },
//       // Or use wildcard to populate all component types
//       '*': { populate: '*' }
//     }
//   },
//   seo: {
//     populate: '*'
//   }
// };

// module.exports = (config, { strapi }) => {
//   return async (ctx, next) => {
//     const slug = ctx.query?.filters?.slug;
    
//     ctx.query = {
//       populate,
//       ...(slug && { filters: { slug } }),
//       locale: ctx.query?.locale,
//     };

//     console.log("page-populate-middleware.js: ctx.query = ", ctx.query);

//     await next();
//   };
// };

"use strict";

/**
 * `page-populate-middleware` middleware
 */

const populate = {
  contentSections: {
    populate: '*'  // ✅ This is the correct syntax for dynamic zones
  },
  seo: {
    populate: '*'
  }
};

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const slug = ctx.query?.filters?.slug;
    
    ctx.query = {
      populate,  // ✅ Use the populate object, not 'deep'
      ...(slug && { filters: { slug } }),
      locale: ctx.query?.locale,
    };

    console.log("page-populate-middleware.js: ctx.query = ", ctx.query);

    await next();
  };
};