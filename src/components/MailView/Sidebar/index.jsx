import styled from 'styled-components';
const Sidebar = styled.div`
  position: absolute;
  z-index: 200;
  width: ${props => (props.expanded ? '80vw' : '0vw')};
  height: 100vh;
  background: white;
`;
export default Sidebar;
