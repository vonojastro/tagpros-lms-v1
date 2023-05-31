import styled from 'styled-components';
import { Document as D } from 'react-pdf/dist/esm/entry.webpack';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  overflow-x: none;
  display: flex;
  justify-content:center;
.react-pdf__Page__canvas {
    display:flex;
    justify-content:center;
    width: 100% !important;
    height: 100% !important;
}

`

export const Document = styled(D)`
  display: grid;
  justify-content: center;
  margin-top: 1rem;
  > a:first-child {
    margin-bottom: 0;
    padding-top: 2rem;
    .li {
      width: clamp(2rem, 2vw, 4rem) !important;
    }
    .lt {
      width: clamp(3rem, 40%, 13rem) !important;
    }
  }
`;
