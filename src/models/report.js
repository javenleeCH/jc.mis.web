import { loadPrdtRate, loadPrdtDest, loadDestinine } from '../services/report';

export default {
  namespace: 'report',

  state: {
    prdtRate: [],
    destinine: [],
    prdtDest: [],
  },

  effects: {
    *prdtrate({ payload }, { call, put }) {
      const response = yield call(loadPrdtRate, payload);
      yield put({ type: 'savePrdtRate', payload: response.data });
    },
    *destinine({ payload }, { call, put }) {
      const response = yield call(loadDestinine, payload);
      yield put({ type: 'saveDestinine', payload: response.data });
    },
    *prdtdest({ payload }, { call, put }) {
      const response = yield call(loadPrdtDest, payload);
      yield put({ type: 'savePrdtDest', payload: response.data });
    },
  },
  reducers: {
    savePrdtRate(state, action) {
      return {
        ...state,
        prdtRate: action.payload,
      };
    },
    saveDestinine(state, action) {
      return {
        ...state,
        destinine: action.payload,
      };
    },
    savePrdtDest(state, action) {
      return {
        ...state,
        prdtDest: action.payload,
      };
    },
  },
};
