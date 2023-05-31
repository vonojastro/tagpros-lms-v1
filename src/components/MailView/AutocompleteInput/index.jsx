import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useFieldArray } from 'react-final-form-arrays';
const Wrapper = styled.div`
  svg {
    display: none;
  }
`;

export default function AutocompleteInput({ name, ...reactSearchAutocompleteProps }) {
  const fieldArray = useFieldArray(name);
  const [searchString, setSearchString] = useState('');
  const wrapperRef = useRef(null);
  const handleSelect = item => {
    if (
      !fieldArray.fields.value.find(({ senderId }) => item.senderId === senderId)
    )
      fieldArray.fields.push(item);
    setSearchString('');
  };

  const handleSearch = string => {
    setSearchString(string);
  };
  return (
    <Wrapper ref={wrapperRef}>
      <ReactSearchAutocomplete
        autoFocus
        {...reactSearchAutocompleteProps}
        onSelect={handleSelect}
        inputSearchString={searchString}
        onSearch={handleSearch}
      />
    </Wrapper>
  );
}
