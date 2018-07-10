import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/home/index': {
      component: dynamicWrapper(app, ['home'], () => import('../routes/Home/Index')),
    },
    '/recruit/list': {
      component: dynamicWrapper(app, ['user', 'recruit', 'datum', 'organ'], () => import('../routes/Recruit/List')),
    },
    '/recruit/details/:id': {
      component: dynamicWrapper(app, ['user', 'recruit', 'datum', 'organ'], () => import('../routes/Recruit/Details')),
    },
    '/recruit/funnel': {
      component: dynamicWrapper(app, ['user', 'funnel', 'datum'], () => import('../routes/Recruit/Funnel')),
    },
    '/recruit/keyTrace': {
      component: dynamicWrapper(app, ['recruit'], () => import('../routes/Recruit/KeyTrace')),
    },
    '/recruit/workload': {
      component: dynamicWrapper(app, ['recruit'], () => import('../routes/Recruit/Workload')),
    },
    '/sales/prod': {
      component: dynamicWrapper(app, ['user', 'sales', 'datum'], () => import('../routes/Sales/Prod')),
    },
    '/sales/prodDtl/:id': {
      component: dynamicWrapper(app, ['user', 'sales'], () => import('../routes/Sales/ProdDtl')),
    },
    '/sales/remit': {
      component: dynamicWrapper(app, ['user', 'sales', 'datum'], () => import('../routes/Sales/Remit')),
    },
    '/sales/remitDtl/:id': {
      component: dynamicWrapper(app, ['user', 'sales'], () => import('../routes/Sales/RemitDtl')),
    },
    '/sales/quota': {
      component: dynamicWrapper(app, ['user', 'sales', 'datum'], () => import('../routes/Sales/Quota')),
    },
    '/sales/quotaDtl/:id': {
      component: dynamicWrapper(app, ['user', 'sales', 'datum', 'organ'], () => import('../routes/Sales/QuotaDtl')),
    },
    '/sales/workload': {
      component: dynamicWrapper(app, ['user', 'sales', 'datum', 'organ'], () => import('../routes/Sales/Workload')),
    },
    '/sales/workloadDtl/:id': {
      component: dynamicWrapper(app, ['user', 'sales', 'datum', 'organ'], () => import('../routes/Sales/WorkloadDtl')),
    },
    '/sales/daily': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/Daily')),
    },
    '/sales/mthUsrRank': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/MthUsrRank')),
    },
    '/sales/yearlyRank': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/YearlyRank')),
    },
    '/sales/newIntr': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/NewIntr')),
    },
    '/sales/reached': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/Reached')),
    },
    '/sales/period': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/Period')),
    },
    '/sales/extra': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/Extra')),
    },
    '/sales/extraDtl/:id': {
      component: dynamicWrapper(app, ['user', 'sales'], () => import('../routes/Sales/ExtraDtl')),
    },
    '/sales/assess': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/Assess')),
    },
    '/sales/kamassess': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/KamAssess')),
    },
    '/sales/deptassess': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/DeptAssess')),
    },
    '/sales/monthly': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/Monthly')),
    },
    '/sales/perfRate': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/PerfRate')),
    },
    '/sales/dueFunds': {
      component: dynamicWrapper(app, ['sales'], () => import('../routes/Sales/DueFunds')),
    },
    '/callCnt/workload': {
      component: dynamicWrapper(app, ['callCnt'], () => import('../routes/CallCnt/Workload')),
    },
    '/callCnt/workloadDtl/:id': {
      component: dynamicWrapper(app, ['user', 'callCnt'], () => import('../routes/CallCnt/WorkloadDtl')),
    },
    '/callCnt/daily': {
      component: dynamicWrapper(app, ['callCnt'], () => import('../routes/CallCnt/Daily')),
    },
    '/callCnt/trend': {
      component: dynamicWrapper(app, ['user', 'callCnt'], () => import('../routes/CallCnt/Trend')),
    },
    '/organ/list': {
      component: dynamicWrapper(app, ['user', 'organ'], () => import('../routes/Organ/List')),
    },
    '/organ/user': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/Organ/User')),
    },
    '/organ/userDtl/:id': {
      component: dynamicWrapper(app, ['user', 'organ', 'datum'], () => import('../routes/Organ/UserDtl')),
    },
    '/organ/role': {
      component: dynamicWrapper(app, ['role', 'module'], () => import('../routes/Organ/Role')),
    },
    '/settings/datum': {
      component: dynamicWrapper(app, ['user', 'datum'], () => import('../routes/Settings/Datum')),
    },
    '/settings/module': {
      component: dynamicWrapper(app, ['module'], () => import('../routes/Settings/Module')),
    },
    '/report/prdtrate': {
      component: dynamicWrapper(app, ['report'], () => import('../routes/Report/PrdtRate')),
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
      // hideInBreadcrumb: true,
      // name: '工作台',
      // authority: 'admin',
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
    },
    '/form/step-form/info': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });
  return routerData;
};
