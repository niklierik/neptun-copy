"use client";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MyNavbar from '@/common/navbar';
import Header from '@/common/header';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { getServerUrl } from '@/common/cfg';
import { getJwtToken, handleError } from '@/common/utils';


export default function Register() {
  const email = "szia";

  const [registerState, setRegisterState] = useState({
    email: "",
    birthdate: new Date(),
    address: "",
    forename: "",
    familyname: "",
    majorID: "",
    isAdmin: false
  });

  const [registerIn, setRegisterIn] = useState(false);
  const [errors, setErrors] = useState([] as string[]);

  function onRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let err: string[] = [];

    if (!registerState.email) {
      err = ([...err, "Nincs email megadva!"]);
    }
    if (!registerState.birthdate) {
      err = ([...err, "Nincs szültési dátum megadva!"]);
    }
    if (!registerState.address) {
      err = ([...err, "Nincs lakcím megadva!"]);
    }
    if (!registerState.familyname) {
      err = ([...err, "Nincs vezetéknév megadva!"]);
    }
    if (!registerState.forename) {
      err = ([...err, "Nincs keresztnév megadva!"]);
    }
    if (!registerState.majorID) {
      err = ([...err, "Nincs szak megadva!"]);
    }
    setErrors(err);
    if (err.length > 0) {
      return;
    }

    setRegisterIn(true);

    axios.post(getServerUrl("users/register"), registerState, { headers: { Authorization: getJwtToken() } }).then(res => {
      setRegisterIn(false);



    }).catch(err => {
      setRegisterIn(false);
      handleError(err, setErrors);
    })

  }


  return <main>

    <Header email={email}></Header>

    <div className="to_center">
      <Form className="format" onSubmit={onRegister}>

        {errors.length == 0 ? <></> : <div className="error_div">
          {
            errors.map(error => <p>{error}</p>)
          }
        </div>}

        <Form.Group className="form_group mb-3" controlId="formBasicEmail">
          <Form.Label>Email cím</Form.Label>
          <Form.Control className="form_control" type="email" placeholder="Email" onChange={(event) => {
            const value = event.target.value;
            setRegisterState({ ...registerState, email: value });
          }} />
        </Form.Group>

        <Form.Group className="form_group mb-3" controlId="formBasicDate">
          <Form.Label>Születési dátum</Form.Label>
          <Form.Control className="form_control" type="date" placeholder="Email" onChange={(event) => {
            const value = new Date(event.target.value);
            setRegisterState({ ...registerState, birthdate: value });
          }} />
        </Form.Group>

        <Form.Group className="form_group mb-3" controlId="formBasicText">
          <Form.Label>Lakcím</Form.Label>
          <Form.Control className="form_control" type="text" placeholder="Lakcím" onChange={(event) => {
            const value = event.target.value;
            setRegisterState({ ...registerState, address: value });
          }} />
        </Form.Group>

        <Form.Group className="form_group mb-3" controlId="formBasicText">
          <Form.Label>Vezetéknév</Form.Label>
          <Form.Control className="form_control" type="text" placeholder="Vezetéknév" onChange={(event) => {
            const value = event.target.value;
            setRegisterState({ ...registerState, familyname: value });
          }} />
        </Form.Group>

        <Form.Group className="form_group mb-3" controlId="formBasicText">
          <Form.Label>Keresztnév</Form.Label>
          <Form.Control className="form_control" type="text" placeholder="Keresztnév" onChange={(event) => {
            const value = event.target.value;
            setRegisterState({ ...registerState, forename: value });
          }} />
        </Form.Group>

        <Form.Group className="form_group mb-3" controlId="formBasicText">
          <Form.Label>Szak</Form.Label>
          <Form.Control className="form_control" type="text" placeholder="Szak" onChange={(event) => {
            const value = event.target.value;
            setRegisterState({ ...registerState, majorID: value });
          }} />
        </Form.Group>

        <Form.Group className="to_center form_group mb-3" controlId="formBasicCheckbox" >
          <Form.Check type="checkbox" label="Admin" onChange={(event) => {
            const value = event.target.checked;
            setRegisterState({ ...registerState, isAdmin: value });
          }} />
        </Form.Group>

        <div className="to_center">
          <Button className="mybutton" variant="primary" type="submit" active={registerIn}>
            Regisztrál
          </Button>
        </div>
      </Form>
    </div>

  </main >;
}