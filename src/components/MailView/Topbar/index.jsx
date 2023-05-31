import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: ${props => props.theme.custom.sidebarWidth} 1fr;
  grid-area: topbar;
  gap: ${props => props.theme.custom.mainGap};
  padding-top: 0.5em;
  align-items: center;
`;
