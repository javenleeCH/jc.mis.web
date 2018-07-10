import request from '../utils/request';
import { API_CONFIG } from '../config/api';

export async function moduleScope() {
  return request(API_CONFIG.home.moduleScope);
}

export async function prsnPerf() {
  return request(API_CONFIG.home.perf.prsn);
}

export async function deptPerf() {
  return request(API_CONFIG.home.perf.dept);
}

export async function compPerf() {
  return request(API_CONFIG.home.perf.comp);
}

export async function compOrgan() {
  return request(API_CONFIG.home.compOrgan);
}

export async function custRating() {
  return request(API_CONFIG.home.custRating);
}
