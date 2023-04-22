"use client";

import dynamic from "next/dynamic";
import Header, { getEmail } from "@/common/header";
import { SearchUsers } from "./search-users";
import { ListUsers } from "./list-users";
import { Messages } from "./messages";
import { useEffect, useState } from "react";
import { User } from "@/common/models/user";
import { UsersService } from "@/common/services/users.service";

export interface MailsProps {
    searchParams: {
        with: string;
    };
}

export function Mails({ searchParams }: MailsProps) {
    let { with: other } = searchParams;
    other ??= getEmail();
    useEffect(() => {
        UsersService.get(other)
            .then((res) => setWho(res))
            .catch((err) => setWho(undefined));
    }, [other]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [who, setWho] = useState<Partial<User> | undefined>();
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
                {<Messages who={who}></Messages>}
            </div>
        </main>
    );
}

export default function MailsPage(props: MailsProps) {
    return window ? Mails(props) : <></>;
}
