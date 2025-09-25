"use client";

import { createContext, useContext, ReactNode } from "react";
import {User as PrismaUser} from "@prisma/client";

export type User = PrismaUser;

const UserContext = createContext<User | null>(null);

export const UserProvider = ({user, children}: {user: User | null, children: ReactNode}) => {
    return(
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);