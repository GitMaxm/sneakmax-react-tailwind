import { createContext, useContext } from "react";
import type RootStore from "../stores/RootStore";

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStores = () => {

    const context = useContext(RootStoreContext)

    if (context === null) {
        throw new Error(
            "useStores must be used within a RootStoreContext"
        )
    }

    return context
}