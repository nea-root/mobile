module.exports = {
  preset: 'react-native',
  setupFilesAfterFramework: [],
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-paper|react-native-reanimated|react-native-linear-gradient|@react-native-community|react-native-vector-icons|react-native-gifted-chat|react-native-keychain|react-native-biometrics|react-native-svg|react-native-safe-area-context|react-native-screens|@reduxjs/toolkit|redux-persist|react-redux)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@Mock/(.*)$': '<rootDir>/__mocks__/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/Theme/**',
    '!src/Data/**',
    '!src/Hooks/**',
    '!src/Assets/**',
    '!src/Context/Types/**',
    '!src/Navigators/Application.tsx',
    '!src/Navigators/utils.ts',
    '!src/CognitoConfig/**',
    '!src/App.tsx',
    '!src/Store/index.ts',
    '!src/Components/NEAChat/NEAChat.tsx',
    '!src/Components/Animations/SplashAnimation.tsx',
    '!src/Components/SplashScreen/SplashScreen.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
