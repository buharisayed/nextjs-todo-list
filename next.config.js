// next.config.js

module.exports = {
    async rewrites() {
      return [
        // Rewrite API DELETE requests with query parameter
        {
          source: '/api/todos/:id',
          destination: '/api/todos?_id=:id',
        },
      ];
    },
  };
  