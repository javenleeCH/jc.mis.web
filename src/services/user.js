import { stringify } from 'qs';
import request from '../utils/request';
import { API_CONFIG } from '../config/api';

export async function userLogin(params) {
  return request(API_CONFIG.user.login, {
    method: 'POST',
    body: params,
  });
}

export async function userMenu() {
  return request(API_CONFIG.user.menu);
}

export async function userRoles(params) {
  return request(API_CONFIG.user.roles + params);
}

export async function roleSave(params) {
  return request(API_CONFIG.user.rolesSave, {
    method: 'POST',
    body: params,
  });
}

export async function userList(params) {
  return request(API_CONFIG.user.list, {
    method: 'POST',
    body: params,
  });
}

export async function userDetails(params) {
  return request(API_CONFIG.user.details + params);
}

export async function userSave(params) {
  return request(API_CONFIG.user.save, {
    method: 'POST',
    body: params,
  });
}

export async function userEnabled(params) {
  return request(API_CONFIG.user.enabled + `?${stringify(params)}`);
}

export async function userDisabled(params) {
  return request(API_CONFIG.user.disabled + `?${stringify(params)}`);
}

export async function userOptions(params) {
  return request(API_CONFIG.user.options + `?${stringify(params)}`);
}

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
