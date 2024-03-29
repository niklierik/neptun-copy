"use client";

import { AxiosError } from "axios";

export function handleError(
    err: any,
    setErrors: (s: string[]) => void,
    keepLoggedInOn401?: boolean,
) {
    console.log(err);
    if (!(err instanceof AxiosError)) {
        setErrors(["Nem kezelt hiba történt: " + JSON.stringify(err)]);
        return;
    }
    if (err.response?.status === 401) {
        if (!keepLoggedInOn401) {
            window.location.href = "/login";
            return;
        }
    }
    if (err?.code === "ERR_NETWORK") {
        setErrors(["A szerver nem elérhető."]);
        return;
    }
    if (err?.response?.data == null) {
        setErrors([]);
        return;
    }
    if (typeof err.response.data.message === "string") {
        setErrors([err.response.data.message]);
        return;
    }
    if (err.response.data.message instanceof Array) {
        setErrors([...err.response.data.message]);
        return;
    }
}

// TODO move these to UsersService
export function signout() {
    localStorage.removeItem("jwt");
}

export function getJwtToken() {
    return localStorage.getItem("jwt");
}

export function getAuthToken() {
    return "Bearer " + getJwtToken();
}
