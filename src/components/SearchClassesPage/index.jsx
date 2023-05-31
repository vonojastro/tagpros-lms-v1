import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActiveClasses } from 'api/class';
import Section from 'components/Page/Section';
import SearchClassesInput from 'components/common/SearchClassesInput';
import { ClassDetails, Page } from './styles';
import { Field, Form } from 'react-final-form';
import { CheckboxArrayControl, SelectControl } from 'components/common/Form/Inputs';
import { AGE_CATEGORIES as AC } from 'utils/constants';
import AutoSubmit from 'components/common/Form/AutoSubmit';
import Fuse from 'fuse.js';
import { useSearchParams } from 'react-router-dom';
import _  from 'lodash';
import Tagpi from 'components/common/Tagpi';
import { getDuration } from 'utils/utils';
import { Grid, List } from 'react-feather';
import { useToggle } from 'rooks';
import { classCategoriesSelector, getStatusDisplays, scheduleListSelector } from 'redux/selectors';
import moment from 'moment';
import { compareStatusDisplay } from 'components/Landing';
import OverflowSection from 'components/Page/OverflowSection';

const AGE_CATEGORIES = AC.map(e => {
  e.value = e.label;
  return e;
});
// import _ from "lodash";
/* eslint-disable */

// returns all unique categoryCode from class array
const fuseSearchOptions = {
  includeScore: true,
  keys: ['title', 'classIntroduction', 'categoryCode', 'ageCategory', 'schedule', 'statusDisplay'],
  useExtendedSearch: true
};
export default function SearchClassesPage() {
  const [isGridView, toggleGridView] = useToggle(true);
  const dispatch = useDispatch();
  const allClasses = useSelector(state =>
    state.classes
      ? state.classes
          .getIn(['data', 'class'])
          .map(e => ({ ...e, duration: getDuration(e.startTime, e.endTime, true) }))
      : []
  );
  const [fuse, setFuse] = useState(null);
  const [results, setResults] = useState([]);
  const Entities = require('html-entities').XmlEntities;
  const he = new Entities();

  let loading = useSelector(state => state.uiElements.getIn(['loadingScreen']));

  const [params] = useSearchParams();

  // When searching from ie: landing page, prefilters is present

  useEffect(() => {
    if (!Boolean(fuse) && allClasses.length) {
      const f = new Fuse(
        allClasses.map(e => ({
          ...e,
          title: he.decode(e.title),
          classIntroduction: he.decode(e.classIntroduction),
          schedule: moment(e.startDate, 'YYYY/MM/DD').format('MMMM YYYY')
        })),
        fuseSearchOptions
      );
      setFuse(f);
    }
  }, [allClasses.length, Boolean(fuse)]);

  const categoryCodes = useSelector(classCategoriesSelector);
  let schedules = useSelector(scheduleListSelector);
  schedules = schedules.map(v => ({ label: v, value: v }));

  const handleSubmit = ({ categoryCode, ageCategory, schedule, statusDisplay, query }) => {
    let newResults = [];
    const queries = [];
    if (Boolean(query) && _.trim(query)?.length) {
      queries.push({
        $or: [{ title: query }, { classIntroduction: query }]
      });
    }

    if (statusDisplay?.length)
      queries.push({
        $or: statusDisplay.map(statusDisplay => ({ statusDisplay: `'${statusDisplay}` }))
      });

    if (ageCategory?.length)
      queries.push({
        $or: ageCategory.map(ageCategory => ({ ageCategory: `'${ageCategory}` }))
      });

    if (categoryCode?.length)
      queries.push({
        $or: categoryCode.map(categoryCode => ({ categoryCode: `'${categoryCode}` }))
      });

    if (schedule?.length)
      queries.push({
        $or: schedule.map(schedule => ({ schedule: `'${schedule}` }))
      });


    try {
      const fuseResults = queries?.length ? fuse.search({
        $and: queries
      }) : fuse.search({ title: '!1234567890' });;
      newResults = fuseResults;
    } catch (error) {
      newResults = [];
    } finally {
      setResults(newResults);
    }
  };

  useEffect(() => {
    if (!allClasses.length) getAllActiveClasses(dispatch);
  }, [allClasses.length]);

  const getSortedData = category => {
    let ret = []
    if (category === 'item.pricePerSession' ) {
      ret = _.sortBy(results, e => parseFloat(( e?.item?.price ) || 0)).map(e => e.item);
    }

    else { 
      ret = _.orderBy(results, [category]).map(e => e.item);
    }

    if(category !== 'item.pricePerSession' && category !== 'item.statusDisplay') {
      ret.sort(compareStatusDisplay);
    }
    
    return ret;
  };

  const initialValues = useMemo(
    () => ({
      query: params?.get('query'),
      sortBy: 'score',
      limit: 10,
      categoryCode: params.has('categoryCode') ? [params.get('categoryCode')] : []
    }),
    [params.get('query'), params.get('categoryCode'), Boolean(fuse)]
  );

  const STATUS_DISPLAYS = useSelector(getStatusDisplays)

  return (
    <Form
      withNavBar
      withFooter
      isNew
      onSubmit={handleSubmit}
      subscription={{ initialValues: true, values: true }}
      initialValues={initialValues}
    >
      {({ handleSubmit, values }) => {
        return (
          <Fragment>
            <OverflowSection
              pageProps={{ withNavBar: true }}
              wrapperProps={{
                style: {
                  backgroundImage:
                    'url(/static/media/school_whiteboard.64986bec.png)',
                },
                  className: 'pb-4 mb-3'
              }}
              navBarProps = {{
                  transparentOnTop: true
              }}
            >
              <Section>
                <Field
                  type='text'
                  name='query'
                  disabled={false}
                  autoFocus={true}
                  component={fieldProps => (
                    <SearchClassesInput variant='hero' {...fieldProps} />
                  )}
                />
              </Section>
            </OverflowSection>
            <Page onSubmit={handleSubmit} withFooter>
              <Section className='filter__1'>
                <SelectControl
                  required={false}
                  name='sortBy'
                  options={[
                    { label: 'Relevance', value: 'score' },
                    { label: 'Price', value: 'item.pricePerSession' },
                    { label: 'Duration', value: 'item.duration' }
                  ]}
                />
                <Grid
                  onClick={() => !isGridView && toggleGridView(true)}
                  color={isGridView ? '#f1c40f' : 'gray'}
                />
                <List
                  onClick={() => isGridView && toggleGridView(false)}
                  color={!isGridView ? '#f1c40f' : 'gray'}
                />
              </Section>
              <Section
                className='filter__2'
                style={{
                  display: loading || !allClasses.length ? 'none' : 'inherit'
                }}
              ><div>
                  <h4>
                    <b>STATUS</b>
                  </h4>
                  <CheckboxArrayControl name={'statusDisplay'} options={STATUS_DISPLAYS} />
                </div>
                <div>
                  <h4>
                    <b>AGE</b>
                  </h4>
                  <CheckboxArrayControl name={'ageCategory'} options={AGE_CATEGORIES} />
                </div>
                <div>
                  <h4>
                    <b>SUBJECT</b>
                  </h4>
                  <CheckboxArrayControl name={'categoryCode'} options={categoryCodes} />
                </div>
                <div>
                  <h4>
                    <b>SCHEDULES</b>
                  </h4>
                  <CheckboxArrayControl name={'schedule'} options={schedules} />
                </div>
              </Section>
              <Section
                style={{
                  gridColumn: loading || !allClasses.length ? '1 / -1' : 'inherit'
                }}
              >
                <ClassDetails
                  gridView={isGridView}
                  data={getSortedData(values?.sortBy)}
                  loading={loading}
                  loadingPlaceholder={
                    <Tagpi type='loading' dataName='Classes' showSpinner={true} />
                  }
                  emptyDataPlaceholder={
                    <Tagpi
                      type='noData'
                      customMessage='Uh oh! No classes found. Try searching again.'
                      dataName='Classes'
                    />
                  }
                />
              </Section>
              <AutoSubmit save={handleSubmit} debounce={0} />
            </Page>
          </Fragment>
        );
      }}
    </Form>
  );
}
// {
//   "id": 34,
//   "classId": "CLS006",
//   "title": "Class",
//   "categoryCode": "Visual Arts",
//   "subCategoryCode": "Painting",
//   "ageCategory": "4-6 years",
//   "skillLevel": "SLVL001",
//   "classIntroduction": "This is a brief introduction to class.",
//   "learningGoals": "Learning goals",
//   "externalResources": "External resource",
//   "thumbnailImage": "",
//   "classType": "CLT002",
//   "zoomLink": null,
//   "jitsiLink": "https://development.tagpros.us/meetings/CLS006",
//   "lengthSession": "Number of sessions",
//   "currency": "",
//   "price": null,
//   "pricePerSession": "150.00",
//   "passingGrade": null,
//   "status": "CSTAT004",
//   "lastName": "Test",
//   "firstName": "Teacher",
//   "salutation": "",
//   "nickname": "",
//   "email": "tagpros-teach@mailinator.com",
//   "teacherId": 661,
//   "photo": null,
//   "minLearners": 1,
//   "maxLearners": 20,
//   "dayAvailability": "everyday",
//   "classScheduleType": null,
//   "timeZone": "Asia/Manila",
//   "availableDates": null,
//   "startDate": "2021/11/11",
//   "endDate": "2021/11/11",
//   "startTime": "11:11:00",
//   "endTime": "12:12:00",
//   "enrollmentStartDate": null,
//   "enrollmentEndDate": null,
//   "createdDatetime": "2021/10/08 - 12:57 PM",
//   "updatedDatetime": "2021/10/18 - 04:37 PM"
// }
