export const API_CONFIG = {
  HOST: 'http://planb.jcgroup.com.cn',
  BASE_URI: 'http://localhost:7414/api/v1',
  // BASE_URI: '/api/v1',
  user: {
    login: '/user/login',
    menu: '/user/menu',
    list: '/user/list',
    details: '/user/details/',
    save: '/user/save',
    enabled: '/user/enabled',
    disabled: '/user/disabled',
    options: '/user/options',
    roles: '/user/role/',
    rolesSave: '/user/role/save',
  },
  home: {
    moduleScope: '/home/scope',
    perf: {
      prsn: '/home/perf',
      dept: '/home/deptPerf',
      comp: '/home/compPerf',
    },
    compOrgan: '/home/compOrgan',
    custRating: '/home/custRating',
  },
  organ: {
    tree: '/organ/tree/',
    get: '/organ/',
    save: '/organ/save',
  },
  recruit: {
    list: '/recruit/list',
    details: '/recruit/details/',
    save: '/recruit/save',
    disabled: '/recruit/disabled',
    coop: {
      list: '/recruit/coop/',
      save: '/recruit/coop/save',
      delete: '/recruit/coop/delete/',
    },
    trace: {
      log: {
        list: '/recruit/trace/log/',
        save: '/recruit/trace/log/save',
        delete: '/recruit/trace/log/delete/',
      },
      interview: {
        list: '/recruit/trace/interview/',
        save: '/recruit/trace/interview/save',
        delete: '/recruit/trace/interview/delete/',
      },
      salary: {
        list: '/recruit/trace/salary/',
        save: '/recruit/trace/salary/save',
        delete: '/recruit/trace/salary/delete/',
      },
      offer: {
        list: '/recruit/trace/offer/',
        save: '/recruit/trace/offer/save',
        delete: '/recruit/trace/offer/delete/',
      },
      entry: {
        list: '/recruit/trace/entry/',
        save: '/recruit/trace/entry/save',
        delete: '/recruit/trace/entry/delete/',
      },
      rpt: {
        keyTrace: '/recruit/rpt/keyTrace/',
        workload: '/recruit/rpt/workload/',
      },
    },
  },
  datum: {
    typeList: '/datum/list',
    saveType: '/datum/save',
    list: '/datum/list/',
    save: '/datum/save/',
    types: '/datum/',
    residence: '/datum/residence/',
  },
  module: {
    list: '/module/list',
    save: '/module/save',
  },
  report: {
    prdtrate: '/rpt/prdtrate',
    destinine: '/rpt/destinine',
    prdtdest: '/rpt/prdtdest',
  },
  funnel: {
    query: '/funnel/query',
    workload: '/funnel/workload',
  },
  sales: {
    prod: {
      list: '/sales/prod',
      save: '/sales/prod/save',
      dtl: '/sales/prod/',
      options: '/sales/prod/options',
    },
    remit: {
      list: '/sales/remit',
      save: '/sales/remit/save',
      dtl: '/sales/remit/',
    },
    quota: {
      list: '/sales/quota',
      save: '/sales/quota/save',
      dtl: '/sales/quota/',
    },
    rank: {
      reduced: '/sales/rank4user/',
      prod: '/sales/rank4prod/',
      usrMth: '/sales/mthusrrank/',
      usrYly: '/sales/yearlyrank/',
      newIntr: '/sales/newintr/',
    },
    workload: {
      list: '/sales/workload',
      save: '/sales/workload/save',
      dtl: '/sales/workload/',
      delete: '/sales/workload/delete/',
    },
    reached: {
      list: '/sales/reached',
      run: '/sales/reached/run',
    },
    period: '/sales/period/',
    chain: '/sales/chain/',
    extra: {
      list: '/sales/extra/list',
      save: '/sales/extra/save',
      dtl: '/sales/extra/',
    },
    assess: {
      rank: '/sales/assess/',
      run: '/sales/assess/run/',
      kam: {
        rank: '/sales/kamassess/',
        run: '/sales/kamassess/run/',
      },
      dept: {
        rank: '/sales/deptassess/',
        run: '/sales/deptassess/run/',
      },
    },
    monthly: {
      list: '/sales/monthly/',
      run: '/sales/monthly/run/',
    },
    perf: {
      region: '/sales/perf/region/',
      comp: '/sales/perf/comp/',
    },
    dueFunds: '/sales/dueFunds/',
  },
  callCnt: {
    workload: {
      list: '/callcnt/workload',
      save: '/callcnt/workload/save',
      dtl: '/callcnt/workload/',
      delete: '/callcnt/workload/delete/',
    },
    daily: '/callcnt/daily/',
    trend: '/callcnt/trend',
  },
  role: {
    list: '/role/list',
    save: '/role/save',
    dtl: '/role/',
    rule: {
      list: '/role/rule/',
      save: '/role/rule/save',
    },
  },
};
