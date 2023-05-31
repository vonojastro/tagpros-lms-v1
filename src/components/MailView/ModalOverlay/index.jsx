import styled from 'styled-components';

const ModalOverlay = styled.div`
  transition: opacity 500ms;
  opacity: 0;
  position: absolute;
  width: 100%;
  background: black;
  height: 100%;
  opacity: ${props => (props.show ? 0.5 : 0)};
  pointer-events: ${props => (props.show ? 'all' : 'none')};
  z-index: 100;
`;

export default ModalOverlay;
