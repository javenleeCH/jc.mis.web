import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import {
  callAssessList, callAssessDtl, callAssessSave, callAssessDelete,
  dailyList, trendList,
} from '../services/callCnt';

export default {
  namespace: 'callCnt',

  state: {
    callAssess: {},
    callAssessDtl: {},
    daily: [],
    trend: [],
    msg: '',
  },
  effects: {
    *callAssess({ payload }, { call, put }) {
      const response = yield call(callAssessList, payload);
      yield put({
        type: 'saveCallAssessList',
        payload: response,
      });
    },
    *callAssessDtl({ payload }, { call, put }) {
      const response = yield call(callAssessDtl, payload);
      yield put({
        type: 'saveCallAssessDtl',
        payload: response.data,
      });
    },
    *callAssessSave({ payload }, { call, put }) {
      const response = yield call(callAssessSave, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put(routerRedux.push('/callCnt/workload'));
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *callAssessDelete({ payload }, { call, put }) {
      const response = yield call(callAssessDelete, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put({ type: 'saveSaved', payload: response.data });
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *daily({ payload }, { call, put }) {
      const response = yield call(dailyList, payload);
      yield put({
        type: 'saveDaily',
        payload: response.data,
      });
    },
    *trend({ payload }, { call, put }) {
      const response = yield call(trendList, payload);
      yield put({
        type: 'saveTrend',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveCallAssessList(state, action) {
      return {
        ...state,
        callAssess: action.payload,
      };
    },
    saveCallAssessDtl(state, action) {
      return {
        ...state,
        callAssessDtl: action.payload,
      };
    },
    saveDaily(state, action) {
      return { ...state, daily: action.payload };
    },

    saveTrend(state, action) {
      return { ...state, trend: action.payload };
    },

    saveSaved(state, action) {
      return { ...state, msg: action.payload };
    },
  },
};
