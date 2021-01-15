import AsyncStorage from "@react-native-community/async-storage";
import BASE_URL from "./baseUrl";

class AuthService {
  login(Username, Password) {
    return fetch(BASE_URL+"/api/authentication/login", {

      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username,
        Password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert("Invalid Username or Password");
        
      }
    })
  }

  
  logout() {
    AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys));
  }
}
export default new AuthService();
