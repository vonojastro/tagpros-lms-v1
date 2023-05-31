import React from 'react';
import { BulletList } from 'react-content-loader';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  margin-top: -20px;
`;
export default function EmailListContentLoader() {
  return (
    <Container>
      <BulletList height={300} />
      <BulletList height={300} />
      <BulletList height={300} />
    </Container>
  );
}
