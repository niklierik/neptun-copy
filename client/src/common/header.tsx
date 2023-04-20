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

export function getEmail(): string {
    const jwtToken = getJwtToken();
    if (jwtToken == null) {
        return "";
    }
    const data = parseJwt(jwtToken);
    return data?.email ?? "";
}

export default function Header() {
    const [email, setEmail] = useState("");
    useEffect(() => {
        setEmail(getEmail());
    }, []);
    return <MyNavbar email={email}></MyNavbar>;
}
