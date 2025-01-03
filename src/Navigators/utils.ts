/** *
 * List of all Tabs in the app
 */
export enum Tabs {
    Home = 'Home',
    Evidence = 'Evidence',
    Awareness = 'Awareness',
    Help = 'Help',
    Appointments = 'Appointments',
    Messages = 'Messages',
    Clients = 'Clients'
}

export enum RootStacks {
    OnBoarding = 'OnBoardingStack',
    Walkthrough = 'WalkthroughStack',
}

export enum UserStacks {
    Walkthrough = 'Walkthrough',
    AuthStack = 'AuthStack'
}

export enum AuthStacks {
    Register = 'Register',
    Login = 'Login',
    Verification = 'Verification',
    Reset = 'Reset',
    ResetVerification = 'ResetVerification',
    ResetPassword = 'ResetPassword'
}


export enum UserFlowTypes {
    victim = 'victim',
    volunteer = 'volunteer',
    lawyer = 'lawyer',
    therapist = 'therapist'
}