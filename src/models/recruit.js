import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { candidateList, candidateDetails, saveCandidate, candidateDisabled,
  traceLog, traceInterview,
  traceSalary, traceOffer, traceEntry, cooperateList, saveCooperate, deleteCooperate,
  saveLog, saveInterview, saveSalary, saveOffer, saveEntry,
  deleteLog, deleteInterview, deleteSalary, deleteOffer, deleteEntry,
  keyTrace, workload } from '../services/recruit';

export default {
  namespace: 'recruit',

  state: {
    list: {},
    candidate: {},
    traceCoop: [],
    traceLog: [],
    traceInterview: [],
    traceSalary: [],
    traceOffer: [],
    traceEntry: [],
    saved: {},
    keyTrace: [],
    workload: [],
  },

  effects: {
    *candidate({ payload }, { call, put }) {
      const response = yield call(candidateList, payload);
      yield put({ type: 'saveList', payload: response });
    },
    *details({ payload }, { call, put }) {
      const response = yield call(candidateDetails, payload);
      yield put({ type: 'saveDetails', payload: response.data });
    },
    *save({ payload }, { call, put }) {
      const response = yield call(saveCandidate, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        // yield put({ type: 'saveSaved', payload: response.data });
        if (payload && (payload.id === undefined || payload.id === 0)) {
          yield put(routerRedux.push('/recruit/list'));
        }
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *disabled({ payload }, { call, put }) {
      const response = yield call(candidateDisabled, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *cooperate({ payload }, { call, put }) {
      const response = yield call(cooperateList, payload);
      yield put({ type: 'saveCoopList', payload: response.data });
    },
    *saveCoop({ payload }, { call, put }) {
      const response = yield call(saveCooperate, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *deleteCoop({ payload }, { call, put }) {
      const response = yield call(deleteCooperate, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *traceLog({ payload }, { call, put }) {
      const response = yield call(traceLog, payload);
      yield put({ type: 'saveLogList', payload: response.data });
    },
    *traceInterview({ payload }, { call, put }) {
      const response = yield call(traceInterview, payload);
      yield put({ type: 'saveInterviewList', payload: response.data });
    },
    *traceSalary({ payload }, { call, put }) {
      const response = yield call(traceSalary, payload);
      yield put({ type: 'saveSalaryList', payload: response.data });
    },
    *traceOffer({ payload }, { call, put }) {
      const response = yield call(traceOffer, payload);
      yield put({ type: 'saveOfferList', payload: response.data });
    },
    *traceEntry({ payload }, { call, put }) {
      const response = yield call(traceEntry, payload);
      yield put({ type: 'saveEntryList', payload: response.data });
    },
    *saveLog({ payload }, { call, put }) {
      const response = yield call(saveLog, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *saveInterview({ payload }, { call, put }) {
      const response = yield call(saveInterview, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *saveSalary({ payload }, { call, put }) {
      const response = yield call(saveSalary, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *saveOffer({ payload }, { call, put }) {
      const response = yield call(saveOffer, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *saveEntry({ payload }, { call, put }) {
      const response = yield call(saveEntry, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *deleteLog({ payload }, { call, put }) {
      const response = yield call(deleteLog, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *deleteInterview({ payload }, { call, put }) {
      const response = yield call(deleteInterview, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *deleteSalary({ payload }, { call, put }) {
      const response = yield call(deleteSalary, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *deleteOffer({ payload }, { call, put }) {
      const response = yield call(deleteOffer, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *deleteEntry({ payload }, { call, put }) {
      const response = yield call(deleteEntry, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *keyTrace({ payload }, { call, put }) {
      const response = yield call(keyTrace, payload);
      yield put({ type: 'saveKeyTrace', payload: response.data });
    },
    *workload({ payload }, { call, put }) {
      const response = yield call(workload, payload);
      yield put({ type: 'saveWorkload', payload: response.data });
    },
  },
  reducers: {
    saveList(state, action) {
      return { ...state, list: action.payload };
    },
    saveDetails(state, action) {
      return { ...state, candidate: action.payload };
    },
    saveLogList(state, action) {
      return { ...state, traceLog: action.payload };
    },
    saveInterviewList(state, action) {
      return { ...state, traceInterview: action.payload };
    },
    saveSalaryList(state, action) {
      return { ...state, traceSalary: action.payload };
    },
    saveOfferList(state, action) {
      return { ...state, traceOffer: action.payload };
    },
    saveEntryList(state, action) {
      return { ...state, traceEntry: action.payload };
    },
    saveCoopList(state, action) {
      return { ...state, traceCoop: action.payload };
    },
    saveKeyTrace(state, action) {
      return { ...state, keyTrace: action.payload };
    },
    saveWorkload(state, action) {
      return { ...state, workload: action.payload };
    },

    saveSaved(state, action) {
      return {
        ...state,
        saved: action.payload,
      };
    },
  },
};
