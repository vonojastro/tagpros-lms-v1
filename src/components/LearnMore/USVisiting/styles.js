import OverflowSection from 'components/Page/OverflowSection';
import Section from 'components/Page/Section';
import styled from 'styled-components';
export const Details = styled.div`
  display: grid;
  gap: 2rem;
  p {
    margin: 0 !important;
  }
`;
export const Detail = styled.div`
  display: grid;
  @media (min-width: 900px) {
    grid-template-columns: ${({ reverse }) => (reverse ? 'auto 25rem' : '25rem auto')};
  }
  gap: 2rem;
  > p {
    padding: 1.5rem;
    order: ${({ reverse }) => (reverse ? -1 : 1)};
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
export const FirstOverflowSection = styled(OverflowSection)`
  background-image: linear-gradient(#00abdb, rgba(123, 165, 170, 0.705)),
    url(/static/media/teacher.11d79af4.png) !important;
  background-size: cover !important;
  > * {
    color: white !important;
  }
`;

export const SecondSection = styled(Section)`
  display: grid;
  align-items: center;
  @media (min-width: 900px) {
    grid-template-columns: 25rem auto;
  }
  gap: 2rem;
  p {
    padding: 0;
    margin: 0;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
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
