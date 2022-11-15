import pathUtil from 'path';
import { createClient } from 'contentful';
import Logger from '@bodiless/gatsby-theme-bodiless/Logger';
import { ContentfulClientDataRetriever } from './lib/Static/ContentfulClientDataRetriever';

export const pluginOptionsSchema = ({ Joi }) => Joi.object({
  stage: Joi.string()
    .default('edit')
    .description('The stage where the plugin is used, edit for usage within contentful, static for the static file.'),
});

export const createPages = async ({ actions, pluginOptions }) => {
  const { createPage } = actions;

  if (pluginOptions === 'edit') {
    const templateBasePath = ['.', 'src', 'templates'];
    const slug = '/';
    const pageData = {
      path: '/',
      component: pathUtil.resolve(...templateBasePath, '_default.jsx'),
      context: {
        slug,
      },
    };
    createPage(pageData);
    return;
  }

  const logger = new Logger('gatsby');

  const client = createClient({
    space: process.env.BODILESS_CONTENTFUL_SPACE_ID,
    accessToken: process.env.BODILESS_CONTENTFUL_ACCESS_TOKEN
  });

  const pages = await client.getEntries({
    content_type: 'page',
  });

  // eslint-disable-next-line no-plusplus
  for (let i =0; i < pages.total; i++) {
    const templateBasePath = ['.', 'src', 'templates'];
    const { path: slug, template } = pages.items[i].fields;
    // eslint-disable-next-line no-await-in-loop
    const data = await ContentfulClientDataRetriever(client, slug);

    const pageData = {
      path: slug,
      component: pathUtil.resolve(...templateBasePath, `${template}.jsx`),
      context: {
        slug,
        template,
        subPageTemplate: '',
        data: Object.fromEntries(data)
      },
    };
    try {
      logger.log('Creating page ', slug, pageData.path, pageData.component);
      createPage(pageData);
    } catch (exception) {
      logger.warn(`Error trying to create ${pageData.path}`, exception);
    }
  }
  pages.items.forEach(async item => {
  });
};

// customize webpack config in order to exclude certain assets from static build
export const onCreateWebpackConfig = ({
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
