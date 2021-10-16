const URL = "http://localhost:3000";

let logoutTimer;
//
export default {
  async signup(context, payload) {
    const data = {
      type: "signup",
      body: payload,
    };
    return await context.dispatch("auth", data);
  },
  async login(context, payload) {
    const data = {
      type: "login",
      body: payload,
    };
    return await context.dispatch("auth", data);
  },
  async auth(context, payload) {
    var res = await fetch(`${URL}/${payload.type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.body),
    });

    if (!res.ok) {
      throw new Error("Couldn't authenticate user");
    }
  
    const result = await res.json();

    console.log('result',result)

    const token = result.token.token;

    const exp = +result.token.expireIn; // SECONDS TO EXPIRE
    const expireIn = Date.now() / 1000 + exp; // WHEN IT WILL EXPIRE
    

    localStorage.setItem("token", token);
    localStorage.setItem("expireIn", expireIn);

    context.dispatch("setToken", { token });
    context.dispatch("autoLogout", exp);

    // return true;
  },

  setToken(context, payload) {
    context.commit("setToken", payload);
  },

  tryLogin(context) {
    const token = localStorage.getItem("token");
    const expireIn = +localStorage.getItem("expireIn"); // EXPIRY DATE

    if(!token || !expireIn)
      return console.log('No token or expiry date')

    // CURRENT DATE IS BEFORE EXPIRY DATE --> OK
    if (token && Date.now() / 1000 < expireIn) {
      context.dispatch("setToken", { token });
      context.dispatch("autoLogout", expireIn - Date.now() / 1000); // SECONDS REMAINING TILL EXPIRE
    }
    if (Date.now() / 1000 > expireIn) {
      console.log("Old Token");
    }
  },

  autoLogout(context, expireIn) {
    // whenever timer is up this method auto log out user

    logoutTimer = setTimeout(() => {
      console.log("Auto Logged Out user");
      context.dispatch("logout");
    }, expireIn * 1000);
  },
  logout(context) {
    console.log("Logging out");
    localStorage.removeItem("token");
    localStorage.removeItem("expireIn");
    context.commit("logout");
    clearTimeout(logoutTimer);
  },
};
