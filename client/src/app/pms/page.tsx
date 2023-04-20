"use client";

import Header from "@/common/header";
import { Form, Button } from "react-bootstrap";
import { Message } from "./message";
import { SearchUsers } from "./search-users";
import { UserBtn } from "./user-btn";
import { ListUsers } from "./list-users";
import { asyncTask } from "@/common/utils/async-task";
import { getServerUrl } from "@/common/cfg";
import { UsersService } from "@/common/services/users.service";
import { Messages } from "./messages";

export default function Mails() {
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

            <SearchUsers></SearchUsers>
            <ListUsers users={users}></ListUsers>
            <div className="flex_container_mail">
                <div className="flex_child_mail"></div>
                <Messages></Messages>
            </div>
        </main>
    );
}
