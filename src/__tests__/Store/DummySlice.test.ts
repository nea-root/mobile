import reducer, {
  changeNames,
  initialState,
  DummyState,
} from '@/Store/Slices/DummySlice';

describe('DummySlice reducer', () => {
  it('returns the initial state when called with undefined', () => {
    expect(reducer(undefined, {type: '@@INIT'})).toEqual(initialState);
  });

  it('initialState has null firstName and lastName', () => {
    expect(initialState.firstName).toBeNull();
    expect(initialState.lastName).toBeNull();
  });

  it('changeNames updates firstName', () => {
    const state = reducer(initialState, changeNames({firstName: 'Alice'}));
    expect(state.firstName).toBe('Alice');
    expect(state.lastName).toBeNull();
  });

  it('changeNames updates lastName', () => {
    const state = reducer(initialState, changeNames({lastName: 'Smith'}));
    expect(state.lastName).toBe('Smith');
    expect(state.firstName).toBeNull();
  });

  it('changeNames updates both firstName and lastName', () => {
    const state = reducer(
      initialState,
      changeNames({firstName: 'Alice', lastName: 'Smith'}),
    );
    expect(state.firstName).toBe('Alice');
    expect(state.lastName).toBe('Smith');
  });

  it('changeNames does not update when values are undefined', () => {
    const existing: DummyState = {firstName: 'Bob', lastName: 'Jones'};
    const state = reducer(existing, changeNames({}));
    expect(state.firstName).toBe('Bob');
    expect(state.lastName).toBe('Jones');
  });

  it('changeNames preserves existing state when only one field given', () => {
    const existing: DummyState = {firstName: 'Bob', lastName: 'Jones'};
    const state = reducer(existing, changeNames({firstName: 'Charlie'}));
    expect(state.firstName).toBe('Charlie');
    expect(state.lastName).toBe('Jones');
  });

  it('changeNames can set firstName to null explicitly', () => {
    const existing: DummyState = {firstName: 'Bob', lastName: 'Jones'};
    const state = reducer(existing, changeNames({firstName: null}));
    expect(state.firstName).toBeNull();
    expect(state.lastName).toBe('Jones');
  });
});

describe('changeNames action creator', () => {
  it('creates correct action type', () => {
    const action = changeNames({firstName: 'Alice'});
    expect(action.type).toBe('dummySlice/changeNames');
  });

  it('includes payload', () => {
    const action = changeNames({firstName: 'Alice', lastName: 'Smith'});
    expect(action.payload).toEqual({firstName: 'Alice', lastName: 'Smith'});
  });
});
