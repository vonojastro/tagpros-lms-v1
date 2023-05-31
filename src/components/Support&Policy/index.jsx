import SideBarLink from 'components/common/SideBarLink';
import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FirstOverflowSection, FirstSection, Wrapper, Wrapper2 } from './style';
import { BsDot } from 'react-icons/bs';
import { MdPlayArrow } from 'react-icons/md';
import { IoSearchOutline } from 'react-icons/io5';
import { articles } from './articles';

const ArticleLinks = ({ article }) => {
  return (
    article.links &&
    article.links.map(link => (
      <div>
        <MdPlayArrow size='1.5em' color='#D9D9D9' />
        <Link to={link.to} key={link.label} target='_blank'>
          {link.label}
        </Link>
      </div>
    ))
  );
};

const SupportAndPolicy = () => {
  const pathname = useLocation().pathname;
  const [article, setArticle] = useState({
    title: 'Initial State',
    links: []
  });

  useEffect(() => {
    articles.map(article => article.folder === pathname && setArticle(article));
  }, [pathname]);

  let sidebarLinks = [
    {
      label: 'FAQs',
      to: '/support-and-policies',
      children: [
        {
          icon: <BsDot size='2em' />,
          label: 'General',
          to: '/support-and-policies'
        },
        {
          icon: <BsDot size='2em' />,
          label: 'Avoiding Problems in Your Class',
          to: '/support-and-policies/avoiding-problems-in-your-class'
        }
      ]
    },
    {
      label: 'Getting Started',
      to: '/support-and-policies/getting-started'
    },
    {
      label: "Teacher's Guide",
      to: '/support-and-policies/teachers-guide',
      children: [
        {
          icon: <BsDot size='2em' />,
          label: 'Getting Started',
          to: '/support-and-policies/teachers-guide'
        },
        {
          icon: <BsDot size='2em' />,
          label: 'Running Classes',
          to: '/support-and-policies/teachers-guide/running-classes'
        },
        {
          icon: <BsDot size='2em' />,
          label: 'Miscellaneous Topics',
          to: '/support-and-policies/teachers-guide/miscellaneous-topics'
        }
      ]
    },
    {
      label: 'Parents Guide',
      to: '/support-and-policies/parents-guide',
      children: [
        {
          icon: <BsDot size='2em' />,
          label: 'Getting Started',
          to: '/support-and-policies/parents-guide'
        },
        {
          icon: <BsDot size='2em' />,
          label: 'Choosing Classes',
          to: '/support-and-policies/parents-guide/choosing-classes'
        },
        {
          icon: <BsDot size='2em' />,
          label: 'Taking Classes',
          to: '/support-and-policies/parents-guide/taking-classes'
        }
      ]
    },
    { label: 'Enrollment Guide', to: '/support-and-policies/enrollment-guide' },
    {
      label: 'Policies',
      to: '/support-and-policies/policies',
      children: [
        {
          icon: <BsDot size='2em' />,
          label: 'Privacy and copyright policies',
          to: '/support-and-policies/policies'
        },
        {
          icon: <BsDot size='2em' />,
          label: 'Tagpros Community',
          to: '/support-and-policies/policies/tagpros-community'
        }
      ]
    }
  ];

  return (
    <Fragment>
      {/* HEADER */}
      <FirstOverflowSection pageProps={{ withNavBar: true, isNew: true }}>
        <FirstSection>
          <h1>
            <b>Support & Policies</b>
          </h1>
          <div>
            <IoSearchOutline size='2rem' color='#757575' />
            <form action='/search-policy'>
              <input type='text' placeholder='Ask us anything... ' name='query' />
            </form>
          </div>
        </FirstSection>
      </FirstOverflowSection>

      {/* MAIN CONTAINER */}
      <Wrapper>
        {/* SIDEBAR */}
        <aside>
          <ul id='sidebarnav'>
            {sidebarLinks.map(sidebarLink => (
              <SideBarLink key={sidebarLink.label} {...sidebarLink} isSuppAndPolicy />
            ))}
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main>
          {sidebarLinks.map(item =>
            pathname === item.to ||
            (item.children && item.children.find(({ to }) => pathname === to)) ? (
              <Wrapper2>
                {item.children ? (
                  item.children.map(({ to, label }) =>
                    pathname === to ? (
                      <h1>
                        {item.label} <span>|</span> {label}
                      </h1>
                    ) : label !== item.label ? (
                      ''
                    ) : (
                      <h1>{item.label}</h1>
                    )
                  )
                ) : (
                  <h1>{item.label}</h1>
                )}
                <div className='container'>
                  {!!article && <ArticleLinks article={article} />}
                </div>
              </Wrapper2>
            ) : (
              ''
            )
          )}
        </main>
      </Wrapper>
    </Fragment>
  );
};

export default SupportAndPolicy;
