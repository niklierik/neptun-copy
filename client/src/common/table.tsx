"use client";
import Table from "react-bootstrap/Table";


export default function DataTable({ header, rows }: { header: string[], rows: string[][] }) {

    return <div className="table_div">
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    {
                        header.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>

                {
                    rows.map((data, index) => <tr key={index}>{(
                        data.map((d, index) => (
                            <td key={index}>{d}</td>
                        ))
                    )}</tr>)
                }

            </tbody>
        </Table>
    </div>
}