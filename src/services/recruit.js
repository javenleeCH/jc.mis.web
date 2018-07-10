import { stringify } from 'qs';
import request from '../utils/request';
import { API_CONFIG } from '../config/api';

export async function candidateList(params) {
  return request(API_CONFIG.recruit.list, {
    method: 'POST',
    body: params,
  });
}

export async function candidateDetails(params) {
  return request(API_CONFIG.recruit.details + params);
}

export async function saveCandidate(params) {
  return request(API_CONFIG.recruit.save, {
    method: 'POST',
    body: params,
  });
}

export async function candidateDisabled(params) {
  return request(API_CONFIG.recruit.disabled + `?${stringify(params)}`);
}

export async function cooperateList(params) {
  return request(API_CONFIG.recruit.coop.list + params);
}

export async function traceLog(params) {
  return request(API_CONFIG.recruit.trace.log.list + params);
}

export async function traceInterview(params) {
  return request(API_CONFIG.recruit.trace.interview.list + params);
}

export async function traceSalary(params) {
  return request(API_CONFIG.recruit.trace.salary.list + params);
}

export async function traceOffer(params) {
  return request(API_CONFIG.recruit.trace.offer.list + params);
}

export async function traceEntry(params) {
  return request(API_CONFIG.recruit.trace.entry.list + params);
}

export async function keyTrace(params) {
  return request(API_CONFIG.recruit.trace.rpt.keyTrace + params);
}

export async function workload(params) {
  return request(API_CONFIG.recruit.trace.rpt.workload + params);
}

export async function saveCooperate(params) {
  return request(API_CONFIG.recruit.coop.save, {
    method: 'POST',
    body: params,
  });
}
export async function saveLog(params) {
  return request(API_CONFIG.recruit.trace.log.save, {
    method: 'POST',
    body: params,
  });
}
export async function saveInterview(params) {
  return request(API_CONFIG.recruit.trace.interview.save, {
    method: 'POST',
    body: params,
  });
}
export async function saveSalary(params) {
  return request(API_CONFIG.recruit.trace.salary.save, {
    method: 'POST',
    body: params,
  });
}
export async function saveOffer(params) {
  return request(API_CONFIG.recruit.trace.offer.save, {
    method: 'POST',
    body: params,
  });
}
export async function saveEntry(params) {
  return request(API_CONFIG.recruit.trace.entry.save, {
    method: 'POST',
    body: params,
  });
}

export async function deleteCooperate(params) {
  return request(API_CONFIG.recruit.coop.delete + params);
}

export async function deleteLog(params) {
  return request(API_CONFIG.recruit.trace.log.delete + params);
}

export async function deleteInterview(params) {
  return request(API_CONFIG.recruit.trace.interview.delete + params);
}

export async function deleteSalary(params) {
  return request(API_CONFIG.recruit.trace.salary.delete + params);
}

export async function deleteOffer(params) {
  return request(API_CONFIG.recruit.trace.offer.delete + params);
}

export async function deleteEntry(params) {
  return request(API_CONFIG.recruit.trace.entry.delete + params);
}
