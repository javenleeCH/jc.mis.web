import request from '../utils/request';
import { API_CONFIG } from '../config/api';

export async function organTree(params) {
  return request(API_CONFIG.organ.tree + params);
}

export async function organInfo(params) {
  return request(API_CONFIG.organ.get + params);
}

export async function organSave(params) {
  return request(API_CONFIG.organ.save, {
    method: 'POST',
    body: params,
  });
}
