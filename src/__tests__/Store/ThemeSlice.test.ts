import reducer, {
  changeTheme,
  setDefaultTheme,
  initialState,
  ThemeState,
} from '@/Store/Theme/index';

describe('ThemeSlice reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {type: '@@INIT'})).toEqual(initialState);
  });

  it('initial theme is "dapp"', () => {
    expect(initialState.theme).toBe('dapp');
  });

  it('initial darkMode is null', () => {
    expect(initialState.darkMode).toBeNull();
  });

  describe('changeTheme', () => {
    it('changes theme', () => {
      const state = reducer(initialState, changeTheme({theme: 'default'}));
      expect(state.theme).toBe('default');
    });

    it('changes darkMode to true', () => {
      const state = reducer(initialState, changeTheme({darkMode: true}));
      expect(state.darkMode).toBe(true);
    });

    it('changes darkMode to false', () => {
      const state = reducer(initialState, changeTheme({darkMode: false}));
      expect(state.darkMode).toBe(false);
    });

    it('changes both theme and darkMode', () => {
      const state = reducer(
        initialState,
        changeTheme({theme: 'default', darkMode: true}),
      );
      expect(state.theme).toBe('default');
      expect(state.darkMode).toBe(true);
    });

    it('does not change undefined fields', () => {
      const state = reducer(initialState, changeTheme({}));
      expect(state.theme).toBe(initialState.theme);
      expect(state.darkMode).toBe(initialState.darkMode);
    });
  });

  describe('setDefaultTheme', () => {
    it('sets theme when current theme is falsy', () => {
      const emptyState: ThemeState = {theme: '' as any, darkMode: null};
      const state = reducer(emptyState, setDefaultTheme({theme: 'default'}));
      expect(state.theme).toBe('default');
    });

    it('does NOT override existing theme', () => {
      const existing: ThemeState = {theme: 'dapp', darkMode: null};
      const state = reducer(existing, setDefaultTheme({theme: 'default'}));
      expect(state.theme).toBe('dapp');
    });

    it('sets darkMode when theme is not set', () => {
      const emptyState: ThemeState = {theme: '' as any, darkMode: null};
      const state = reducer(emptyState, setDefaultTheme({darkMode: true}));
      expect(state.darkMode).toBe(true);
    });

    it('does NOT override darkMode when theme already set', () => {
      const existing: ThemeState = {theme: 'dapp', darkMode: false};
      const state = reducer(existing, setDefaultTheme({darkMode: true}));
      expect(state.darkMode).toBe(false);
    });
  });
});

describe('action creators', () => {
  it('changeTheme action has correct type', () => {
    expect(changeTheme({}).type).toBe('theme/changeTheme');
  });

  it('setDefaultTheme action has correct type', () => {
    expect(setDefaultTheme({}).type).toBe('theme/setDefaultTheme');
  });

  it('changeTheme includes payload', () => {
    expect(changeTheme({theme: 'default'}).payload).toEqual({theme: 'default'});
  });
});
