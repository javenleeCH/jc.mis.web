import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

export default class EditTableCellText extends PureComponent {
  static defaultProps = {
    editable: false,
    value: '',
    onChange: () => {},
  }
  static propTypes = {
    editable: PropTypes.bool,
    value: PropTypes.any,
    onChange: PropTypes.func,
  }
  render() {
    const { editable, value, onChange } = this.props;
    return (
      <div>
        {editable
          ? (
            <Input
              style={{ margin: '-5px 0' }}
              value={value}
              onChange={e => onChange(e.target.value)}
            />) : value
        }
      </div>
    );
  }
}
