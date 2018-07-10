// use localStorage to store the authority info, which might be sent from server
// in actual project.
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}

export function getAuthToken() {
  return localStorage.getItem('accessToken') || '';
}

export function setAuthToken(token) {
  return localStorage.setItem('accessToken', token);
}

export function getAuthor() {
  return JSON.parse(localStorage.getItem('user') || '{}');
}

export function setAuthor(user) {
  return localStorage.setItem('user', JSON.stringify(user));
}
