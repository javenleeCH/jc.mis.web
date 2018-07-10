import request from '../utils/request';
import { API_CONFIG } from '../config/api';

export async function roleList(params) {
  return request(API_CONFIG.role.list, {
    method: 'POST',
    body: params,
  });
}

export async function roleDetails(params) {
  return request(API_CONFIG.role.dtl + params);
}

export async function roleSave(params) {
  return request(API_CONFIG.role.save, {
    method: 'POST',
    body: params,
  });
}

export async function ruleList(params) {
  return request(API_CONFIG.role.rule.list + params);
}

export async function ruleSave(params) {
  return request(API_CONFIG.role.rule.save, {
    method: 'POST',
    body: params,
  });
}
