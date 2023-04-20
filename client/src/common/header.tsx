"use client";

import { useEffect, useState } from "react";
import MyNavbar from "./navbar";
import { getJwtToken } from "./utils";

function parseJwt(token: string) {
    if (!token) {
        return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}

// TODO merge getEmail and getAdmin
export function getEmail(): string {
    const jwtToken = getJwtToken();
    if (jwtToken == null) {
        return "";
    }
    const data = parseJwt(jwtToken);
    return data?.email ?? "";
}

export function getAdmin(): boolean {
    const jwtToken = getJwtToken();
    if (jwtToken == null) {
        return false;
    }
    const data = parseJwt(jwtToken);
    return data?.isAdmin ?? false;
}

export default function Header() {
    const [email, setEmail] = useState("");
    const [isAdmin, setAdmin] = useState(false);
    useEffect(() => {
        setEmail(getEmail());
    }, []);
    useEffect(() => {
        setAdmin(getAdmin());
    }, []);
    return <MyNavbar email={email} isAdmin={isAdmin}></MyNavbar>;
}
