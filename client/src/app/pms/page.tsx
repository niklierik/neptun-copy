"use client";

import dynamic from "next/dynamic";
import Header from "@/common/header";
import { SearchUsers } from "./search-users";
import { ListUsers } from "./list-users";
import { Messages } from "./messages";
import { useState } from "react";

export function Mails() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    return (
        <main suppressHydrationWarning={true}>
            <Header></Header>

            <SearchUsers
                email={email}
                name={name}
                setName={setName}
                setEmail={setEmail}
            ></SearchUsers>
            <div className="flex_container_mail" suppressHydrationWarning>
                <ListUsers name={name} email={email}></ListUsers>
                <Messages></Messages>
            </div>
        </main>
    );
}

export default function MailsPage() {
    return <>{window ? <Mails></Mails> : <></>}</>;
}
