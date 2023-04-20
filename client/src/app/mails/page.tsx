"use client";

import Header from "@/common/header";
import { Form, Button, Card } from "react-bootstrap";
import { Messages } from "./messages";

export default function Mails() {

    return <main>
        <Header></Header>

        <div className="to_center border_3px">
            <Form className="format">

                <Form.Group className="mb-3 form_group" controlId="formBasicText">
                    <Form.Label className="to_center">Email cím</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <div className="to_center">
                    <Button className="mybutton" variant="primary" type="submit">
                        Keresés
                    </Button>
                </div>
            </Form>
        </div>

        <div className="flex_container_mail">
            <div className="flex_child_mail">
                <div>
                    <Button className="name_email_button" variant="secondary" type="submit">Név (Email)</Button>
                </div>
                <div>
                    <Button className="name_email_button" variant="secondary" type="submit">Név (Email)</Button>
                </div>
                <div>
                    <Button className="name_email_button" variant="secondary" type="submit">Név (Email)</Button>
                </div>
                <div>
                    <Button className="name_email_button" variant="secondary" type="submit">Név (Email)</Button>
                </div>
                <div>
                    <Button className="name_email_button" variant="secondary" type="submit">Név (Email)</Button>
                </div>
            </div>

            <div className="flex_child_mail">
                <div className="mail">
                    <p className="main_white_color blue_border">Név (Email)</p>

                    <Messages sender={false} message="asd"></Messages>
                    <Messages sender={true} message="asd"></Messages>
                    <Messages sender={false} message="asd"></Messages>
                    <Messages sender={true} message="asd"></Messages>
                    <Messages sender={true} message="asd"></Messages>
                    <Messages sender={true} message="asd"></Messages>
                    <Messages sender={false} message="asd"></Messages>
                    <Messages sender={false} message="asd"></Messages>
                    <Messages sender={false} message="asd"></Messages>
                    <Messages sender={true} message="asd"></Messages>
                    <Messages sender={false} message="asd"></Messages>


                    <div className="send_mail">
                        <Form>

                            <Form.Group className="mb-3" controlId="formBasicText">

                                <Form.Control as="textarea" />
                            </Form.Group>

                            <div className="to_center">
                                <Button className="mail_button" variant="primary" type="submit">
                                    Küldés
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>

    </main >
}