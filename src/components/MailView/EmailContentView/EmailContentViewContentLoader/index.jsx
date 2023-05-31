import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default function EmailContentViewContentLoader() {
  return (
    <Container>
      <ContentLoader
        speed={2}
        width='100%'
        height='100%'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
      >
        <rect x='65' y='0' rx='3' ry='3' width='30ch' height='40' />

        <circle cx='24' cy='95' r='25' />
        <rect x='65' y='70' rx='3' ry='3' width='100%' height='50' />

        <circle cx='24' cy='200' r='25' />
        <rect x='65' y='175' rx='3' ry='3' width='100%' height='50' />

        <circle cx='24' cy='305' r='25' />
        <rect x='65' y='280' rx='3' ry='3' width='100%' height='50' />

        <circle cx='24' cy='410' r='25' />
        <rect x='65' y='385' rx='3' ry='3' width='100%' height='50' />

        <circle cx='24' cy='515' r='25' />
        <rect x='65' y='490' rx='3' ry='3' width='100%' height='50' />

        <circle cx='24' cy='620' r='25' />
        <rect x='65' y='595' rx='3' ry='3' width='100%' height='50' />

        <circle cx='24' cy='725' r='25' />
        <rect x='65' y='700' rx='3' ry='3' width='100%' height='50' />
      </ContentLoader>
    </Container>
  );
}
