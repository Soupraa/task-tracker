module.exports = {
    // Use static export
    output: 'export',
    // Add basePath if you're building for production
    basePath: process.env.NODE_ENV === 'production' ? '/out' : '',
  }