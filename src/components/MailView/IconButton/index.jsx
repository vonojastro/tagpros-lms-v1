import React from 'react';
import styled from 'styled-components';
const Container = styled.button`
  padding: 0;
  color: ${p=>p.color};
  background: ${p=>p.background};
  border: 0;
  outline: inherit;
  :focus {
    border: none;
    outline: inherit;
  }
`;

export default function IconButton({ fa, ...otherProps }) {
  return <Container {...otherProps} className={`${fa} waves-effect waves-circle`} />;
}
