import { User } from "@/common/models/user";
import { UserBtn } from "./user-btn";

export interface ListUsersProps {
    users: User[];
}

export function ListUsers({ users }: ListUsersProps) {
    return (
        <div>
            {users.map((user, index) => (
                <UserBtn key={index} user={user}></UserBtn>
            ))}
        </div>
    );
}
