import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker,
  Tooltip, Menu, Dropdown, Button } from 'antd';
import numeral from 'numeral';
import moment, { now } from 'moment';
import { ChartCard, yuan, MiniArea, MiniBar, MiniProgress,
  Field, Bar, Pie, TimelineChart,
} from '../../components/Charts';
import Trend from '../../components/Trend';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Index.less';
import CompOrgan from '../../components/Home/CompOrgan';
import CustRating from '../../components/Home/CustRating';
import { getAuthToken } from '../../utils/authority';

const salesLinks = [
  {
    title: '产品地图',
    href: 'http://planb.jcgroup.com.cn:7000/jc-apps/map-product/',
  },
  // {
  //   title: '客户分布',
  //   href: 'http://planb.jcgroup.com.cn:7000/jc-apps/gcrm',
  // },
  {
    title: '理财师业绩模型',
    href: 'http://planb.jcgroup.com.cn:7000/jc-apps/lcsyj/',
  // }, {
  //   title: '公司分布地图',
  //   href: 'http://planb.jcgroup.com.cn:7000/jc-apps/jcCompany/',
  }];
const compLinks = [
  {
    title: '闲置资金公告',
    href: 'http://planb.jcgroup.com.cn:7000/jc-apps/xianzhi/',
  },
  {
    title: '公告检索',
    href: 'http://planb.jcgroup.com.cn:7000/jc-apps/zijin/',
  },
  {
    title: '资产情况',
    href: 'http://planb.jcgroup.com.cn:7000/jc-apps/simu/',
  }];
const newsLinks = [
  {
    title: 'PPP政策',
    href: 'http://planb.jcgroup.com.cn:7000/jc-apps/PPPinfo/',
  },
  {
    title: '媒体资讯',
    href: 'http://planb.jcgroup.com.cn:7000/jc-apps/jcnews/',
  },
  {
    title: '土地信息',
    href: 'http://planb.jcgroup.com.cn:7000/jc-apps/lands_js/',
  }];
const otherLinks = [
  {
    title: '月度绩效',
    href: 'http://planb.jcgroup.com.cn:7000/jc-apps/dept_assess/',
  },
];

@connect(({ home, loading }) => ({ home, loading: loading.models.home }))
export default class HomeIndex extends Component {
  componentWillMount() {
    this.fetchScope();
  }

  // componentDidMount() {
  //   const { home: { scope } } = this.props;
  //   if (scope && scope.showPrsnPerf) {
  //     this.fetchPerf();
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.home.scope !== nextProps.home.scope) {
      if (nextProps.home.scope && nextProps.home.scope.showCustRating) {
        this.fetchCustRating();
      }
      if (nextProps.home.scope && nextProps.home.scope.showPrsnPerf) {
        this.fetchPerf();
      }
      if (nextProps.home.scope && nextProps.home.scope.showDeptPerf) {
        this.fetchDeptPerf();
      }
      if (nextProps.home.scope && nextProps.home.scope.showCompPerf) {
        this.fetchCompPerf();
      }
      if (nextProps.home.scope && nextProps.home.scope.showCompOrgan) {
        this.fetchCompOrgan();
      }
    }
  }

  fetchScope=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'home/moduleScope' });
  }

  fetchPerf=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'home/prsnPerf' });
  }

  fetchCompPerf=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'home/compPerf' });
  }

  fetchDeptPerf=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'home/deptPerf' });
  }

  fetchCompOrgan=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'home/compOrgan' });
  }

  fetchCustRating=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'home/custRating' });
  }

  handleAdd=() => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/sales/remitDtl/0'));
  }

  render() {
    const { home: { scope, prsnPerf, deptPerf, compPerf, compOrgan, custRating },
    } = this.props;
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      xxl: 6,
    };

    const custRatingTitle = '客户关系阶段分布 [截止于：' + (custRating && moment(custRating.traceOn).format('YYYY-MM-DD')) + ' ]';
    const token = getAuthToken();

    return (
      <PageHeaderLayout>
        <Row gutter={24}>
          <Col {...topColResponsiveProps} style={{ marginBottom: 24, display: (scope && scope.showPrsnPerf) ? 'inherit' : 'none' }}>
            <ChartCard
              bordered={false}
              title="个人 本月业绩(万)"
              action={<Button
                type="primary"
                shape="circle"
                icon="plus"
                title="添加客户打款"
                onClick={() => this.handleAdd()}
              />}
              total={`${numeral(prsnPerf.perf).format('0,0')}`}
              footer={<Field label="年度业绩/目标" value={`${numeral(prsnPerf.yearlyPerf).format('0,0')} / ${numeral(prsnPerf.yearlyStandard).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend style={{ marginRight: 16 }}>
                    月度目标<span className={styles.trendText}>{`${numeral(prsnPerf.standard).format('0,0')}`}</span>
              </Trend>
              <Trend >
                    完成率<span className={styles.trendText}>{`${(prsnPerf.rate * 100).toFixed(2)}%`}</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps} style={{ marginBottom: 24, display: (scope && scope.showDeptPerf) ? 'inherit' : 'none' }}>
            <ChartCard
              bordered={false}
              title="部门 本月业绩(万)"
              total={`${numeral(deptPerf.perf).format('0,0')}`}
              footer={<Field label="年度业绩/目标" value={`${numeral(deptPerf.yearlyPerf).format('0,0')} / ${numeral(deptPerf.yearlyStandard).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend style={{ marginRight: 16 }}>
                    月度目标<span className={styles.trendText}>{`${numeral(deptPerf.standard).format('0,0')}`}</span>
              </Trend>
              <Trend >
                    完成率<span className={styles.trendText}>{`${(deptPerf.rate * 100).toFixed(2)}%`}</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps} style={{ marginBottom: 24, display: (scope && scope.showCompPerf) ? 'inherit' : 'none' }}>
            <ChartCard
              bordered={false}
              title="分公司 本月业绩(万)"
              total={`${numeral(compPerf.perf).format('0,0')}`}
              footer={<Field label="年度业绩/目标" value={`${numeral(compPerf.yearlyPerf).format('0,0')} / ${numeral(compPerf.yearlyStandard).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend style={{ marginRight: 16 }}>
                    月度目标<span className={styles.trendText}>{`${numeral(compPerf.standard).format('0,0')}`}</span>
              </Trend>
              <Trend >
                    完成率<span className={styles.trendText}>{`${(compPerf.rate * 100).toFixed(2)}%`}</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps} style={{ marginBottom: 24, display: (scope && scope.showCompPerf) ? 'inherit' : 'none' }}>
            <ChartCard
              bordered={false}
              title={custRatingTitle}
              contentHeight={120}
            >
              <CustRating data={custRating && custRating} />
            </ChartCard>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24, display: (scope && scope.showCompOrgan) ? 'inherit' : 'none' }}>
            <Card
              title="分公司组织架构"
              bordered={false}
            >
              <CompOrgan height={400} data={compOrgan && compOrgan} padding={[15, 0, 65, 0]} />
            </Card>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24, display: (scope && scope.showLinks) ? 'inherit' : 'none' }}>
            <Card
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <div className={styles.linkGroup}><span>财富相关：</span>
                {
                  salesLinks.map(link => (
                    <a key={link.title} href={link.href + '?token=' + token} target="_blank">{link.title}</a>
                  ))
                }
              </div>
              {/* <div className={styles.linkGroup}><span>上市公司：</span>
                {
                  compLinks.map(link => (
                    <a key={link.title} href={link.href} target="_blank">{link.title}</a>
                  ))
                }
              </div> */}
              <div className={styles.linkGroup}><span>资讯信息：</span>
                {
                  newsLinks.map(link => (
                    <a key={link.title} href={link.href + '?token=' + token} target="_blank">{link.title}</a>
                  ))
                }
              </div>
              <div className={styles.linkGroup}><span>其他：</span>
                {
                  otherLinks.map(link => (
                    <a key={link.title} href={link.href + '?token=' + token} target="_blank">{link.title}</a>
                  ))
                }
              </div>
            </Card>
          </Col>
        </Row>
        <div>工作台已经开始做了哦，有什么想要第一时间看到的内容，可以提出来哦。。。</div>
      </PageHeaderLayout>
    );
  }
}
