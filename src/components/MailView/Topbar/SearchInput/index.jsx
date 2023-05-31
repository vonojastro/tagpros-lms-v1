import React, { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import styled from 'styled-components';
import { getAllEmailThreadsByUser } from 'api/emailMessaging';
import { useNavigate } from 'react-router';

const Wrapper = styled.div`
  display: grid;
  grid: 1fr / auto-flow auto 1fr;
  align-items: center;
  gap: 0.2rem;
`;

export default function SearchInput({left}) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (!items.length)
      getAllEmailThreadsByUser(undefined)
        .then(setItems)
        .catch(err => {
          console.log(err);
        });
  }, [items.length]);
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div>{left}</div>
      <ReactSearchAutocomplete
        items={items}
        resultStringKeyName='mailSubject'
        onSelect={({ threadId }) => navigate(`/mail/view/${threadId}`)}
        fuseOptions={{ keys: ['mailSubject', 'sender'] }}
      />
    </Wrapper>
  );
}
