import * as React from 'react';

export const Header: React.FunctionComponent<{ compiler: string, framework: string }> = (props) => {
  return (
    <div>
      <div>{props.compiler}</div>
      <div>{props.framework}</div>
    </div>
  );
}