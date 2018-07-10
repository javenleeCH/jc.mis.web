import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '首页',
    icon: 'home',
    path: 'home',
    hideInMenu: true,
    children: [
      {
        name: '工作台',
        path: 'index',
        hideInMenu: true,
      },
    ],
  }, {
    name: '招聘管理',
    icon: 'team',
    path: 'recruit',
    children: [
      {
        name: '候选人管理',
        icon: 'team',
        path: 'list',
      }, {
        name: '候选人信息',
        icon: 'user',
        path: 'details/:id',
        hideInMenu: true,
      }, {
        name: '漏斗模型',
        icon: 'filter',
        path: 'funnel',
      }, {
        name: '重点跟进表',
        icon: 'calendar',
        path: 'keyTrace',
      }, {
        name: '招聘工作汇总',
        icon: 'calculator',
        path: 'workload',
      },
    ],
  }, {
    name: '财富管理',
    icon: 'pay-circle-o',
    path: 'sales',
    children: [
      {
        name: '基础信息',
        icon: 'bars',
        path: 'salesbase',
        children: [
          {
            name: '产品管理',
            icon: 'database',
            path: 'prod',
          }, {
            name: '产品信息',
            icon: 'file',
            path: 'prodDtl/:id',
            hideInMenu: true,
          }, {
            name: '业绩目标',
            icon: 'flag',
            path: 'quota',
          }, {
            name: '业绩目标信息',
            icon: 'flag',
            path: 'quotaDtl/:id',
            hideInMenu: true,
          },
        ],
      }, {
        name: '业绩管理',
        icon: 'pay-circle-o',
        path: 'salesperf',
        children: [
          {
            name: '打款信息',
            icon: 'pay-circle',
            path: 'remit',
          }, {
            name: '打款明细',
            icon: 'pay-circle',
            path: 'remitDtl/:id',
            hideInMenu: true,
          }, {
            name: '业绩/项目排名',
            icon: 'bar-chart',
            path: 'daily',
          }, {
            name: '业绩目标达成',
            icon: 'pie-chart',
            path: 'reached',
          }, {
            name: '理财师月度排名',
            icon: 'bar-chart',
            path: 'mthUsrRank',
          }, {
            name: '理财师年度排名',
            icon: 'bar-chart',
            path: 'yearlyRank',
          }, {
            name: '新客户及来源',
            icon: 'bar-chart',
            path: 'newIntr',
          }, {
            name: '业绩同比/环比',
            icon: 'line-chart',
            path: 'period',
          }, {
            name: '局/分公司打款占比',
            icon: 'pie-chart',
            path: 'perfRate',
          }, {
            name: '到期资金',
            icon: 'schedule',
            path: 'dueFunds',
          },
        ],
      }, {
        name: '工作量管理',
        icon: 'environment',
        path: 'salesworkload',
        children: [
          {
            name: '工作量记录',
            icon: 'phone',
            path: 'workload',
          }, {
            name: '工作量记录信息',
            icon: 'phone',
            path: 'workloadDtl/:id',
            hideInMenu: true,
          }, {
            name: '加减分明细',
            icon: 'star-o',
            path: 'extra',
          }, {
            name: '加减分明细',
            icon: 'star-o',
            path: 'extraDtl/:id',
          }, {
            name: '月度业绩工作量汇总',
            icon: 'table',
            path: 'monthly',
          }, {
            name: '理财师考核排名',
            icon: 'bar-chart',
            path: 'assess',
          }, {
            name: '大客户经理考核排名',
            icon: 'bar-chart',
            path: 'kamassess',
          }, {
            name: '部门经理考核排名',
            icon: 'bar-chart',
            path: 'deptassess',
          },
        ],
      },
    ],
  }, {
    name: '呼叫中心',
    icon: 'customer-service',
    path: 'callCnt',
    children: [
      {
        name: '工作量记录',
        icon: 'code-o',
        path: 'workload',
      }, {
        name: '工作量记录信息',
        icon: 'phone',
        path: 'workloadDtl/:id',
        hideInMenu: true,
      }, {
        name: '活动量表现',
        icon: 'bar-chart',
        path: 'daily',
      }, {
        name: '活动量趋势',
        icon: 'line-chart',
        path: 'trend',
      },
    ],
  }, {
    name: '组织管理',
    icon: 'home',
    path: 'organ',
    children: [
      {
        name: '组织架构',
        icon: 'code-o',
        path: 'list',
      },
      {
        name: '用户管理',
        icon: 'user',
        path: 'user',
      },
      {
        name: '用户信息',
        icon: 'user',
        path: 'userDtl/:id',
      },
      {
        name: '角色管理',
        icon: 'safety',
        path: 'role',
      },
    ],
  }, {
    name: '系统设置',
    icon: 'setting',
    path: 'settings',
    children: [
      {
        name: '选项集管理',
        icon: 'bars',
        path: 'datum',
      },
      {
        name: '功能模块管理',
        icon: 'appstore-o',
        path: 'module',
      },
    ],
  }, {
    name: '报表',
    icon: 'dashboard',
    path: 'report',
    children: [
      {
        name: '产品占比',
        icon: 'monitor',
        path: 'prdtrate',
      },
    ],
  }, {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      }, {
        name: '监控页',
        path: 'monitor',
      }, {
        name: '工作台',
        path: 'workplace',
        // hideInMenu: true,
      },
    ],
  }, {
    name: '表单页',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      }, {
        name: '分步表单',
        path: 'step-form',
      }, {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  }, {
    name: '列表页',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      }, {
        name: '标准列表',
        path: 'basic-list',
      }, {
        name: '卡片列表',
        path: 'card-list',
      }, {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          }, {
            name: '搜索列表（项目）',
            path: 'projects',
          }, {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  }, {
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      }, {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  }, {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success',
      }, {
        name: '失败',
        path: 'fail',
      },
    ],
  }, {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      }, {
        name: '404',
        path: '404',
      }, {
        name: '500',
        path: '500',
      }, {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  }, {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      }, {
        name: '注册',
        path: 'register',
      }, {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
