"use client";

import MyNavbar from "@/common/navbar";
import Header from "@/common/header";
import Table from "react-bootstrap/Table";

export default function Data() {
  const email = "szia";
  return (
    <main>
      <Header email={email}></Header>

      <div className="table_div">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
              <td>asd</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </main>
  );
}
