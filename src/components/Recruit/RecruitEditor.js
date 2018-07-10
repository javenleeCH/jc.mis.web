import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import CandidateEditor from './CandidateEditor';
import TraceLogEditor from './TraceLogEditor';
import TraceInterviewEditor from './TraceInterviewEditor';
import TraceSalaryEditor from './TraceSalaryEditor';
import TraceOfferEditor from './TraceOfferEditor';
import TraceEntryEditor from './TraceEntryEditor';
import TraceCoopEditor from './TraceCoopEditor';

@connect(({ user, recruit, datum, organ, loading }) =>
  ({ user, recruit, datum, organ, loading: loading.models.recruit }))
export default class RecruitEditor extends PureComponent {
  state = { flag: 0 }
  componentWillMount() {
    const types = 'traceType,position,applyPosition,applyOrgan,education,gender,rankType,recruitChannel,tracePhase,position,interviewType,interviewResult,salaryType';
    this.fetchOptions(types);
    this.fetchUser();
    this.fetchOrganTree();
    this.fetchUserOptions();
    this.fetchResidence(0);
  }

  fetchOptions = (types) => {
    const { dispatch } = this.props;
    dispatch({ type: 'datum/types', payload: types });
  }

  fetchResidence = (types) => {
    const { dispatch } = this.props;
    dispatch({ type: 'datum/residence', payload: types });
  }

  fetchUser = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/fetchCurrent' });
  }

  fetchOrganTree = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'organ/tree', payload: 0 });
  }

  fetchUserOptions = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/options',
      payload: {
        type: 0, ctl: 'recruit', act: 'list',
      } });
  }

  handleChangePhase=(phase) => {
    this.setState({ flag: phase });
  }

  render() {
    const { cid } = this.props;

    return (
      <Fragment>
        <Card bordered={false}>
          <CandidateEditor cid={cid} flag={this.state.flag} />
          <TraceCoopEditor cid={cid} />
        </Card>
        <TraceLogEditor cid={cid} handleChangePhase={this.handleChangePhase} />
        <TraceInterviewEditor cid={cid} handleChangePhase={this.handleChangePhase} />
        <TraceSalaryEditor cid={cid} handleChangePhase={this.handleChangePhase} />
        <TraceOfferEditor cid={cid} handleChangePhase={this.handleChangePhase} />
        <TraceEntryEditor cid={cid} handleChangePhase={this.handleChangePhase} />
      </Fragment>
    );
  }
}
