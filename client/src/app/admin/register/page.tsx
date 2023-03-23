"use client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MyNavbar from '@/common/navbar';
import Header from '@/common/header';


export default function Register() {
  const email = "szia";
  return <main>

    <Header email={email}></Header>

    <div className="to_center">
      <Form className="format">
        <Form.Group className="form_group mb-3" controlId="formBasicEmail">
          <Form.Label>Email cím</Form.Label>
          <Form.Control className="form_control" type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="form_group mb-3" controlId="formBasicDate">
          <Form.Label>Születési dátum</Form.Label>
          <Form.Control className="form_control" type="date" placeholder="Email" />
        </Form.Group>

        <Form.Group className="form_group mb-3" controlId="formBasicText">
          <Form.Label>Lakcím</Form.Label>
          <Form.Control className="form_control" type="text" placeholder="Lakcím" />
        </Form.Group>

        <Form.Group className="form_group mb-3" controlId="formBasicText">
          <Form.Label>Vezetéknév</Form.Label>
          <Form.Control className="form_control" type="text" placeholder="Vezetéknév" />
        </Form.Group>

        <Form.Group className="form_group mb-3" controlId="formBasicText">
          <Form.Label>Keresztnév</Form.Label>
          <Form.Control className="form_control" type="text" placeholder="Keresztnév" />
        </Form.Group>

        <Form.Group className="form_group mb-3" controlId="formBasicText">
          <Form.Label>Szak</Form.Label>
          <Form.Control className="form_control" type="text" placeholder="Szak" />
        </Form.Group>

        <Form.Group className="to_center form_group mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Admin" />
        </Form.Group>

        <div className="to_center">
          <Button className="mybutton" variant="primary" type="submit">
            Regisztrál
          </Button>
        </div>
      </Form>
    </div>
  </main >;
}