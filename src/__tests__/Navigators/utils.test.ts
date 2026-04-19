import {
  Tabs,
  RootStacks,
  UserStacks,
  AuthStacks,
  UserFlowTypes,
  MainStacks,
} from '@/Navigators/utils';

describe('Tabs enum', () => {
  it('has correct Home value', () => expect(Tabs.Home).toBe('Home'));
  it('has correct Evidence value', () =>
    expect(Tabs.Evidence).toBe('Evidence'));
  it('has correct Awareness value', () =>
    expect(Tabs.Awareness).toBe('Awareness'));
  it('has correct Help value', () => expect(Tabs.Help).toBe('Help'));
  it('has correct Appointments value', () =>
    expect(Tabs.Appointments).toBe('Appointments'));
  it('has correct Messages value', () =>
    expect(Tabs.Messages).toBe('Messages'));
  it('has correct Clients value', () => expect(Tabs.Clients).toBe('Clients'));
});

describe('RootStacks enum', () => {
  it('has correct OnBoarding value', () =>
    expect(RootStacks.OnBoarding).toBe('OnBoardingStack'));
  it('has correct Walkthrough value', () =>
    expect(RootStacks.Walkthrough).toBe('WalkthroughStack'));
});

describe('UserStacks enum', () => {
  it('has correct Walkthrough value', () =>
    expect(UserStacks.Walkthrough).toBe('Walkthrough'));
  it('has correct AuthStack value', () =>
    expect(UserStacks.AuthStack).toBe('AuthStack'));
});

describe('AuthStacks enum', () => {
  it('has correct Register value', () =>
    expect(AuthStacks.Register).toBe('Register'));
  it('has correct Login value', () => expect(AuthStacks.Login).toBe('Login'));
  it('has correct Verification value', () =>
    expect(AuthStacks.Verification).toBe('Verification'));
  it('has correct Reset value', () => expect(AuthStacks.Reset).toBe('Reset'));
  it('has correct ResetVerification value', () =>
    expect(AuthStacks.ResetVerification).toBe('ResetVerification'));
  it('has correct ResetPassword value', () =>
    expect(AuthStacks.ResetPassword).toBe('ResetPassword'));
});

describe('UserFlowTypes enum', () => {
  it('has correct victim value', () =>
    expect(UserFlowTypes.victim).toBe('victim'));
  it('has correct volunteer value', () =>
    expect(UserFlowTypes.volunteer).toBe('volunteer'));
  it('has correct lawyer value', () =>
    expect(UserFlowTypes.lawyer).toBe('lawyer'));
  it('has correct therapist value', () =>
    expect(UserFlowTypes.therapist).toBe('therapist'));
  it('defines all 4 roles', () => {
    const values = Object.values(UserFlowTypes);
    expect(values).toHaveLength(4);
    expect(values).toContain('victim');
    expect(values).toContain('volunteer');
    expect(values).toContain('lawyer');
    expect(values).toContain('therapist');
  });
});

describe('MainStacks enum', () => {
  it('has correct TabStack value', () =>
    expect(MainStacks.TabStack).toBe('TabStack'));
  it('has correct ChatScreen value', () =>
    expect(MainStacks.ChatScreen).toBe('ChatScreen'));
});
