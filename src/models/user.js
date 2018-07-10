import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { query as queryUsers, userMenu, userOptions,
  userList, userDetails, userSave, userEnabled, userDisabled,
  userRoles, roleSave } from '../services/user';
import { getAuthor } from '../utils/authority';

export default {
  namespace: 'user',

  state: {
    list: {},
    details: {},
    currentUser: {},
    menuData: [],
    userOptions: [],
    roles: {},
    msg: '',
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(userList, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
    },
    *details({ payload }, { call, put }) {
      const response = yield call(userDetails, payload);
      yield put({
        type: 'saveDetails',
        payload: response.data,
      });
    },
    *save({ payload }, { call, put }) {
      const response = yield call(userSave, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put(routerRedux.push('/organ/user'));
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *enabled({ payload }, { call, put }) {
      const response = yield call(userEnabled, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *disabled({ payload }, { call, put }) {
      const response = yield call(userDisabled, payload);
      notification.info({ message: `${response.msg}`, description: response.data });
      yield put({ type: 'saveSaved', payload: response.data });
    },
    *menu({ payload }, { call, put }) {
      const response = yield call(userMenu, payload);
      yield put({ type: 'saveMenu', payload: response.data });
    },
    *options({ payload }, { call, put }) {
      const response = yield call(userOptions, payload);
      yield put({ type: 'saveOptions', payload: response.data });
    },
    *role({ payload }, { call, put }) {
      const response = yield call(userRoles, payload);
      yield put({ type: 'saveRoles', payload: response.data });
    },
    *roleSave({ payload }, { call, put }) {
      const response = yield call(roleSave, payload);
      if (response.code === 200) {
        notification.success({ message: `${response.msg}`, description: response.data });
        yield put({ type: 'saveSaved', payload: response.data });
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    // //////////
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      // const response = yield call(queryCurrent);
      const user = getAuthor();
      if (JSON.stringify(user) === '{}') {
        yield put(routerRedux.push('/user/login'));
      }
      yield put({
        type: 'saveCurrentUser',
        payload: getAuthor(),
      });
    },
  },

  reducers: {
    saveList(state, action) {
      return { ...state, list: action.payload };
    },
    saveDetails(state, action) {
      return { ...state, details: action.payload };
    },
    saveSaved(state, action) {
      return { ...state, msg: action.payload };
    },
    // /以下为example
    save(state, action) {
      return { ...state, list: action.payload };
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
    saveMenu(state, action) {
      return { ...state, menuData: action.payload };
    },
    saveOptions(state, action) {
      return { ...state, userOptions: action.payload };
    },
    saveRoles(state, action) {
      return { ...state, roles: action.payload };
    },
  },
};
