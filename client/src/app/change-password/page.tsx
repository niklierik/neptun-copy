"use client";

import { Errors } from "@/common/errors";
import { UsersService } from "@/common/services/users.service";
import { handleError, signout } from "@/common/utils";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export interface ChangePasswordProps {
    searchParams: {
        token?: string;
    };
}

export default function ChangePassword({ searchParams }: ChangePasswordProps) {
    const { token } = searchParams;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    return (
        <main>
            <div className="to_center">
                <Form>
                    {token ? (
                        <></>
                    ) : (
                        <Form.Group
                            className="mb-3 form_group"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Régi jelszó</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Régi jelszó"
                                value={oldPassword}
                                onChange={(event) =>
                                    setOldPassword(event.target.value)
                                }
                            />
                        </Form.Group>
                    )}
                    <Form.Group
                        className="mb-3 form_group"
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Új jelszó</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Új jelszó"
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(event.target.value)
                            }
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3 form_group"
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Új jelszó újra</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Új jelszó újra"
                            value={newPasswordAgain}
                            onChange={(event) =>
                                setNewPasswordAgain(event.target.value)
                            }
                        />
                    </Form.Group>
                    <div className="to_center">
                        <Button
                            variant="primary"
                            onClick={(event) => {
                                event.preventDefault();
                                if (token) {
                                    UsersService.changePwdByToken(
                                        token,
                                        newPassword,
                                        newPasswordAgain,
                                    )
                                        .then(() => {
                                            signout();
                                            window.location.href = "/login";
                                        })
                                        .catch((err) =>
                                            handleError(err, setErrors, true),
                                        );
                                    return;
                                }
                                UsersService.changePwd(
                                    oldPassword,
                                    newPassword,
                                    newPasswordAgain,
                                )
                                    .then(() => {
                                        signout();
                                        window.location.href = "/login";
                                    })
                                    .catch((err) =>
                                        handleError(err, setErrors),
                                    );
                            }}
                        >
                            Jelszó megváltoztatása
                        </Button>
                    </div>
                    <Errors errors={errors}></Errors>
                </Form>
            </div>
        </main>
    );
}
