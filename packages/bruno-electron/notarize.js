require('dotenv').config({ path: process.env.DOTENV_PATH });
const fs = require('fs');
const path = require('path');
const electron_notarize = require('electron-notarize');
const { getWhiteLabel } = require('./white-label.config');

const notarize = async function (params) {
  if (process.platform !== 'darwin') {
    return;
  }

  const whiteLabel = getWhiteLabel();
  const appId = whiteLabel.appId;
  const ascProvider = process.env.APPLE_ASC_PROVIDER;

  let appPath = path.join(params.appOutDir, `${params.packager.appInfo.productFilename}.app`);
  if (!fs.existsSync(appPath)) {
    console.error(`Cannot find application at: ${appPath}`);
    return;
  }

  console.log(`Notarizing ${appId} found at ${appPath} using Apple ID ${process.env.APPLE_ID}`);

  try {
    const notarizeOptions = {
      appBundleId: appId,
      appPath: appPath,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD
    };

    if (ascProvider) {
      notarizeOptions.ascProvider = ascProvider;
    }

    await electron_notarize.notarize(notarizeOptions);
  } catch (error) {
    console.error(error);
  }

  console.log(`Done notarizing ${appId}`);
};

module.exports = notarize;
