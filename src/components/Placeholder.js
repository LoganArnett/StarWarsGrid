import React from 'react';
import '../styles/Placeholder.scss';

export default ({ loading }) => (
  <div className="placeholder">
    <div className="icon-container">
      <i className={`fa ${loading ? 'fa-spinner fa-spin' : 'fa-warning'}`} />
    </div>
    <div className="text">
      { loading ? (
        <React.Fragment>
          Loading <span>.</span><span>.</span><span>.</span>
        </React.Fragment>
        ): (
          <div className="droids">
            <div className="header">We couln't find the droids you we looking for.</div>
            <div className="small">Please Try A Different Query</div>
          </div>
        )}
    </div>
  </div>
)