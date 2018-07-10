import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Form, Input, DatePicker, Button, Select, InputNumber, Collapse } from 'antd';
import s from './WorkloadEditor.less';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const Panel = Collapse.Panel;

const options2yesno = [{ key: '0', value: '0', title: '否' }, { key: '1', value: '1', title: '是' }];

@connect(({ sales, user }) => ({ sales, user }))
class WorkloadEditor extends PureComponent {
  componentDidMount() {
    const { id, dispatch } = this.props;
    this.fetchProd();
    this.fetchUserOptions();
    this.fetchUser();
    if (id) {
      dispatch({ type: 'sales/workloadDtl', payload: id });
    }
  }

  fetchProd=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/prodOptions' });
  }

  fetchUserOptions = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/options',
      payload: {
        type: 2, ctl: 'sales', act: 'workload',
      } });
  }

  fetchUser = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/fetchCurrent' });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { sales: { workloadDtl }, dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fields = values;
        if (workloadDtl) {
          fields = { ...fields,
            id: workloadDtl.id,
            traceOn: moment(fields.traceOn).format('YYYY-MM-DD') };
        }
        dispatch({
          type: 'sales/workloadSave',
          payload: fields,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { sales: { workloadDtl },
      user: { userOptions, currentUser } } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
      style: {
        padding: 0,
        marginBottom: '10px',
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <Form onSubmit={e => this.handleSubmit(e)} layout="vertical">
        <Row gutter={10}>
          <Col xs={12} sm={12} xl={5}>
            <FormItem {...formItemLayout} label="记录日期">
              {getFieldDecorator('traceOn', {
            initialValue: moment(workloadDtl ? workloadDtl.remitOn : now()),
            rules: [{ required: true, message: '请输入记录日期' }],
          })(<DatePicker type="date" format="YYYY-MM-DD" />)}
            </FormItem>
          </Col>
          <Col xs={12} sm={12} xl={5}>
            <FormItem {...formItemLayout} label="理财师">
              {getFieldDecorator('userId', {
            initialValue: workloadDtl ? workloadDtl.userId + '' : currentUser.id + '',
            rules: [{ required: true }],
          })(
            <Select
              placeholder="--理财师--"
              showSearch
              optionFilterProp="children"
            >
              {userOptions && userOptions.map(d => (
                <Option
                  key={d.key}
                  value={d.value}
                  disabled={d.disabled}
                >{d.title}
                </Option>))}
            </Select>
          )}
            </FormItem>
          </Col>
        </Row>
        <p className={s.pTitle}>活动邀约</p>
        <Row gutter={10}>
          <Col xs={6} sm={6} xl={5}>
            <FormItem {...formItemLayout} label="成交">
              {getFieldDecorator('inviteDeal', {
            initialValue: workloadDtl ? workloadDtl.inviteDeal : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col xs={6} sm={6} xl={5}>
            <FormItem {...formItemLayout} label="青铜">
              {getFieldDecorator('inviteBronze', {
            initialValue: workloadDtl ? workloadDtl.inviteBronze : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col xs={6} sm={6} xl={5}>
            <FormItem {...formItemLayout} label="玄铁">
              {getFieldDecorator('inviteDarksteel', {
            initialValue: workloadDtl ? workloadDtl.inviteDarksteel : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col xs={6} sm={6} xl={5}>
            <FormItem {...formItemLayout} label="其他">
              {getFieldDecorator('inviteOther', {
            initialValue: workloadDtl ? workloadDtl.inviteOther : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <p className={s.pTitle}>外出拜访</p>
        <Row gutter={10}>
          <Col xs={6} sm={6} xl={5}>
            <FormItem {...formItemLayout} label="成交">
              {getFieldDecorator('visitDeal', {
            initialValue: workloadDtl ? workloadDtl.visitDeal : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col xs={6} sm={6} xl={5}>
            <FormItem {...formItemLayout} label="青铜">
              {getFieldDecorator('visitBronze', {
            initialValue: workloadDtl ? workloadDtl.visitBronze : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col xs={6} sm={6} xl={5}>
            <FormItem {...formItemLayout} label="玄铁">
              {getFieldDecorator('visitDarksteel', {
            initialValue: workloadDtl ? workloadDtl.visitDarksteel : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col xs={6} sm={6} xl={5}>
            <FormItem {...formItemLayout} label="其他">
              {getFieldDecorator('visitOther', {
            initialValue: workloadDtl ? workloadDtl.visitOther : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={6} sm={6} xl={5}>
            <FormItem {...formItemLayout} label="Vip">
              {getFieldDecorator('vips', {
            initialValue: workloadDtl ? workloadDtl.vips : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col xs={6} sm={6} xl={5}>
            <FormItem {...formItemLayout} label="电话量">
              {getFieldDecorator('calls', {
            initialValue: workloadDtl ? workloadDtl.calls : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col xs={12} sm={12} xl={5}>
            <FormItem {...formItemLayout} label="预计打款情况">
              {getFieldDecorator('expected', {
            initialValue: workloadDtl ? workloadDtl.expected : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} sm={24} xl={7} >
            <FormItem {...formItemLayout} label="VIP说明">
              {getFieldDecorator('vipsDesc', {
            initialValue: workloadDtl && workloadDtl.vipsDesc,
          })(<TextArea placeholder="VIP说明" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={24} xl={8} >
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('memo', {
            initialValue: workloadDtl && workloadDtl.memo,
          })(<TextArea placeholder="备注" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={24} sm={24} xl={15}>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
              >保 存
              </Button>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={6} sm={6} xl={5} />
          <Col xs={6} sm={6} xl={5} />
          <Col xs={6} sm={6} xl={5} />
        </Row>

      </Form>
    );
  }
}

export default WorkloadEditor = Form.create()(WorkloadEditor);
