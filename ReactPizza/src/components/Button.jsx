import React from 'react';
import classNames from 'classnames';


const button = ({ onClick, children, outline, className, style }) => {

  return (
    <button
      onClick={() => onClick()}
      className={classNames("button", className, {
        'button--outline': outline,
      })}
      style={style}>
      {children}
    </button>
  );
};

export default button;