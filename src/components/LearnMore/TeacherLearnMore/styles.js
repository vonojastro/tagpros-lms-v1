import OverflowSection from 'components/Page/OverflowSection';
import Section from 'components/Page/Section';
import styled from 'styled-components';
export const Notice = styled.div`
  @media (max-width: 1199px) {
    > *:first-child {
      margin-bottom: 2rem;
    }

    .col-xl-5 {
      padding-inline: 0 !important;
    }
  }
`;
export const Requirements = styled.div`
  display: grid;
  align-items: center;
  h1 {
    margin: 0;
  }
  gap: 4rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
export const ThirdSection = styled(Section)`
  display: grid;
  grid-template-rows: auto auto;
  align-items: center;
  h1 {
    margin: 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  gap: 2rem;
  > *:nth-child(3) {
    display: grid;
    gap: 2rem;
    @media (min-width: 700px) {
      grid-template-columns: 20rem auto;
    }
  }
`;

export const SecondSection = styled(Section)`
  display: grid;
  align-items: center;
  gap: 2rem;
  h1 {
    margin: 0;
  }
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  img {
    object-fit: contain !important;
  }
  @media (max-width: 1137px) {
    > *:last-child {
      grid-column: 1 / -1;
    }
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

export const FirstOverflowSection = styled(OverflowSection)`
  background-image: linear-gradient(rgba(83, 127, 192, 0.884), rgba(82, 126, 167, 0.705)),
    url(/static/media/teacher.11d79af4.png) !important;
  background-size: cover !important;
  background-position: 50% !important;
`;
