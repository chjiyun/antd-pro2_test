import { getNews, getPolicyNews, getNewsDetail } from '@/services/api';

export default {
  namespace: 'test',

  state: {
    news: [],
    tags: [],
    count: 0,
    policyNews: [],
    policyCount: 0,
    newsDetail: {},
    prevNews: {},
    nextNews: {},
  },

  effects: {
    *searchNews({ payload }, { call, put }) {
      const response = yield call(getNews, payload);
      yield put({
        type: 'save',
        payload: response.datas,
      });
    },
    *searchPolicyNews({ payload }, { call, put }) {
      const response = yield call(getPolicyNews, payload);
      yield put({
        type: 'savePolicy',
        payload: {
          policyNews: response.datas,
          policyCount: response.count,
        },
      });
    },
    *searchNewsDetail({ payload, callback }, { call, put }) {
      const response = yield call(getNewsDetail, payload);
      if (response && response.code === 200) {
        yield put({
          type: 'saveDetail',
          payload: response.datas,
        });
        if (callback) callback(response.datas.data);
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      const news = payload.newsList.map(v => {
        return {
          ...v,
          id: v.industryNews_id,
        };
      });
      return {
        ...state,
        news,
        tags: payload.tags,
        count: payload.count,
      };
    },
    savePolicy(state, { payload }) {
      const news = payload.policyNews.map(v => {
        return {
          ...v,
          id: v.policy_id,
        };
      });
      return {
        ...state,
        policyNews: news,
        policyCount: payload.policyCount,
      };
    },
    saveDetail(state, { payload }) {
      const news = {
        ...payload.data,
        issuer: payload.data.companyName,
        id: payload.data.companyNews_id,
      };
      const prevNews = {
        ...payload.prevData,
        id: payload.prevData.companyNews_id,
      };
      const nextNews = {
        ...payload.nextData,
        id: payload.nextData.companyNews_id,
      };
      return {
        ...state,
        newsDetail: news,
        prevNews,
        nextNews,
      };
    },
  },
};
