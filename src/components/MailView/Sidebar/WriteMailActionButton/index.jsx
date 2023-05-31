import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  padding: 0.8rem 1.5rem;
  font-family: inherit;
  font-size: 100%;
  border-radius: 10rem;
  margin: 1rem;
  width: fit-content;
  display: grid;
  grid-auto-flow: column;
  gap: 0.5rem;
  background-color: ${props => props.theme.colors.primary};
  border: 1px lightgray solid;
  font-size: 15px;
  :focus,
  :hover {
    background-color: ${props => props.theme.colors.primary};
    border: none;
  }
`;
const WriteMailActionButton = ({ onClick, isMobile }) => {
  return (
    <Container className='btn btn-info' onClick={onClick}>
      <div>
        <i className='fas fa-plus' />
      </div>
      {!isMobile && <div>Compose</div>}
    </Container>
  );
};
export default WriteMailActionButton;
