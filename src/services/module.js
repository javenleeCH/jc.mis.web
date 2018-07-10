import request from '../utils/request';
import { API_CONFIG } from '../config/api';

export async function moduleList() {
  return request(API_CONFIG.module.list);
}

export async function moduleSave(params) {
  return request(API_CONFIG.module.save, {
    method: 'POST',
    body: params,
  });
}
