import { createContext, useContext, useState, type ReactNode } from "react";
import { mockprofile } from "./profile/mockprofile";

interface Visit {
    id: string;
    date: string;
    name: string;
    district: string;
    category: string;
    description: string;
    image: string;
    photos: number;
}

interface VisitContextType {
    visits: Visit[];
    addVisit: (visit: Omit<Visit, "id">) => void;
    xp: number;
    showXpReward: boolean;
}

const VisitContext = createContext<VisitContextType | undefined>(undefined);

interface VisitProviderProps {
    children: ReactNode;
}

export function VisitProvider({ children }: VisitProviderProps) {

    const [visits, setVisits] = useState<Visit[]>(
        mockprofile.visits.map((visit, index) => ({

            id: `${visit.name}-${index}`,

            date: visit.date,

            name: visit.name,

            district: visit.district,

            category: visit.category,

            description: visit.description,

            image: visit.image,

            photos: visit.photos

        }))
    );


    const [xp, setXp] = useState(
        mockprofile.statistics.xp
    );


    const [showXpReward, setShowXpReward] = useState(false);


    function addVisit(visit: Omit<Visit, "id">) {

        const newVisit: Visit = {

            ...visit,

            id: `${visit.name}-${Date.now()}`

        };


        setVisits((prev) => [
            ...prev,
            newVisit
        ]);


        setXp((prev) => prev + 20);


        setShowXpReward(true);


        setTimeout(() => {

            setShowXpReward(false);

        }, 2000);

    }


    return (

        <VisitContext.Provider
            value={{
                visits,
                addVisit,
                xp,
                showXpReward
            }}
        >

            {children}

        </VisitContext.Provider>

    );

}


export function useVisits() {

    const context = useContext(VisitContext);


    if (!context) {

        throw new Error(
            "useVisits must be used inside VisitProvider"
        );

    }


    return context;

}