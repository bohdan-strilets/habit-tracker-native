const { getDefaultConfig } = require('expo/metro-config');

/**
 * @gorhom/bottom-sheet sets package.json "react-native" to source TS entry.
 * Metro then fails to resolve extensionless imports to .tsx hooks (e.g.
 * useGestureEventsHandlersDefault). Use the prebuilt lib/module bundle instead.
 */
const projectRoot = __dirname;

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === '@gorhom/bottom-sheet') {
    return {
      filePath: require.resolve('@gorhom/bottom-sheet/lib/module/index.js', {
        paths: [projectRoot],
      }),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
