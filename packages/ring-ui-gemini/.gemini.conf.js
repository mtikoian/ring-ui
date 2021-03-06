const hostname = require('os').hostname();
const rootUrl = `http://${hostname}:9999/examples/`;

const gridUrl = process.env.SELENIUM_GRID || 'http://ondemand.saucelabs.com/wd/hub';
// Supports Firefox
const windowSize = '1024x1000';
const WIN10 = 'Windows 10';

console.log('Docsite url detected:', rootUrl);
console.log('Grid at:', gridUrl);

module.exports = {
  rootUrl,
  gridUrl,
  retry: 2,
  suitesPerSession: 100, // workaround for Gemini bug
  system: {
    plugins: {
      teamcity: process.argv.indexOf('--teamcity') !== -1,
      sauce: {
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        logfile: 'saucelabs-session.log'
      }
    },
    projectRoot: __dirname
  },
  // See all platforms here https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
  browsers: {
    chrome: {
      windowSize,
      desiredCapabilities: {
        browserName: 'chrome',
        version: '60.0',
        platform: WIN10
      }
    },
    firefox: {
      windowSize,
      desiredCapabilities: {
        browserName: 'firefox',
        version: '42.0',
        platform: WIN10
      }
    },
    ie: {
      windowSize,
      desiredCapabilities: {
        browserName: 'internet explorer',
        version: '11.0',
        platform: 'Windows 7'
      }
    },
    edge: {
      windowSize,
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
        version: '14.14393',
        platform: WIN10
      }
    }
  }
};
