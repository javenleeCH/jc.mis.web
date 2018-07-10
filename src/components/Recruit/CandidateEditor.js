import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Input, Form, Cascader,
  Button, Select, DatePicker, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ recruit, datum }) => ({ recruit, datum }))
class CandidateEditor extends PureComponent {
  componentDidMount() {
    const { cid, dispatch } = this.props;
    if (cid) {
      dispatch({ type: 'recruit/details', payload: cid });
    }
  }

  onResidenceSelect=(value) => {
    console.log(value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { recruit: { candidate }, dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fields = values;
        if (candidate) {
          fields = { ...fields, id: candidate.id };
        }
        fields = { ...fields,
          residence: fields.residence + '' };
        dispatch({ type: 'recruit/save', payload: fields });
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { recruit: { candidate }, datum: { options, residence } } = this.props;
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

    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Row gutter={8}>
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="入库日期">
              {getFieldDecorator('storageOn', {
                initialValue: moment(candidate ? candidate.storageOn : now()),
              })(<DatePicker type="date" format="YYYY-MM-DD" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name', {
              initialValue: candidate && candidate.name,
                rules: [{ required: true }],
              })(<Input placeholder="请输入姓名" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="手机">
              {getFieldDecorator('mobile', {
              initialValue: candidate && candidate.mobile,
              rules: [{ required: true }],
            })(
              <Input placeholder="请输入手机" />
            )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="推荐岗位">
              {getFieldDecorator('applyPosition', {
              initialValue: candidate ? candidate.applyPosition + '' : '1230',
              rules: [{ required: true }],
            })(
              <Select placeholder="--推荐岗位--">
                {options.applyPosition !== undefined && options.applyPosition.map(d => (
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
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="推荐组织">
              {getFieldDecorator('applyOrgan', {
              initialValue: candidate ? candidate.applyOrgan + '' : '1010',
              rules: [{ required: true }],
            })(
              <Select placeholder="--推荐岗位--">
                {options.applyOrgan !== undefined && options.applyOrgan.map(d => (
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
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="所在公司">
              {getFieldDecorator('lastComp', {
              initialValue: candidate && candidate.lastComp,
            })(
              <Input placeholder="请输入所在公司" />
            )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="最近职位">
              {getFieldDecorator('lastPosition', {
              initialValue: candidate && candidate.lastPosition,
            })(
              <Input placeholder="请输入最近职位" />
            )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="工作年限">
              {getFieldDecorator('workYears', {
              initialValue: candidate ? candidate.workYears : 0,
            })(
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入工作年限"
                min={0}
                formatter={value => `${value} 年`}
                parser={value => value.replace(' 年', '')}
              />
            )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="目前基本薪资">
              {getFieldDecorator('lastSalary', {
              initialValue: candidate ? candidate.lastSalary : 0,
            })(
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入目前基本薪资"
                min={0}
                formatter={value => `${value} 元/月`}
                parser={value => value.replace(' 元/月', '')}
              />
            )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="毕业院校">
              {getFieldDecorator('school', {
              initialValue: candidate && candidate.school,
            })(
              <Input placeholder="毕业院校" />
            )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="最高学历">
              {getFieldDecorator('education', {
              initialValue: candidate ? candidate.education + '' : '1000',
            })(
              <Select placeholder="--最高学历--">
                {options.education !== undefined && options.education.map(d => (
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
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="性别">
              {getFieldDecorator('gender', {
              initialValue: candidate ? candidate.gender + '' : '1010',
            })(
              <Select placeholder="--性别--">
                {options.gender !== undefined && options.gender.map(d => (
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
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="居住地">
              {getFieldDecorator('residence', {
              initialValue: candidate && candidate.residence && candidate.residence.split(','),
            })(
              <Cascader
                allowClear={false}
                placeholder="--居住地--"
                options={residence}
                changeOnSelect
                onChange={this.onResidenceSelect}
              />
          )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="邮箱">
              {getFieldDecorator('email', {
              initialValue: candidate && candidate.email,
            })(
              <Input placeholder="请输入邮箱" />
            )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="重要级">
              {getFieldDecorator('rankType', {
              initialValue: candidate ? candidate.rankType + '' : '1050',
            })(
              <Select placeholder="--重要级--">
                {options.rankType !== undefined && options.rankType.map(d => (
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
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="获取渠道">
              {getFieldDecorator('recruitChannel', {
              initialValue: candidate ? candidate.recruitChannel + '' : '1120',
            })(
              <Select placeholder="--获取渠道--">
                {options.recruitChannel !== undefined && options.recruitChannel.map(d => (
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
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="跟进阶段">
              {getFieldDecorator('tracePhase', {
              initialValue: candidate ? candidate.tracePhase + '' : '1010',
            })(
              <Select
                disabled
                placeholder="--跟进阶段--"
              >
                {options.tracePhase !== undefined && options.tracePhase.map(d => (
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
          <Col xs={24} sm={8}>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('memo', {
              initialValue: candidate && candidate.memo,
            })(
              <Input placeholder="备注" />
            )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
            <Button style={{ width: '50%' }} type="primary" size="large" icon="save" htmlType="submit">保存</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default CandidateEditor = Form.create()(CandidateEditor);
