import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Form, Input, DatePicker, Button, Select, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ sales, user }) => ({ sales, user }))
class ExtraEditor extends PureComponent {
  componentDidMount() {
    const { id, dispatch } = this.props;
    this.fetchUserOptions();
    this.fetchUser();
    if (id) {
      dispatch({ type: 'sales/extraDtl', payload: id });
    }
  }

  sumTotal=() => {
    let total = 0;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        total = parseInt(values.inspect) + parseInt(values.teamActivity);
        total += parseInt(values.pushNew) + parseInt(values.roadshow) + parseInt(values.other);
        total += parseInt(values.earliest) + parseInt(values.remitGt300) + parseInt(values.existence);
        total += parseInt(values.mostVip) + parseInt(values.taskPg) + parseInt(values.beLate);
      }
    });
    return total;
  }

  fetchUserOptions = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/options',
      payload: {
        type: 2, ctl: 'sales', act: 'extra',
      } });
  }

  fetchUser = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/fetchCurrent' });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { sales: { extraDtl }, dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fields = values;
        if (extraDtl) {
          fields = { ...fields, id: extraDtl.id };
        }
        const total = this.sumTotal();
        fields = { ...fields, total };
        dispatch({
          type: 'sales/extraSave',
          payload: fields,
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { sales: { extraDtl },
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
        <FormItem {...formItemLayout} label="加分时间">
          {getFieldDecorator('traceOn', {
            initialValue: moment(extraDtl ? extraDtl.traceOn : now()),
            rules: [{ required: true, message: '请输入打款时间' }],
          })(<DatePicker type="date" format="YYYY-MM-DD" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="理财师">
          {getFieldDecorator('userId', {
          initialValue: extraDtl ? extraDtl.userId + '' : currentUser.id + '',
        })(
          <Select
            placeholder="--理财师--"
            showSearch
            optionFilterProp="children"
          >
            <Option key="-1" value="-1">无</Option>
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
        <FormItem {...formItemLayout} label="考察">
          {getFieldDecorator('inspect', {
              initialValue: extraDtl ? extraDtl.inspect : 0,
            })(
              <InputNumber style={{ width: '100%' }} min={0} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="团建">
          {getFieldDecorator('teamActivity', {
              initialValue: extraDtl ? extraDtl.teamActivity : 0,
            })(
              <InputNumber style={{ width: '100%' }} min={0} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="推荐新员工入职">
          {getFieldDecorator('pushNew', {
              initialValue: extraDtl ? extraDtl.pushNew : 0,
            })(
              <InputNumber style={{ width: '100%' }} min={0} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="产品路演活动">
          {getFieldDecorator('roadshow', {
              initialValue: extraDtl ? extraDtl.roadshow : 0,
            })(
              <InputNumber style={{ width: '100%' }} min={0} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="其它">
          {getFieldDecorator('other', {
              initialValue: extraDtl ? extraDtl.other : 0,
            })(
              <InputNumber style={{ width: '100%' }} min={0} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="早会加分">
          {getFieldDecorator('earliest', {
              initialValue: extraDtl ? extraDtl.earliest : 0,
            })(
              <InputNumber style={{ width: '100%' }} min={0} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="单笔300W及以上+新客户加分 (含）">
          {getFieldDecorator('remitGt300', {
              initialValue: extraDtl ? extraDtl.remitGt300 : 0,
            })(
              <InputNumber style={{ width: '100%' }} min={0} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="存续浮动产品加分">
          {getFieldDecorator('existence', {
              initialValue: extraDtl ? extraDtl.existence : 0,
            })(
              <InputNumber style={{ width: '100%' }} min={0} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="月VIP最多加分">
          {getFieldDecorator('mostVip', {
              initialValue: extraDtl ? extraDtl.mostVip : 0,
            })(
              <InputNumber style={{ width: '100%' }} min={0} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="任务包加分">
          {getFieldDecorator('taskPg', {
              initialValue: extraDtl ? extraDtl.taskPg : 0,
            })(
              <InputNumber style={{ width: '100%' }} min={0} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="迟到扣分(负值)">
          {getFieldDecorator('beLate', {
              initialValue: extraDtl ? extraDtl.beLate : 0,
            })(
              <InputNumber style={{ width: '100%' }} max={0} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('memo', {
            initialValue: extraDtl && extraDtl.memo,
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

export default ExtraEditor = Form.create()(ExtraEditor);
