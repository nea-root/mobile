import { UserFlowTypes } from "@/Navigators/utils"
import { ImageSourcePropType } from "react-native"

export type SlideList = { 
    id: number, 
    heading: string, 
    subheading: string,
    image:  ImageSourcePropType, 
    flowType: string 
}

export const mockSlideList: SlideList[] = [
    { id: 1, heading: '', subheading: '',image: require("@/Assets/images/survivor/get-help-and-support.png") , flowType: UserFlowTypes.victim },
    { id: 2, heading: '', subheading: '',image: require("@/Assets/images/survivor/live-chat.png"), flowType: UserFlowTypes.victim },
    { id: 3, heading: '', subheading: '',image: require("@/Assets/images/survivor/save-evidence.png"), flowType: UserFlowTypes.victim },
    { id: 4, heading: '', subheading: '',image: require("@/Assets/images/survivor/get-help-and-support.png") , flowType: UserFlowTypes.volunteer },
    { id: 5, heading: '', subheading: '',image: require("@/Assets/images/survivor/save-evidence.png"), flowType: UserFlowTypes.lawyer },
    { id: 6, heading: '', subheading: '',image: require("@/Assets/images/survivor/save-evidence.png"), flowType: UserFlowTypes.lawyer },
    { id: 7, heading: '', subheading: '',image: require("@/Assets/images/survivor/get-help-and-support.png") , flowType: UserFlowTypes.lawyer },
    { id: 8, heading: '', subheading: '',image: require("@/Assets/images/survivor/save-evidence.png"), flowType: UserFlowTypes.therapist },
    { id: 9, heading: '', subheading: '',image: require("@/Assets/images/survivor/save-evidence.png"), flowType: UserFlowTypes.therapist },
    { id: 10, heading: '', subheading: '',image: require("@/Assets/images/survivor/get-help-and-support.png") , flowType: UserFlowTypes.therapist },
  ]