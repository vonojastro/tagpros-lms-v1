import Page from 'components/Page';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FirstOverflowSection, FirstSection, SearchDiv, Wrapper2 } from './style';
import Fuse from 'fuse.js';
import { articlesLink } from './links';
import { MdPlayArrow } from 'react-icons/md';
import Tagpi from 'components/common/Tagpi';
import { IoSearchOutline } from 'react-icons/io5';

const SearchPolicyPage = () => {
  const [params] = useSearchParams();
  const query = params.get('query').split(' ');
  const [articles, setArticles] = useState([{ item: { label: '', to: '/' } }]);

  useEffect(() => {
    let searchArr = [];

    query.forEach(q =>
      q.length >= 4
        ? searchArr.push(q)
        : (q.length === 3 && q.toLowerCase() === 'faq') || q.toLowerCase() === 'how'
        ? searchArr.push(q)
        : q
    );

    const fuseSearchOptions = {
      includeScore: true,
      keys: [{ name: 'label', weight: 7 }],
      useExtendedSearch: true
    };
    const fuse = new Fuse(articlesLink, fuseSearchOptions);
    const request = searchArr.length
      ? fuse.search({ label: `'${searchArr} | ${searchArr}` })
      : fuse.search({ label: `!1234567890` });
    setArticles(request);
  }, [query]);

  return (
    <Fragment>
      <FirstOverflowSection pageProps={{ withNavBar: true, isNew: true }}>
        <FirstSection className='search-page'>
          <h1>
            <b>Support & Policies</b>
          </h1>
        </FirstSection>
      </FirstOverflowSection>
      <Page>
        <SearchDiv>
          <Wrapper2>
            <form action='/search-policy'>
              <IoSearchOutline size='2rem' color='#757575' />
              <input
                type='text'
                name='query'
                defaultValue={params.get('query')}
                autoFocus
                placeholder='Search policies'
              />
              <input type='submit' value='Search' />
            </form>
            <div>
              {articles.length ? (
                articles?.map(article => (
                  <div>
                    <MdPlayArrow size='1.5em' color='#D9D9D9' />
                    <Link to={article.item.to} key={article.item.label} target='_blank'>
                      {article.item.label}
                    </Link>
                  </div>
                ))
              ) : (
                <Tagpi
                  type='noData'
                  customMessage='Uh oh! No policies found. Try searching again.'
                  dataName='Classes'
                />
              )}
            </div>
          </Wrapper2>
        </SearchDiv>
      </Page>
    </Fragment>
  );
};

export default SearchPolicyPage;
