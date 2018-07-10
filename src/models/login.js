import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { userLogin } from '../services/user';
import { setAuthority, setAuthor, setAuthToken } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      // const response = yield call(fakeAccountLogin, payload);
      const response = yield call(userLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      reloadAuthorized();
      // Login successfully
      if (response.code === 200) {
        yield put(routerRedux.push('/'));
      } else {
        notification.error({ message: `${response.msg}`, description: response.data, duration: 10 });
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data.currentAuthority);
      if (state) {
        setAuthToken(payload.data.token);
        setAuthor(payload.data);
      } else {
        setAuthToken('');
        setAuthor('{}');
      }
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
