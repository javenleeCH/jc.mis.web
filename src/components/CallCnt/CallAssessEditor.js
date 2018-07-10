import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Form, Input, DatePicker, Button, Select, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ callCnt, user }) => ({ callCnt, user }))
class CallAssessEditor extends PureComponent {
  componentDidMount() {
    const { id, dispatch } = this.props;
    this.fetchProd();
    this.fetchUserOptions();
    this.fetchUser();
    if (id) {
      dispatch({ type: 'callCnt/callAssessDtl', payload: id });
    }
  }

  fetchProd=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'callCnt/prodOptions' });
  }

  fetchUserOptions = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/options',
      payload: {
        type: 3, ctl: 'callCnt', act: 'callAssess',
      } });
  }

  fetchUser = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/fetchCurrent' });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { callCnt: { callAssessDtl }, dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fields = values;
        if (callAssessDtl) {
          fields = { ...fields,
            id: callAssessDtl.id,
            traceOn: moment(fields.traceOn).format('YYYY-MM-DD') };
        }
        dispatch({
          type: 'callCnt/callAssessSave',
          payload: fields,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { callCnt: { callAssessDtl },
      user: { userOptions, currentUser } } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <FormItem {...formItemLayout} label="记录日期">
          {getFieldDecorator('traceOn', {
            initialValue: moment(callAssessDtl ? callAssessDtl.remitOn : now()),
            rules: [{ required: true, message: '请输入记录日期' }],
          })(<DatePicker type="date" format="YYYY-MM-DD" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="坐席">
          {getFieldDecorator('userId', {
            initialValue: callAssessDtl ? callAssessDtl.userId + '' : currentUser.id + '',
            rules: [{ required: true }],
          })(
            <Select
              placeholder="--坐席--"
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
        <FormItem {...formItemLayout} label="外拔数量">
          {getFieldDecorator('dialing', {
            initialValue: callAssessDtl ? callAssessDtl.dialing : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="通话数量">
          {getFieldDecorator('calls', {
            initialValue: callAssessDtl ? callAssessDtl.calls : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="通话时长">
          {getFieldDecorator('callTime', {
            initialValue: callAssessDtl ? callAssessDtl.callTime : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="青铜">
          {getFieldDecorator('bronze', {
            initialValue: callAssessDtl ? callAssessDtl.bronze : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="玄铁">
          {getFieldDecorator('darksteel', {
            initialValue: callAssessDtl ? callAssessDtl.darksteel : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="邀约">
          {getFieldDecorator('invite', {
            initialValue: callAssessDtl ? callAssessDtl.invite : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="推送">
          {getFieldDecorator('push', {
            initialValue: callAssessDtl ? callAssessDtl.push : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="签单交易量">
          {getFieldDecorator('deal', {
            initialValue: callAssessDtl ? callAssessDtl.deal : 0,
          })(<InputNumber style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('memo', {
            initialValue: callAssessDtl && callAssessDtl.memo,
          })(<Input placeholder="备注" />)}
        </FormItem>

        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
          >保 存
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default CallAssessEditor = Form.create()(CallAssessEditor);
