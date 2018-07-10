import request from '../utils/request';
import { API_CONFIG } from '../config/api';

export async function typeList(params) {
  return request(API_CONFIG.datum.typeList, {
    method: 'POST',
    body: params,
  });
}

export async function datumList(params) {
  return request(API_CONFIG.datum.list + params);
}

export async function datumTypes(params) {
  return request(API_CONFIG.datum.types + params);
}

export async function residence(params) {
  return request(API_CONFIG.datum.residence + params);
}
