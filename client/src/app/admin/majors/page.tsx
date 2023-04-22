"use client";

import Header from "@/common/header";
import { Form, Button } from "react-bootstrap";
import { MajorsTable } from "../datas/majors/majors-table";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import axios from "axios";
import { getServerUrl } from "@/common/cfg";
import { getAuthToken, handleError } from "@/common/utils";
import { StringState, StringArrayState } from "@/common/utils/states";

export function submitMajors(
    event: FormEvent<HTMLFormElement>,
    name: StringState,
    short: StringState,
    err: StringArrayState,
) {
    event.preventDefault();
    axios
        .post(
            getServerUrl("majors"),
            {
                displayName: name[0],
                majorID: short[0],
            },
            { headers: { Authorization: getAuthToken() } },
        )
        .then(() => {
            window.location.href = "/admin/majors";
        })
        .catch((e) => handleError(e, err[1]));
}

export default function Majors() {
    const nameState = useState("");
    const shortState = useState("");
    const errState = useState<string[]>([]);
    return (
        <main>
            <Header></Header>

            <div className="to_center border_3px">
                <Form
                    className="format"
                    onSubmit={(event) =>
                        submitMajors(event, nameState, shortState, errState)
                    }
                >
                    <Form.Group
                        className="mb-3 form_group"
                        controlId="formBasicText"
                    >
                        <Form.Label>Szak neve</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Név"
                            value={nameState[0]}
                            onChange={(event) => {
                                nameState[1](event.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 form_group">
                        <Form.Label>Szak rövidítése</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Rövidítés"
                            onChange={(event) => {
                                shortState[1](event.target.value);
                            }}
                            value={shortState[0]}
                        />
                    </Form.Group>

                    <div className="to_center">
                        <Button
                            className="mybutton"
                            variant="primary"
                            type="submit"
                        >
                            Felvétel
                        </Button>
                    </div>
                </Form>
            </div>

            <div>
                <MajorsTable></MajorsTable>
            </div>
        </main>
    );
}
