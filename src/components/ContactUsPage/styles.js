import OverflowSection from 'components/Page/OverflowSection';
import Section from 'components/Page/Section';
import styled from 'styled-components';

export const FirstOverflowSection = styled(OverflowSection)`
  background-size: cover !important;
  background-position: 50% !important;
  background-image: linear-gradient(#1f90e0, rgba(123, 151, 170, 0.705)),
    url(/static/media/teacher.11d79af4.png) !important;
  > * {
    color: white !important;
  }
`;

export const FirstSection = styled(Section)`
  display: grid;
  grid-template-rows: auto auto;
  align-items: center;
  gap: 2rem;
  h1 {
    margin: 0;
    color: white !important;
  }
`;
