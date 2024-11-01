const presets = ['module:@react-native/babel-preset']
const plugins = []

plugins.push(
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.js', '.ts', '.tsx', '.json'],
      alias: {
        '@': './src',
        '@Mock': './__mocks__',
      },
    },
  ],
  '@babel/plugin-proposal-export-namespace-from',
)

module.exports = {
  presets,
  plugins
};
