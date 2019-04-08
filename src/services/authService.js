const tokenKey = "token";

export function login(email, password) {
  if (email !== "adminUser" || password !== "12345678") {
    return false;
  } 
 
  const jwt = "1234567890";
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getJwt
};
