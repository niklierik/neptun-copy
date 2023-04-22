"use client";

import { User } from "@/common/models/user";
import { UserBtn } from "./user-btn";
import { Errors } from "@/common/errors";
import { UsersService } from "@/common/services/users.service";
import { handleError } from "@/common/utils";
import { useState, useEffect } from "react";

export interface ListUsersProps {
    email: string;
    name: string;
}

export function ListUsers({ email, name }: ListUsersProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string[]>([]);
    useEffect(() => {
        setLoading(true);
        UsersService.getUsers(email, name)
            .then((u) => {
                setUsers(u ?? []);
            })
            .catch((e) => handleError(e, setErr))
            .finally(() => setLoading(false));
    }, [email, name]);
    if (loading) {
        return <></>;
    }
    if (err.length > 0) {
        return <Errors errors={err}></Errors>;
    }
    if (users == null) {
        return <></>;
    }
    return (
        <div
            style={{
                width: "100%",
                overflowY: "scroll",
                height: "65vh",
                overflowX: "hidden",
            }}
        >
            {users.map((user, index) => (
                <UserBtn key={index} user={user}></UserBtn>
            ))}
        </div>
    );
}
