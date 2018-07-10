import request from '../utils/request';
import { API_CONFIG } from '../config/api';

export async function prodList(params) {
  return request(API_CONFIG.sales.prod.list, {
    method: 'POST',
    body: params,
  });
}

export async function prodDtl(params) {
  return request(API_CONFIG.sales.prod.dtl + params);
}

export async function prodSave(params) {
  return request(API_CONFIG.sales.prod.save, {
    method: 'POST',
    body: params,
  });
}

export async function prodOptions() {
  return request(API_CONFIG.sales.prod.options);
}

export async function remitList(params) {
  return request(API_CONFIG.sales.remit.list, {
    method: 'POST',
    body: params,
  });
}

export async function remitDtl(params) {
  return request(API_CONFIG.sales.remit.dtl + params);
}

export async function remitSave(params) {
  return request(API_CONFIG.sales.remit.save, {
    method: 'POST',
    body: params,
  });
}

export async function quotaList(params) {
  return request(API_CONFIG.sales.quota.list, {
    method: 'POST',
    body: params,
  });
}

export async function quotaDtl(params) {
  return request(API_CONFIG.sales.quota.dtl + params);
}

export async function quotaSave(params) {
  return request(API_CONFIG.sales.quota.save, {
    method: 'POST',
    body: params,
  });
}

export async function extraList(params) {
  return request(API_CONFIG.sales.extra.list, {
    method: 'POST',
    body: params,
  });
}

export async function extraDtl(params) {
  return request(API_CONFIG.sales.extra.dtl + params);
}

export async function extraSave(params) {
  return request(API_CONFIG.sales.extra.save, {
    method: 'POST',
    body: params,
  });
}

export async function rankReduced(params) {
  return request(API_CONFIG.sales.rank.reduced + params.type + '/' + params.date);
}

export async function rankProd(params) {
  return request(API_CONFIG.sales.rank.prod + +params.type + '/' + params.date);
}

export async function mthUsrRank(params) {
  return request(API_CONFIG.sales.rank.usrMth + params);
}

export async function yearlyRank(params) {
  return request(API_CONFIG.sales.rank.usrYly + params);
}

export async function newIntr(params) {
  return request(API_CONFIG.sales.rank.newIntr + params.type + '/' + params.date);
}

export async function period(params) {
  return request(API_CONFIG.sales.period + params.type + '/' + params.date);
}

export async function chain(params) {
  return request(API_CONFIG.sales.chain + params.type + '/' + params.date);
}

export async function workloadList(params) {
  return request(API_CONFIG.sales.workload.list, {
    method: 'POST',
    body: params,
  });
}

export async function workloadDtl(params) {
  return request(API_CONFIG.sales.workload.dtl + params);
}

export async function workloadSave(params) {
  return request(API_CONFIG.sales.workload.save, {
    method: 'POST',
    body: params,
  });
}

export async function workloadDelete(params) {
  return request(API_CONFIG.sales.workload.delete + params);
}

export async function reachedList(params) {
  return request(API_CONFIG.sales.reached.list, {
    method: 'POST',
    body: params,
  });
}

export async function reachedRun(params) {
  return request(API_CONFIG.sales.reached.run, {
    method: 'POST',
    body: params,
  });
}
export async function assessRank(params) {
  return request(API_CONFIG.sales.assess.rank + params);
}

export async function assessRun(params) {
  return request(API_CONFIG.sales.assess.run + params);
}

export async function kamAssessRank(params) {
  return request(API_CONFIG.sales.assess.kam.rank + params);
}

export async function kamAssessRun(params) {
  return request(API_CONFIG.sales.assess.kam.run + params);
}

export async function deptAssessRank(params) {
  return request(API_CONFIG.sales.assess.dept.rank + params);
}

export async function deptAssessRun(params) {
  return request(API_CONFIG.sales.assess.dept.run + params);
}

export async function monthlyRpt(params) {
  return request(API_CONFIG.sales.monthly.list + params);
}

export async function monthlyRun(params) {
  return request(API_CONFIG.sales.monthly.run + params);
}

export async function regionPerf(params) {
  return request(API_CONFIG.sales.perf.region + params);
}

export async function compPerf(params) {
  return request(API_CONFIG.sales.perf.comp + params);
}

export async function dueFunds(params) {
  return request(API_CONFIG.sales.dueFunds + params);
}
