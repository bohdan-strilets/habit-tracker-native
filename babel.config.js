module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@assets': './src/assets',
            '@components': './src/components',
            '@constants': './src/constants',
            '@domain': './src/domain',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@store': './src/store',
            '@theme': './src/theme',
            '@utils': './src/utils',
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
