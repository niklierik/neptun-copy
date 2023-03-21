import MyNavbar from "./navbar";

export default function Header({ email }: { email: string }) {
    return <><p className="top_text">{email}</p><MyNavbar></MyNavbar></>;
}