import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { classCategoriesSelector } from 'redux/selectors';

const SearchClassesInput = ({
  className,
  inputParentClassName,
  variant,
  input,
  ...otherInputProps
}) => {
  const categoryCodes = useSelector(classCategoriesSelector);
  const renderClassRecommendations = () => {
    if (!categoryCodes?.length) return <Fragment />;
    return (
      <div className='form-recom'>
        We recommend:
        <div>
          {categoryCodes.map(({ value, label }, i) => (
            <span key={value} style={{ marginRight: '5px' }}>
              <Link to={`/search?categoryCode=${value}`} replace={true}>
                {label + (i !== categoryCodes.length - 1 ? ',' : '')}
              </Link>
            </span>
          ))}
        </div>
      </div>
    );
  };
  if (variant === 'hero')
    return (
      <div className='hero-action p-4'>
        <h4
          className='text-align-center'
          style={{
            display: 'grid',
            justifyContent: 'center',
            color: 'black',
            gridAutoFlow: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <i className='far fa-lightbulb' /> <b>What are you passionate about?</b>
        </h4>
        <form
          className={`form-horizontal form-material ${className}`}
          id='loginform'
          action='/search'
        >
          <div className='form-group mt-0'>
            <div className={`col-xs-12  form-G01-div`}>
              <input
                className='form-control mt-2 pl-3 '
                type='text'
                style={{ paddingRight: '50px' }}
                placeholder='Search Classes'
                name='query'
                id='loginform-input'
                {...input}
                {...otherInputProps}
              />
            </div>
          </div>
        </form>

        {renderClassRecommendations()}
        {/* {classData?.length > 0 && (
          <div className='mt-2 form-recom text-left'>
            We recommend:
            <br />
            {getCategoriesList(classData)?.map((item, index) => {
              return (
                index < 7 && (
                  <span>
                    <a href={`/search?query=${item}`} target='_blank' rel='noreferrer'>
                      {item}
                    </a>
                    {index < getCategoriesList(classData).length - 1 && ', '}
                  </span>
                )
              );
            })}
          </div>
        )} */}
      </div>
    );
  return (
    <form
      className={`form-horizontal form-material ${className}`}
      id='loginform'
      action='/search'
    >
      <div className='form-group mt-0'>
        <div className={`col-xs-12  ${inputParentClassName}`}>
          <input
            className='form-control mt-2 pl-3 '
            type='text'
            style={{ paddingRight: '50px' }}
            placeholder='Search Classes'
            name='query'
            id='loginform-input'
          />
        </div>
      </div>
    </form>
  );
};
export default SearchClassesInput;
