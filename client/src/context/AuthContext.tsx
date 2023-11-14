'use client'
import React, { createContext, useState, useEffect, useContext } from "react";

interface User {
    id: string;
    username: string;
    email: string;
    picture: string|null;
}

interface AuthContextProps {
    user: User | null;
    login: (user: { id: string; email: any; picture: any; username: any }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// @ts-ignore
export const AuthProvider: React.FC = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
