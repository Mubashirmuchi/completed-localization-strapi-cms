'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // Set public permissions for global and page content types
    const setPublicPermissions = async () => {
      try {
        // Get the public role
        const publicRole = await strapi.entityService.findOne(
          'plugin::users-permissions.role',
          1, // Public role typically has ID 1
          {
            fields: ['id', 'name', 'type']
          }
        );

        if (publicRole && publicRole.type === 'public') {
          // Define the permissions we want to grant
          const permissionsToCreate = [
            // Global permissions
            {
              action: 'api::global.global.find',
              subject: 'api::global.global',
              role: publicRole.id,
              properties: {},
              conditions: []
            },
            {
              action: 'api::global.global.findOne',
              subject: 'api::global.global',
              role: publicRole.id,
              properties: {},
              conditions: []
            },
            // Page permissions
            {
              action: 'api::page.page.find',
              subject: 'api::page.page',
              role: publicRole.id,
              properties: {},
              conditions: []
            },
            {
              action: 'api::page.page.findOne',
              subject: 'api::page.page',
              role: publicRole.id,
              properties: {},
              conditions: []
            },
            {
              action: 'api::page.page.count',
              subject: 'api::page.page',
              role: publicRole.id,
              properties: {},
              conditions: []
            }
          ];

          // Create each permission
          for (const permissionData of permissionsToCreate) {
            try {
              await strapi.entityService.create(
                'plugin::users-permissions.permission',
                {
                  data: permissionData
                }
              );
            } catch (error) {
              // Permission might already exist, which is fine
              if (!error.message.includes('already exists')) {
                console.warn('Permission creation warning:', error.message);
              }
            }
          }

          console.log('✅ Public permissions configured for global and page content types');
        } else {
          console.warn('Public role not found');
        }
      } catch (error) {
        console.error('Error setting public permissions:', error);
      }
    };

    // Run after Strapi is fully initialized
    setTimeout(setPublicPermissions, 5000);
  },
};
