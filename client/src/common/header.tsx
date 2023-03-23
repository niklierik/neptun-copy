import MyNavbar from "./navbar";

export default function Header({ email }: { email: string }) {
    return <MyNavbar  email={email}></MyNavbar>;
}