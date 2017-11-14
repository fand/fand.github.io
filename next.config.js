module.exports = {
  webpack(config) {
    // Workaround for build error caused by UglifyJs.
    // See https://github.com/zeit/next.js/issues/1253
    config.plugins = config.plugins.filter(plugin => {
      if (plugin.constructor.name === 'UglifyJsPlugin') {
        return false;
      }
      return true;
    });

    const rulesExceptBabelLoaderRule = config.module.rules.slice(0, -1);
    const babelLoaderRule = config.module.rules.slice(-1)[0];

    return Object.assign({}, config, {
      module: Object.assign({}, config.module, {
        rules: [
          ...rulesExceptBabelLoaderRule,
          {
            test: babelLoaderRule.test,
            include: babelLoaderRule.include,
            exclude: babelLoaderRule.exclude,
            use: [
              'babel-inline-import-loader',
              {
                loader: 'babel-loader',
                options: Object.assign({}, babelLoaderRule.options, {
                  // Disable cacheDirectory so that Babel
                  // always rebuilds dependent modules
                  cacheDirectory: false,
                }),
              },
            ],
          },
        ],
      }),
    });
  },
  exportPathMap() {
    return {
      '/': { page: '/' },
    };
  },
};
