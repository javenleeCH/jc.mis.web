import request from '../utils/request';
import { API_CONFIG } from '../config/api';

export async function loadPrdtRate() {
  return request(API_CONFIG.report.prdtrate);
}
export async function loadDestinine() {
  return request(API_CONFIG.report.destinine);
}
export async function loadPrdtDest(params) {
  return request(API_CONFIG.report.prdtdest, {
    method: 'POST',
    body: params,
  });
}
