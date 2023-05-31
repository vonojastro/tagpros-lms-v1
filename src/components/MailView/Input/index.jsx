import styled from 'styled-components';

const Wrapper = styled.input`
  border: none;
  width: 100%;
  background: transparent;
  display: grid;
  grid: auto-flow column;
`;
const Input = ({ className, children, ...otherProps }) => {
  return <Wrapper className={className} {...otherProps} />;
};
export default Input;
