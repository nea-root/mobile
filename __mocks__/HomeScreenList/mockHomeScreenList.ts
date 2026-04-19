
export type HomeScreenList = {
    section: "CoreOptions" | "Therapists" | "Lawyers"; // Add more sections as needed
    data?: {
        id: number;
        title: string;
        buttonText: string;
        status: string | null;
    }[] | {
        id: number;
        name: string;
        specialty: string;
        profileLink: string;
    }[] | {
        id: number;
        name: string;
        specialty: string;
        profileLink: string;
    }[];
    title?: string;
    description?: string;
}
export const mockHomeScreenList: HomeScreenList[] = [
    {
        section: "CoreOptions",
        data: [
            {
                id: 1,
                title: "I don't need advice. I just want to vent!",
                buttonText: "Chat now",
                status: "Offline"
            },
            {
                id: 2,
                title: "Securely save Evidences: Photos, Videos, Notes",
                buttonText: "Save now",
                status: null
            }
        ]
    },
    {
        section: "Therapists",
        title: "Popular Therapists",
        description: "I need counselling. I want answers",
        data: [
            {
                id: 1,
                name: "Vince Fleming",
                specialty: "Mental health",
                profileLink: "Read more"
            },
            {
                id: 2,
                name: "Nafisa Moulin",
                specialty: "Humanistic therapy",
                profileLink: "Read more"
            },
            {
                id: 3,
                name: "Martha N.",
                specialty: "Mental health",
                profileLink: "Read more"
            }
        ]
    },
    {
        section: "Lawyers",
        title: "Hire a Lawyer",
        description: "I can't handle it anymore. I want legal advice.",
        data: [
            {
                id: 1,
                name: "Denisse Jacob",
                specialty: "Civil rights",
                profileLink: "Read more"
            },
            {
                id: 2,
                name: "Anita Gordan",
                specialty: "Domestic",
                profileLink: "Read more"
            },
            {
                id: 3,
                name: "Linda R.",
                specialty: "Family, Civil Rights",
                profileLink: "Read more"
            }
        ]
    },
];
