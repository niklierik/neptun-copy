"use client";
import Table from "react-bootstrap/Table";


export default function DataTable({ header, rows }: { header: string[], rows: string[][] }) {

    return <div className="table_div">
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    {
                        header.map(header => (
                            <th>{header}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>

                {
                    rows.map(data => <tr>{(
                        data.map(d => (
                            <td>{d}</td>
                        ))
                    )}</tr>)
                }

            </tbody>
        </Table>
    </div>
}