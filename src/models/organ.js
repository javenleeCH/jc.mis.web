import { notification } from 'antd';
import { organTree, organInfo, organSave } from '../services/organ';

export default {
  namespace: 'organ',

  state: {
    tree: [],
    saved: {},
  },

  effects: {
    *tree({ payload }, { call, put }) {
      const response = yield call(organTree, payload);
      yield put({
        type: 'saveTree',
        payload: response.data,
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(organInfo, payload);
      yield put({
        type: 'saveOrgan',
        payload: response.data,
      });
    },
    *save({ payload }, { call, put }) {
      const response = yield call(organSave, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
  },

  reducers: {
    saveTree(state, action) {
      return {
        ...state,
        tree: action.payload,
      };
    },

    saveOrgan(state, action) {
      return {
        ...state,
        details: action.payload,
      };
    },

    saveSaved(state, action) {
      return {
        ...state,
        saved: action.payload,
      };
    },
  },
};
