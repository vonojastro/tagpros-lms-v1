import CD from 'components/common/ClassDetails';
import styled from 'styled-components';
import P from '../Page';
const listViewStyles = `
    .teacher-thumbnail {
      height: 50% !important;
    }
    grid-template-columns: 1fr 1fr !important;
    align-items: flex-start !important;
    > *:first-child {
        grid-column-start: 1;
        grid-row: 1/9;
    }
    > *:nth-child(2) {
        align-self: flex-end;
    }
    > *:not(first-child) {
        grid-column-start: 2;
    }
`;

export const Page = styled(P)`
  min-height: 100vh;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content min-content min-content min-content;
  /* > * {
    height: min-content;
  } */

  gap: 3rem;
  .filter__1 {
    grid-column: 1 / -1;
    grid-auto-flow: column;
    display: grid;
    align-items: center;
    justify-content: end;
    gap: 2rem;
  }
  .filter__2 {
    display: grid;
    gap: 3rem;
    align-self: flex-start;
    align-items: flex-start;

    grid-column: 1 / -1;
    grid-template-rows: min-content min-content;
    align-items: flex-start;
    > * {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr 1fr;
      @media (min-width: 1280px) {
        grid-template-columns: 1fr;
      }
      > *:first-child {
        grid-column: 1 / -1;
      }
      align-items: center;
    }
  }
  section:last-child {
    grid-column: 1 / -1 !important;
  }
  @media (min-width: 1280px) {
    .filter__2 {
      width: 15rem;
      grid-column: span 1;
    }
    section:last-child {
      grid-column: 2 / -1 !important;
    }
  }
`;
export const ResultsLayout = styled.div`
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)) !important;
`;
export const ClassDetails = styled(CD)`
  grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
  .class-intro-text {
  overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 5; /* number of lines to show */
           line-clamp: 5; 
   -webkit-box-orient: vertical;
  }
  > * {
    grid-template-rows: min-content min-content  min-content min-content min-content min-content min-content 1fr;
    grid-column: ${props => !props.gridView && '1 / -1'};
    ${props => !props.gridView && listViewStyles};
  }
`;
