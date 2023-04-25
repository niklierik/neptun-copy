import { UsersService } from "@/common/services/users.service";
import { asyncTask } from "@/common/utils/async-task";
import { Table } from "react-bootstrap";

export function UserStats() {
    const { html, data: stats } = asyncTask("get-user-stats", () =>
        UsersService.count("every"),
    );
    if (html) {
        return html;
    }
    if (!stats) {
        return <></>;
    }
    return (
        <div>
            <h2 style={{ color: "white" }}>Felhasználó-statisztikák</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Hallgatók száma</th>
                        <th>Tanárok száma</th>
                        <th>Egyszerre diák és tanár</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{stats?.STUDENTS ?? "0"}</td>
                        <td>{stats?.TEACHERS ?? "0"}</td>
                        <td>{stats?.BOTH ?? "0"}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}
