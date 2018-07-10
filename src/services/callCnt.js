import request from '../utils/request';
import { API_CONFIG } from '../config/api';

export async function callAssessList(params) {
  return request(API_CONFIG.callCnt.workload.list, {
    method: 'POST',
    body: params,
  });
}

export async function callAssessDtl(params) {
  return request(API_CONFIG.callCnt.workload.dtl + params);
}

export async function callAssessSave(params) {
  return request(API_CONFIG.callCnt.workload.save, {
    method: 'POST',
    body: params,
  });
}

export async function callAssessDelete(params) {
  return request(API_CONFIG.callCnt.workload.delete + params);
}

export async function dailyList(params) {
  return request(API_CONFIG.callCnt.daily + params.type + '/' + params.date);
}

export async function trendList(params) {
  return request(API_CONFIG.callCnt.trend, {
    method: 'POST',
    body: params,
  });
}
