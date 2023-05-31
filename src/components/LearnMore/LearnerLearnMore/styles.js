import OverflowSection from 'components/Page/OverflowSection';
import Section from 'components/Page/Section';
import styled from 'styled-components';
import { Requirements as R } from '../TeacherLearnMore/styles';
import { Requirement as Req } from '../../Landing';

export const ThirdOverflowSection = styled(OverflowSection)`
  background-color: #edf7fc;
  background-size: cover !important;
  > * {
    color: white !important;
  }
`;
export const SecondOverflowSection = styled(OverflowSection)`
  background-image: linear-gradient(rgba(161, 128, 56, 0.884), rgba(168, 125, 44, 0.705)),
    url(/static/media/reg04.be1d5569.jpg) !important;
  background-size: cover !important;
  background-position: 50% !important;
  > * {
    color: white !important;
  }
`;
export const FirstOverflowSection = styled(OverflowSection)`
  background-image: linear-gradient(rgba(83, 127, 192, 0.884), rgba(82, 126, 167, 0.705)),
    url(/static/media/teacher.11d79af4.png) !important;
  background-size: cover !important;
  background-position: 50% !important;
  > * {
    color: white !important;
  }
`;

export const SecondSection = styled(Section)`
  display: grid;
  align-items: flex-start;
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

export const ThirdSection = styled(Section)`
  display: grid;
  gap: 2rem;
  > * {
    text-align: center;
  }
  h1 {
    margin: 0;
  }
`;

export const Requirement = styled(Req)`
  grid-template-rows: 2.5rem 1rem 1fr;
  gap: 2rem;
`;
export const Requirements = styled(R)`
  align-items: flex-start;
  gap: 3rem;
  > *:last-child {
    grid-column: 1 / -1;
  }
`;
