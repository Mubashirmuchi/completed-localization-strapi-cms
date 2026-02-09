module.exports = {
  'users-permissions': {
    config: {
      public: {
        // Global content type permissions
        'api::global.global': {
          actions: ['find', 'findOne']
        },
        // Page content type permissions  
        'api::page.page': {
          actions: ['find', 'findOne', 'count']
        }
      }
    }
  }
};
