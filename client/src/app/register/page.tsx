import { getServerUrl } from "@/common/cfg";
import axios from "axios";

function szia() {
  console.log("szia");
}

export default function Register() {
  szia();
  const email = "";
  return <form className="" onSubmit={(event) => {
    axios.post(getServerUrl('users/register'), {
      email: email,
    }, {
      headers: {
        Authorization: null // TODO token ide
      }
    }).then(result => {

    });
  }}>
    <p>Szia uram!</p>
  </form>;
}