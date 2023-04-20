"use client";

import Header from "@/common/header";
import { SearchUsers } from "./search-users";
import { ListUsers } from "./list-users";
import { asyncTask } from "@/common/utils/async-task";
import { getServerUrl } from "@/common/cfg";
import { UsersService } from "@/common/services/users.service";
import { Messages } from "./messages";
import { useState } from "react";

export default function Mails() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const { html, data: users } = asyncTask(
        getServerUrl("users"),
        UsersService.getUsers,
    );
    if (html) {
        return html;
    }
    if (users == null) {
        return <></>;
    }
    return (
        <main>
            <Header></Header>

            <SearchUsers
                email={email}
                name={name}
                setName={setName}
                setEmail={setEmail}
            ></SearchUsers>
            <ListUsers users={users}></ListUsers>
            <div className="flex_container_mail">
                <div className="flex_child_mail"></div>
                <Messages></Messages>
            </div>
        </main>
    );
}
