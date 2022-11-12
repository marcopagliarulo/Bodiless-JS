const pathUtil = require('path');

exports.createPages = async ({ actions, graphql, getNode }) => {
  const { createPage, deletePage } = actions;

  const templateBasePath = ['.', 'src', 'templates'];
  const dataBasePath = ['.', 'src', 'data'];
  const slug = '/';
  const pageData = {
    path: '/',
    component: pathUtil.resolve(...templateBasePath, '_default.jsx'),
    context: {
      slug,
    },
  };
  createPage(pageData);
};

// customize webpack config in order to exclude certain assets from static build
exports.onCreateWebpackConfig = ({
  stage, actions, plugins
}, pluginOptions) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          './bodiless.index.css': false,
        },
      },
    });

    // Add support for static builds where files ending in '.bl-edit'
    // are replaced for a static counterpart file ending in '.static'.
    // See @bodiless/webpack docs for more info.
    // actions.setWebpackConfig(addStaticReplacementPlugin({}, pluginOptions?.static));
  }
  if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [
        plugins.provide({ process: 'process/browser' }),
      ],
      resolve: {
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          // stream is required for crypto
          stream: require.resolve('stream-browserify'),
          path: require.resolve('path-browserify'),
        },
      },
    });
  }
};
