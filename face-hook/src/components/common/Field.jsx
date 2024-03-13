/* eslint-disable react/prop-types */

import React from "react";

export default function Field({ label, children, htmlFor, error }) {
  const id = htmlFor || getChild(children);
  return (
    <div className="form-control">
      {label && (
        <label className="auth-label" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="text-xs text-red-500">
          {error.message}
        </div>
      )}
    </div>
  );
}

const getChild = (children) => {
  const child = React.Children.only(children);

  if ("id" in child.props) {
    return child.props.id;
  }
};
