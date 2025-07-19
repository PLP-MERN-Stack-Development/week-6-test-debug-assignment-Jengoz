// client/src/components/Button.jsx

import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const baseClass = `btn-${variant} btn-${size}`;
  const disabledClass = disabled ? 'btn-disabled' : '';
  const finalClass = `${baseClass} ${disabledClass} ${className}`.trim();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={finalClass}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
