import { typeList, datumList, datumTypes, residence } from '../services/datum';

export default {
  namespace: 'datum',

  state: {
    typeList: [],
    datumList: [],
    options: [],
    residence: [],
  },

  effects: {
    *typeList({ payload }, { call, put }) {
      const response = yield call(typeList, payload);
      yield put({
        type: 'saveTypeList',
        payload: response,
      });
    },
    *datumList({ payload }, { call, put }) {
      const response = yield call(datumList, payload);
      yield put({
        type: 'saveList',
        payload: response.data,
      });
    },
    *types({ payload }, { call, put }) {
      const response = yield call(datumTypes, payload);
      yield put({
        type: 'saveOptions',
        payload: response.data,
      });
    },
    *residence({ payload }, { call, put }) {
      const response = yield call(residence, payload);
      yield put({
        type: 'saveResidence',
        payload: response.data,
      });
    },
  },

  reducers: {
    saveTypeList(state, action) {
      return {
        ...state,
        typeList: action.payload,
      };
    },
    saveList(state, action) {
      return {
        ...state,
        datumList: action.payload,
      };
    },
    saveOptions(state, action) {
      return {
        ...state,
        options: action.payload,
      };
    },
    saveResidence(state, action) {
      return {
        ...state,
        residence: action.payload,
      };
    },
  },
};
