import { User } from "@/common/models/user";
import { Button } from "react-bootstrap";

export interface ShowMessagesOfProps {
    user: User;
}

export function UserBtn({ user }: ShowMessagesOfProps) {
    return (
        <div>
            <Button
                className="name_email_button"
                variant="secondary"
                type="submit"
            >
                {`${user?.familyname} ${user?.forename} (${user?.email})`}
            </Button>
        </div>
    );
}
