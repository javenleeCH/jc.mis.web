import { queryFunnel } from '../services/funnel';

export default {
  namespace: 'funnel',

  state: {
    list: [],
    msg: '',
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(queryFunnel, payload);
      yield put({
        type: 'saveList',
        payload: response.data,
      });
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
