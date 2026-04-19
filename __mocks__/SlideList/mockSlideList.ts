import { UserFlowTypes } from '@/Navigators/utils';
import { ImageSourcePropType } from 'react-native';

export type SlideList = {
    id: number,
    heading: string,
    subheading: string,
    image:  ImageSourcePropType,
    flowType: string
}

export const mockSlideList: SlideList[] = [
    {
        id: 1,
        heading: 'Live Chat',
        subheading: 'Be Anonymous! Talk your heart out with our Volunteers who won\'t judge you.',
        image: require('@/Assets/images/survivor/live-chat.png'),
        flowType: UserFlowTypes.victim,
    },
    {
        id: 2,
        heading: 'Save Evidence',
        subheading: 'Save Proofs of Abuse/Evidence here safely. You might want to use them later!',
        image: require('@/Assets/images/survivor/save-evidence.png'),
        flowType: UserFlowTypes.victim,
    },
    {
        id: 3,
        heading: 'Get Help and Support',
        subheading: 'Connect with our Lawyer and Counsellors to get help or read up on our Self-help content.',
        image: require('@/Assets/images/survivor/get-help-and-support.png'),
        flowType: UserFlowTypes.victim,
    },
    {
        id: 4,
        heading: 'Start Volunteering',
        subheading: 'Lend a listening ear. Support survivors anonymously through safe, judgment-free conversations.',
        image: require('@/Assets/images/survivor/live-chat.png'),
        flowType: UserFlowTypes.volunteer,
    },
    {
        id: 5,
        heading: 'Make a Difference',
        subheading: 'Your time and empathy can change someone\'s life. Help survivors feel heard and supported.',
        image: require('@/Assets/images/survivor/get-help-and-support.png'),
        flowType: UserFlowTypes.volunteer,
    },
    {
        id: 6,
        heading: 'Track Your Impact',
        subheading: 'See how many people you\'ve helped and track your volunteering hours and earnings.',
        image: require('@/Assets/images/survivor/save-evidence.png'),
        flowType: UserFlowTypes.volunteer,
    },
    {
        id: 7,
        heading: 'Offer Legal Aid',
        subheading: 'Connect with domestic violence survivors who need legal guidance and support.',
        image: require('@/Assets/images/survivor/get-help-and-support.png'),
        flowType: UserFlowTypes.lawyer,
    },
    {
        id: 8,
        heading: 'Review Cases',
        subheading: 'Review client cases and evidence securely through our platform.',
        image: require('@/Assets/images/survivor/save-evidence.png'),
        flowType: UserFlowTypes.lawyer,
    },
    {
        id: 9,
        heading: 'Build Your Profile',
        subheading: 'Showcase your expertise and availability to connect with clients who need your help.',
        image: require('@/Assets/images/survivor/get-help-and-support.png'),
        flowType: UserFlowTypes.lawyer,
    },
    {
        id: 10,
        heading: 'Offer Counseling',
        subheading: 'Provide professional counseling support to survivors of domestic violence.',
        image: require('@/Assets/images/survivor/get-help-and-support.png'),
        flowType: UserFlowTypes.therapist,
    },
    {
        id: 11,
        heading: 'Manage Sessions',
        subheading: 'Schedule and manage therapy sessions with clients through our secure platform.',
        image: require('@/Assets/images/survivor/save-evidence.png'),
        flowType: UserFlowTypes.therapist,
    },
    {
        id: 12,
        heading: 'Build Your Practice',
        subheading: 'Expand your reach and help more survivors while managing your schedule and earnings.',
        image: require('@/Assets/images/survivor/get-help-and-support.png'),
        flowType: UserFlowTypes.therapist,
    },
];
