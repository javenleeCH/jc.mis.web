import { notification } from 'antd';
import { moduleList, moduleSave } from '../services/module';

export default {
  namespace: 'module',

  state: {
    list: [],
    msg: '',
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(moduleList, payload);
      yield put({
        type: 'saveList',
        payload: response.data,
      });
    },
    *save({ payload }, { call, put }) {
      const response = yield call(moduleSave, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveSaved(state, action) {
      return { ...state, msg: action.payload };
    },
  },
};
