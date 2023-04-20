"use client";

import Header from "@/common/header";
import { SearchUsers } from "./search-users";
import { ListUsers } from "./list-users";
import { Messages } from "./messages";
import { useState } from "react";

export default function Mails() {
    if (typeof window === "undefined") {
        return <></>;
    }
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    return (
        <main>
            <Header></Header>

            <SearchUsers
                email={email}
                name={name}
                setName={setName}
                setEmail={setEmail}
            ></SearchUsers>
            <div className="flex_container_mail">
                <ListUsers name={name} email={email}></ListUsers>
                <Messages></Messages>
            </div>
        </main>
    );
}
