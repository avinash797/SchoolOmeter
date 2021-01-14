import Axios from "axios";

class AuthService {
  login(Username, Password) {
    return Axios.post("api/authentication/login", {
      username: Username,
      password: Password,
    }).then((res) => {
      if (res.status === 200) {
        return res;
      } else {
        alert("Login Vayena");
      }
    });
  }


}

export default new AuthService();
