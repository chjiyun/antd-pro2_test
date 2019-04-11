import { getNews } from '@/services/api';

export default {
  namespace: 'test',

  state: {
    news: [],
  },

  effects: {
    *searchNews({ payload }, { call, put }) {
      const response = yield call(getNews, payload);
      yield put({
        type: 'save',
        payload: response.datas.newsList,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        news: action.payload,
      };
    },
  },
};
