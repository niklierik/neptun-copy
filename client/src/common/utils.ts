import { AxiosError } from "axios";

export function handleError(err: any, setErrors: (s: string[]) => void) {
    if (!(err instanceof AxiosError)) {
        setErrors(["Nem kezelt hiba történt: " + JSON.stringify(err)]);
        return;
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
    setErrors([...err.response.data.message]);
}

export function getJwtToken() {
    return "Bearer " + localStorage.getItem("jwt");
}