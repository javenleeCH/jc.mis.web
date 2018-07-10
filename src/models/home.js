import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { prsnPerf, deptPerf, compPerf, moduleScope, compOrgan, custRating } from '../services/home';

export default {
  namespace: 'home',
  state: {
    scope: {},
    prsnPerf: {},
    deptPerf: {},
    compPerf: {},
    compOrgan: {},
    custRating: {},
  },

  effects: {
    *moduleScope({ payload }, { call, put }) {
      const response = yield call(moduleScope, payload);
      yield put({
        type: 'saveModuleScope',
        payload: response.data,
      });
    },
    *prsnPerf({ payload }, { call, put }) {
      const response = yield call(prsnPerf, payload);
      yield put({
        type: 'savePrsnPerf',
        payload: response.data,
      });
    },
    *deptPerf({ payload }, { call, put }) {
      const response = yield call(deptPerf, payload);
      yield put({
        type: 'saveDeptPerf',
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
    *compOrgan({ payload }, { call, put }) {
      const response = yield call(compOrgan, payload);
      yield put({
        type: 'saveCompOrgan',
        payload: response.data,
      });
    },
    *custRating({ payload }, { call, put }) {
      const response = yield call(custRating, payload);
      yield put({
        type: 'saveCustRating',
        payload: response.data,
      });
    },
  },

  reducers: {
    saveModuleScope(state, action) {
      return {
        ...state,
        scope: action.payload,
      };
    },
    savePrsnPerf(state, action) {
      return {
        ...state,
        prsnPerf: action.payload,
      };
    },
    saveDeptPerf(state, action) {
      return {
        ...state,
        deptPerf: action.payload,
      };
    },
    saveCompPerf(state, action) {
      return {
        ...state,
        compPerf: action.payload,
      };
    },
    saveCompOrgan(state, action) {
      return {
        ...state,
        compOrgan: action.payload,
      };
    },
    saveCustRating(state, action) {
      return {
        ...state,
        custRating: action.payload,
      };
    },
  },
};

