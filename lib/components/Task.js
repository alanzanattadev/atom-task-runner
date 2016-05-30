'use babel'

import {React} from 'react-for-atom';

export default React.createClass({
  render: function() {
    return (
      <div className="task">
        <span className="title">{this.props.package}: {this.props.action}</span>
      </div>
    );
  }
});
