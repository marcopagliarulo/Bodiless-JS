const fs = require('fs');
const express = require('express');
const { getDisabledPages } = require('@bodiless/components/node-api');

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${activeEnv}`,
});

const SITEURL = process.env.SITE_URL;

const disablePageList = getDisabledPages();
const disabledPages = Object.keys(disablePageList).filter(
  item => disablePageList[item].pageDisabled === true || disablePageList[item].indexingDisabled,
);

// Gatsby plugins list.
const plugins = [
  {
    resolve: '@bodiless/contentful-editor',
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      icon: '../vital-demo/src/images/vitalds-favicon.png',
      legacy: false,
    },
  },
  {
    resolve: 'gatsby-plugin-canonical-urls',
    options: {
      siteUrl: SITEURL,
    },
  },
  {
    resolve: '--vital--',
  },
];

// Gatsby plugins list.
plugins.push({
  resolve: 'gatsby-plugin-typescript',
  options: {
    isTSX: true, // defaults to false
    allExtensions: true, // defaults to false
  },
});

plugins.push('gatsby-plugin-react-helmet');

/**
* Google Fonts plugin.
*/
if (process.env.NODE_ENV === 'development' || process.env.GOOGLE_FONTS_ENABLED === '1') {
  plugins.push({
    resolve: 'gatsby-plugin-google-fonts',
    options: {
      fonts: ['material icons', 'roboto:300,400,500,700'],
    },
  });
}

/**
* css compilation and purging.
*/
const getbuildCSSPlugins = require('@bodiless/gatsby-theme-bodiless/build-css');
const { default: plugin } = require('tailwindcss/plugin');

plugins.push(...getbuildCSSPlugins());

plugins.push('gatsby-plugin-meta-redirect');

module.exports = {
  developMiddleware: app => {
    app.use('/___docs', express.static('doc', { fallthrough: false }));
  },
  siteMetadata: {
    siteUrl: SITEURL,
  },
  flags: {
    DEV_SSR: false,
  },
  pathPrefix: process.env.GATSBY_PATH_PREFIX || '',
  plugins,
};
