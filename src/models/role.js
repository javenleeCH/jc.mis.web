import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { roleList, roleDetails, roleSave,
  ruleList, ruleSave } from '../services/role';

export default {
  namespace: 'role',
  state: {
    list: {},
    details: {},
    rule: {},
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(roleList, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
    },
    *details({ payload }, { call, put }) {
      const response = yield call(roleDetails, payload);
      yield put({
        type: 'saveDetails',
        payload: response.data,
      });
    },
    *save({ payload }, { call, put }) {
      const response = yield call(roleSave, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put(routerRedux.push('/organ/role'));
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *rule({ payload }, { call, put }) {
      const response = yield call(ruleList, payload);
      yield put({
        type: 'saveRuleList',
        payload: response,
      });
    },
    *ruleSave({ payload }, { call, put }) {
      const response = yield call(ruleSave, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put(routerRedux.push('/organ/role'));
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveDetails(state, action) {
      return {
        ...state,
        details: action.payload,
      };
    },
    saveRuleList(state, action) {
      return {
        ...state,
        rule: action.payload,
      };
    },
  },
};

