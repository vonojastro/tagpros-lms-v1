import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from 'api';
const Entities = require('html-entities').XmlEntities;
const he = new Entities();

const chunkArray = (myArray, chunk_size) => {
  var results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
};

export default function TopClasses() {
  const [classChunks, setClassChunks] = useState([]);
  const [loading, setLoading] = useState(!!!classChunks.length);

  React.useEffect(() => {
    if (!classChunks.length)
      api
        .get('/class-learner/getTopClassOfTheMonth')
        .then(({ data }) => {
          setLoading(true);
          setClassChunks(chunkArray(data, 4));
        })
        .finally(() => setLoading(false));
  }, [classChunks.length]);

  return (
    <div className='card card-default'>
      <div className='card-header'>
        <h4 className='card-title m-b-0'>Top Classes for the Month</h4>
      </div>

      <div className='card-body collapse show py-0'>
        <div
          className='text-center data-loading'
          style={{ display: loading ? 'block' : 'none' }}
        >
          <div className='spinner-border text-primary' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
          <div className='loading-text'>Loading Top Classes ...</div>
        </div>
        <div
          className='text-center data-loading'
          style={{ display: !loading && !classChunks.length ? 'block' : 'none' }}
        >
          <i>Nothing to show here</i>
        </div>
        <section>
          <div className='container px-0'>
            <div className='row'>
              {!loading && classChunks.length > 0 && (
                <div className='col-8'>
                  <a
                    className='btn btn-megna mb-3 mr-1'
                    href='#carouselExampleIndicators2'
                    role='button'
                    data-slide='prev'
                  >
                    <i className='fa fa-arrow-left' />
                  </a>
                  <a
                    className='btn btn-megna mb-3 '
                    href='#carouselExampleIndicators2'
                    role='button'
                    data-slide='next'
                  >
                    <i className='fa fa-arrow-right' />
                  </a>
                </div>
              )}
              {/* <div className="col-4 text-right">
                  <select className="custom-select">
                    <option selected>Filter by Rating</option>
                    <option value="#">By Subject</option>
                    <option value="#">By Time</option>
                    <option value="#">By Teacher</option>
                    <option value="#">By Price</option>
                  </select>
                </div> */}
              <div className='col-12'>
                <div
                  id='carouselExampleIndicators2'
                  className='carousel slide'
                  data-ride='carousel'
                  data-interval={10000}
                >
                  <div className='carousel-inner'>
                    {classChunks &&
                      classChunks.map((classes, index) => (
                        <div
                          className={
                            index === 0 ? 'carousel-item active' : 'carousel-item'
                          }
                        >
                          <div className='row'>
                            {classes &&
                              classes.map(item => (
                                <div className='col-md-3 mb-3'>
                                  <div className='card shadow-none mb-0'>
                                    <Link to={`/class/enroll/${item.CLASS_ID}`}>
                                      <img
                                        className='img-fluid'
                                        alt='100%x280'
                                        style={{
                                          width: '100%',
                                          height: '7vw',
                                          objectFit: 'cover'
                                        }}
                                        src={
                                          item.THUMBNAIL_IMAGE
                                            ? item.THUMBNAIL_IMAGE
                                            : '../assets/images/image-placeholder.jpg'
                                        }
                                      />
                                    </Link>
                                    <div className='card-body px-1 py-2'>
                                      <Link to={'/class/enroll/' + item.CLASS_ID}>
                                        <h4 className='card-title mb-1'>
                                          {he.decode(item.TITLE)}
                                        </h4>
                                      </Link>
                                      {!!item.TEACHER && (
                                        <p className='card-text mb-1'>
                                          by{' '}
                                          {!!item.TEACHER.SALUTATION
                                            ? item.TEACHER.SALUTATION
                                            : ''}{' '}
                                          {!!item.TEACHER.NICKNAME
                                            ? item.TEACHER.NICKNAME
                                            : `${item.TEACHER.LAST_NAME}, ${
                                                item.TEACHER.FIRST_NAME
                                              }`}
                                        </p>
                                      )}
                                      <p>
                                        <i className='fa fa-star' />
                                        <i className='fa fa-star' />
                                        <i className='fa fa-star' />
                                        <i className='fa fa-star' />
                                        <i className='fa fa-star-half-o' />
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
