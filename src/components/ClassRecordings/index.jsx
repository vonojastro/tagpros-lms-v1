import React from 'react';
import ReactPlayer from 'react-player';
import _ from 'lodash';

const ClassRecordings = ({ recordings }) => {
  const formattedRecordings = _.groupBy(
    _.sortBy(recordings, ({ fileName }) => {
      const dateRecorded = new Date(fileName.split(' ')[2]);
      const [hoursInDateRecorded, minutesInDateRecorded] = fileName
        .split(' ')[3]
        .split('.')[0]
        .split('-');
      dateRecorded.setHours(hoursInDateRecorded, minutesInDateRecorded);
      return dateRecorded.getTime();
    }),
    ({ fileName }) => fileName.split(' ')[2]
  );

  return Object.keys(formattedRecordings).map(dateRecorded => (
    <div key={dateRecorded} style={{ marginBottom: '1rem' }}>
      <h6>{dateRecorded}</h6>
      <ol
        style={{
          display: 'grid',
          gridTemplateColumns:
            'grid-template-columns: repeat( auto-fit, minmax(250px, 1fr)'
        }}
      >
        {formattedRecordings[dateRecorded].map(({ link, fileName }) => (
          <li key={fileName}>
            <ReactPlayer url={link} controls width={'100%'} height={'100%'} />
          </li>
        ))}
      </ol>
    </div>
  ));
};
export default ClassRecordings;
