import request from '../utils/request';
import { API_CONFIG } from '../config/api';

export async function queryFunnel(params) {
  return request(API_CONFIG.funnel.query, {
    method: 'POST',
    body: params,
  });
}
