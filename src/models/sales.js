import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { prodList, prodDtl, prodSave, prodOptions,
  remitList, remitDtl, remitSave,
  quotaList, quotaDtl, quotaSave,
  extraList, extraDtl, extraSave,
  rankReduced, rankProd, mthUsrRank, yearlyRank, newIntr,
  workloadList, workloadDtl, workloadSave, workloadDelete,
  reachedList, reachedRun, period, chain,
  assessRank, assessRun, kamAssessRank, kamAssessRun,
  deptAssessRank, deptAssessRun, monthlyRpt, monthlyRun,
  regionPerf, compPerf, dueFunds } from '../services/sales';

export default {
  namespace: 'sales',

  state: {
    prod: {},
    prodDtl: {},
    prodOptions: [],
    remit: {},
    remitDtl: {},
    quota: {},
    quotaDtl: {},
    rankReduced: [],
    rankProd: [],
    mthUsrRank: [],
    yearlyRank: [],
    newIntr: [],
    workload: {},
    workloadDtl: {},
    extra: {},
    extraDtl: {},
    reached: [],
    period: [],
    chain: [],
    assessRank: [],
    kamassessRank: [],
    deptAssessRank: [],
    monthly: [],
    regionPerf: [],
    compPerf: [],
    dueFunds: [],
    msg: '',
  },
  effects: {
    *prod({ payload }, { call, put }) {
      const response = yield call(prodList, payload);
      yield put({
        type: 'saveProdList',
        payload: response,
      });
    },
    *prodDtl({ payload }, { call, put }) {
      const response = yield call(prodDtl, payload);
      yield put({
        type: 'saveProdDtl',
        payload: response.data,
      });
    },
    *prodSave({ payload }, { call, put }) {
      const response = yield call(prodSave, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put(routerRedux.push('/sales/prod'));
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *prodOptions({ payload }, { call, put }) {
      const response = yield call(prodOptions, payload);
      yield put({
        type: 'saveProdOptions',
        payload: response.data,
      });
    },
    *remit({ payload }, { call, put }) {
      const response = yield call(remitList, payload);
      yield put({
        type: 'saveRemitList',
        payload: response,
      });
    },
    *remitDtl({ payload }, { call, put }) {
      const response = yield call(remitDtl, payload);
      yield put({
        type: 'saveRemitDtl',
        payload: response.data,
      });
    },
    *remitSave({ payload }, { call, put }) {
      const response = yield call(remitSave, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put(routerRedux.push('/sales/remit'));
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *quota({ payload }, { call, put }) {
      const response = yield call(quotaList, payload);
      yield put({
        type: 'saveQuotaList',
        payload: response,
      });
    },
    *quotaDtl({ payload }, { call, put }) {
      const response = yield call(quotaDtl, payload);
      yield put({
        type: 'saveQuotaDtl',
        payload: response.data,
      });
    },
    *quotaSave({ payload }, { call, put }) {
      const response = yield call(quotaSave, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put(routerRedux.push('/sales/quota'));
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *extra({ payload }, { call, put }) {
      const response = yield call(extraList, payload);
      yield put({
        type: 'saveExtraList',
        payload: response,
      });
    },
    *extraDtl({ payload }, { call, put }) {
      const response = yield call(extraDtl, payload);
      yield put({
        type: 'saveExtraDtl',
        payload: response.data,
      });
    },
    *extraSave({ payload }, { call, put }) {
      const response = yield call(extraSave, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put(routerRedux.push('/sales/extra'));
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *rankReduced({ payload }, { call, put }) {
      const response = yield call(rankReduced, payload);
      yield put({
        type: 'saveRankReduced',
        payload: response.data,
      });
    },
    *rankProd({ payload }, { call, put }) {
      const response = yield call(rankProd, payload);
      yield put({
        type: 'saveRankProd',
        payload: response.data,
      });
    },
    *mthUsrRank({ payload }, { call, put }) {
      const response = yield call(mthUsrRank, payload);
      yield put({
        type: 'saveMthUsrRank',
        payload: response.data,
      });
    },
    *yearlyRank({ payload }, { call, put }) {
      const response = yield call(yearlyRank, payload);
      yield put({
        type: 'saveYearlyRank',
        payload: response.data,
      });
    },
    *newIntr({ payload }, { call, put }) {
      yield put({ type: 'saveNewIntr', payload: [] });
      const response = yield call(newIntr, payload);
      yield put({
        type: 'saveNewIntr',
        payload: response.data,
      });
    },
    *workload({ payload }, { call, put }) {
      const response = yield call(workloadList, payload);
      yield put({
        type: 'saveWorkloadList',
        payload: response,
      });
    },
    *workloadDtl({ payload }, { call, put }) {
      const response = yield call(workloadDtl, payload);
      yield put({
        type: 'saveWorkloadDtl',
        payload: response.data,
      });
    },
    *workloadSave({ payload }, { call, put }) {
      const response = yield call(workloadSave, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put(routerRedux.push('/sales/workload'));
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *workloadDelete({ payload }, { call, put }) {
      const response = yield call(workloadDelete, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put({ type: 'saveSaved', payload: response.data });
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *reachedList({ payload }, { call, put }) {
      const response = yield call(reachedList, payload);
      yield put({
        type: 'saveReached',
        payload: response.data,
      });
    },
    *reachedRun({ payload }, { call, put }) {
      const response = yield call(reachedRun, payload);
      yield put({
        type: 'saveReached',
        payload: response.data,
      });
    },
    *period({ payload }, { call, put }) {
      yield put({ type: 'savePeriod', payload: [] });
      const response = yield call(period, payload);
      yield put({
        type: 'savePeriod',
        payload: response.data,
      });
    },
    *chain({ payload }, { call, put }) {
      yield put({ type: 'saveChain', payload: [] });
      const response = yield call(chain, payload);
      yield put({
        type: 'saveChain',
        payload: response.data,
      });
    },
    *assessRank({ payload }, { call, put }) {
      const response = yield call(assessRank, payload);
      yield put({
        type: 'saveAssessRank',
        payload: response.data,
      });
    },
    *assessRun({ payload }, { call, put }) {
      const response = yield call(assessRun, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put({ type: 'saveSaved', payload: response.data });
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *kamassessRank({ payload }, { call, put }) {
      const response = yield call(kamAssessRank, payload);
      yield put({
        type: 'saveKamAssessRank',
        payload: response.data,
      });
    },
    *kamAssessRun({ payload }, { call, put }) {
      const response = yield call(kamAssessRun, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put({ type: 'saveSaved', payload: response.data });
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *deptAssessRank({ payload }, { call, put }) {
      const response = yield call(deptAssessRank, payload);
      yield put({
        type: 'saveDeptAssessRank',
        payload: response.data,
      });
    },
    *deptAssessRun({ payload }, { call, put }) {
      const response = yield call(deptAssessRun, payload);
      if (response.code === 200) {
        yield put({
          type: 'saveDeptAssessRank',
          payload: response.data,
        });
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *monthly({ payload }, { call, put }) {
      const response = yield call(monthlyRpt, payload);
      yield put({
        type: 'saveMonthly',
        payload: response.data,
      });
    },
    *monthlyRun({ payload }, { call, put }) {
      const response = yield call(monthlyRun, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put({ type: 'saveSaved', payload: response.data });
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *regionPerf({ payload }, { call, put }) {
      const response = yield call(regionPerf, payload);
      yield put({
        type: 'saveRegionPerf',
        payload: response.data,
      });
    },
    *compPerf({ payload }, { call, put }) {
      const response = yield call(compPerf, payload);
      yield put({
        type: 'saveCompPerf',
        payload: response.data,
      });
    },
    *dueFunds({ payload }, { call, put }) {
      const response = yield call(dueFunds, payload);
      yield put({
        type: 'saveDueFunds',
        payload: response.data,
      });
    },


  },
  reducers: {
    saveProdList(state, action) {
      return {
        ...state,
        prod: action.payload,
      };
    },
    saveProdDtl(state, action) {
      return {
        ...state,
        prodDtl: action.payload,
      };
    },
    saveProdOptions(state, action) {
      return {
        ...state,
        prodOptions: action.payload,
      };
    },
    saveRemitList(state, action) {
      return {
        ...state,
        remit: action.payload,
      };
    },
    saveRemitDtl(state, action) {
      return {
        ...state,
        remitDtl: action.payload,
      };
    },
    saveQuotaList(state, action) {
      return {
        ...state,
        quota: action.payload,
      };
    },
    saveQuotaDtl(state, action) {
      return {
        ...state,
        quotaDtl: action.payload,
      };
    },
    saveExtraList(state, action) {
      return {
        ...state,
        extra: action.payload,
      };
    },
    saveExtraDtl(state, action) {
      return {
        ...state,
        extraDtl: action.payload,
      };
    },
    saveRankReduced(state, action) {
      return {
        ...state,
        rankReduced: action.payload,
      };
    },
    saveRankProd(state, action) {
      return {
        ...state,
        rankProd: action.payload,
      };
    },
    saveMthUsrRank(state, action) {
      return {
        ...state,
        mthUsrRank: action.payload,
      };
    },
    saveYearlyRank(state, action) {
      return {
        ...state,
        yearlyRank: action.payload,
      };
    },
    saveNewIntr(state, action) {
      return {
        ...state,
        newIntr: action.payload,
      };
    },
    saveWorkloadList(state, action) {
      return {
        ...state,
        workload: action.payload,
      };
    },
    saveWorkloadDtl(state, action) {
      return {
        ...state,
        workloadDtl: action.payload,
      };
    },
    saveReached(state, action) {
      return {
        ...state,
        reached: action.payload,
      };
    },
    savePeriod(state, action) {
      return {
        ...state,
        period: action.payload,
      };
    },
    saveChain(state, action) {
      return {
        ...state,
        chain: action.payload,
      };
    },
    saveAssessRank(state, action) {
      return {
        ...state,
        assessRank: action.payload,
      };
    },
    saveKamAssessRank(state, action) {
      return {
        ...state,
        kamassessRank: action.payload,
      };
    },
    saveDeptAssessRank(state, action) {
      return {
        ...state,
        deptAssessRank: action.payload,
      };
    },
    saveMonthly(state, action) {
      return {
        ...state,
        monthly: action.payload,
      };
    },
    saveRegionPerf(state, action) {
      return {
        ...state,
        regionPerf: action.payload,
      };
    },
    saveCompPerf(state, action) {
      return {
        ...state,
        compPerf: action.payload,
      };
    },
    saveDueFunds(state, action) {
      return {
        ...state,
        dueFunds: action.payload,
      };
    },
    saveSaved(state, action) {
      return { ...state, msg: action.payload };
    },
  },
};
