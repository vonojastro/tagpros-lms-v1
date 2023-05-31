import { VscFilter } from "react-icons/vsc";
import { VscFilterFilled } from "react-icons/vsc";
import { ImArrowDown } from "react-icons/im";
import { ImArrowUp } from "react-icons/im";
import './columnFilter.css'
import { APPLICATION_STATUS, 
  CLASS_STATUS, ACCOUNT_STATUS,
  SCHOOL_LEADERS_STATUS,
  PAYMENT_STATUS,
  ENROLLMENT_STATUS,
  USER_TYPE} from "utils/constants";


const ColumnFilter = ({column, toggleSortFilter, setToggleSortFilter}) => {
  if (column.filterType === 'sortOnlyClass') {
    const {toggleSortBy, 
      clearSortBy, isSorted, isSortedDesc, accessorFilter} = column;
      const handleSort = (type)=>{
        if(type === 'asc'){
          if(!isSorted)toggleSortBy(false, true)
          if(isSorted && !isSortedDesc)clearSortBy()
          else toggleSortBy(false, true)
        }
        if(type === 'dsc'){
          if(!isSorted)toggleSortBy(true, true)
          if(isSorted && isSortedDesc)clearSortBy()
          else toggleSortBy(true, true)
        }
      }
    let buttonAsc = 'unsorted'; let buttonDsc = 'unsorted';
    if(isSorted){
      if(isSortedDesc){
        buttonAsc = 'sorted'; buttonDsc = 'sorted-active'
      }else{
        buttonAsc = 'sorted-active'; buttonDsc = 'sorted'
      }
    }
    return ( 
      <>
        <span className="container-filter-icons" onClick={()=>{
          if (toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter]) {
            setToggleSortFilter(p=>{
              let prev = p.toggleSortFilter;
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              return {...p, toggleSortFilter: {...prev}}
            })
          }
          else {
            setToggleSortFilter(p=>{
              let prev = p.toggleSortFilter;
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              return {...p, toggleSortFilter: {...prev, [accessorFilter]: true}}
            })
          }
        }}>
          {
            isSorted?
              isSortedDesc? 
                <i className={`fas fa-sort-down ml-1`} /> :
                <i className={`fas fa-sort-up ml-1`} />
            : <i className={`fas fa-sort ml-1`} />
          }
        </span>
        {
          toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter] && (
            <div id="container-filter" className="container-filter">
              <div className="container-filter-sort">
                <div className="button-div">
                  <button className={buttonAsc}
                  onClick={()=>handleSort('asc')}><ImArrowUp />
                    <p>Ascending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
                <div className="button-div">
                  <button className={buttonDsc}
                  onClick={()=>handleSort('dsc')}><ImArrowDown/>
                    <p>Descending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </>
    );
  }
  if (column.filterType === 'multipleSelectClass') {
    const {filterValue, setFilter, 
      preFilteredRows, toggleSortBy, 
      clearSortBy, isSorted, isSortedDesc, accessorFilter} = column;
    let status = [];
    let tempArray =[];
    for (let i = 0; i < preFilteredRows.length; i++) {
      if (!status.includes(preFilteredRows[i].original[accessorFilter])) {
        status = [...status, preFilteredRows[i].original[accessorFilter]]
      }
    }
    const handleCheckBox = (e)=>{
      if(e.target.checked){
        if(filterValue === undefined) setFilter([e.target.value])
        else if(!filterValue.includes(e.target.value)) setFilter([...filterValue, e.target.value])
      }else{
          tempArray = filterValue.filter(item => item !== e.target.value);
          setFilter(tempArray);
      }
    }
    const handleSort = (type)=>{
      if(type === 'asc'){
        if(!isSorted)toggleSortBy(false, true)
        if(isSorted && !isSortedDesc)clearSortBy()
        else toggleSortBy(false, true)
      }
      if(type === 'dsc'){
        if(!isSorted)toggleSortBy(true, true)
        if(isSorted && isSortedDesc)clearSortBy()
        else toggleSortBy(true, true)
      }
    }
    // const getValue = (value) => {
    //   if(
    //       this.props.userType === 'admeduc' && 
    //       value === APPLICATION_STATUS.PENDING
    //       ){
    //       return 'PENDING HR APPROVAL';
    //   }
    //   console.log('props.userType :', props.userType)

    //   return Object.keys(APPLICATION_STATUS).find(key => APPLICATION_STATUS[key] === value);
    // }
    let buttonAsc = 'unsorted'; let buttonDsc = 'unsorted';
    if(isSorted){
      if(isSortedDesc){
        buttonAsc = 'sorted'; buttonDsc = 'sorted-active'
      }else{
        buttonAsc = 'sorted-active'; buttonDsc = 'sorted'
      }
    }
    return ( 
      <>
        <span className="container-filter-icons" onClick={()=>{
          if (toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter]) {
            setToggleSortFilter(p=>{
              let prev = p.toggleSortFilter;
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              return {...p, toggleSortFilter: {...prev}}
            })
          }
          else {
            setToggleSortFilter(p=>{
              let prev = p.toggleSortFilter;
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              // return {...makeAllClose, [accessorFilter]: true}
              return {...p, toggleSortFilter: {...prev, [accessorFilter]: true}}
            })
          }
        }}>
          {
            isSorted?
              isSortedDesc? 
                <i className={`fas fa-sort-down ml-1`} /> :
                <i className={`fas fa-sort-up ml-1`} />
            : <i className={`fas fa-sort ml-1`} />
          }
          
          {
            filterValue === undefined 
            || 
            filterValue.length < 1
            ?
            <VscFilter /> : <VscFilterFilled />
          }
        </span>
        {
          toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter] && (
            <div id="container-filter" className="container-filter">
              <div className="container-filter-sort">
                <div className="button-div">
                  <button className={buttonAsc}
                  onClick={()=>handleSort('asc')}><ImArrowUp />
                    <p>Ascending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
                <div className="button-div">
                  <button className={buttonDsc}
                  onClick={()=>handleSort('dsc')}><ImArrowDown/>
                    <p>Descending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
              </div>
              <hr />
              {
                status.map((s,i)=>{
                  return(
                    <div key={i}>
                      <input className="checkbox" onClick={e=>{handleCheckBox(e)}} type="checkbox" name="status" id={s} value={s} checked={filterValue?.includes(s)} />
                      {/* <label for={s}>{getValue(s)}</label> */}
                      <label for={s}>{s}</label>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </>
    );
  }
  if (column.filterType === 'multipleSelectClassGetValue') {
    const {filterValue, setFilter, 
      preFilteredRows,
      //  toggleSortBy, 
      // clearSortBy, isSorted, isSortedDesc, 
      accessorFilter} = column;
    let status = [];
    let tempArray =[];
    for (let i = 0; i < preFilteredRows.length; i++) {
      if (!status.includes(preFilteredRows[i].original[accessorFilter])) {
        status = [...status, preFilteredRows[i].original[accessorFilter]]
      }
    }
    const handleCheckBox = (e)=>{
      if(e.target.checked){
        if(filterValue === undefined) setFilter([e.target.value])
        else if(!filterValue.includes(e.target.value)) setFilter([...filterValue, e.target.value])
      }else{
          tempArray = filterValue.filter(item => item !== e.target.value);
          setFilter(tempArray);
      }
    }
    // const handleSort = (type)=>{
    //   if(type === 'asc'){
    //     if(!isSorted)toggleSortBy(false, true)
    //     if(isSorted && !isSortedDesc)clearSortBy()
    //     else toggleSortBy(false, true)
    //   }
    //   if(type === 'dsc'){
    //     if(!isSorted)toggleSortBy(true, true)
    //     if(isSorted && isSortedDesc)clearSortBy()
    //     else toggleSortBy(true, true)
    //   }
    // }
    const getValue = (value) => {
      // if(
      //     this.props.userType === 'admeduc' && 
      //     value === APPLICATION_STATUS.PENDING
      //     ){
      //     return 'PENDING HR APPROVAL';
      // }
      // console.log('props.userType :', props.userType)

      return Object.keys(APPLICATION_STATUS).find(key => APPLICATION_STATUS[key] === value);
    }
    return ( 
      <>
        <span className="container-filter-icons" onClick={()=>{
          if (toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter]) {
            setToggleSortFilter(p=>{
              let prev = p.toggleSortFilter;
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              return {...p, toggleSortFilter: {...prev}}
            })
          }
          else {
            setToggleSortFilter(p=>{
              let prev = p.toggleSortFilter;
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              // return {...makeAllClose, [accessorFilter]: true}
              return {...p, toggleSortFilter: {...prev, [accessorFilter]: true}}
            })
          }
        }}>
          {/* {
            isSorted?
              isSortedDesc? 
                <i className={`fas fa-sort-down ml-1`} /> :
                <i className={`fas fa-sort-up ml-1`} />
            : <i className={`fas fa-sort ml-1`} />
          } */}
          
          {
            filterValue === undefined 
            || 
            filterValue.length < 1
            ?
            <VscFilter /> : <VscFilterFilled />
          }
        </span>
        {
          // true
          toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter] && (
            <div id="container-filter" className="container-filter">
              {/* <div className="container-filter-sort">
                <div className="button-div">
                  <button className={buttonAsc}
                  onClick={()=>handleSort('asc')}><ImArrowUp />
                    <p>Ascending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
                <div className="button-div">
                  <button className={buttonDsc}
                  onClick={()=>handleSort('dsc')}><ImArrowDown/>
                    <p>Descending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
              </div>
              <hr /> */}
              {
                status.map((s,i)=>{
                  return(
                    <div key={i}>
                      <input className="checkbox" onClick={e=>{handleCheckBox(e)}} type="checkbox" name="status" id={s} value={s} checked={filterValue?.includes(s)} />
                      <label for={s}>{getValue(s)}</label>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </>
    );
  }
  if (column.filterType === 'multipleSelect') {
    const {filterValue, setFilter, 
      preFilteredRows, 
      // toggleSortBy, 
      // clearSortBy, isSorted, isSortedDesc, 
      accessorFilter} = column;
    let status = [];
    let tempArray =[];
    for (let i = 0; i < preFilteredRows.length; i++) {
      if (!status.includes(preFilteredRows[i].original[accessorFilter])) {
        status = [...status, preFilteredRows[i].original[accessorFilter]]
      }
    }
    const handleCheckBox = (e)=>{
      if(e.target.checked){
        if(filterValue === undefined) setFilter([e.target.value])
        else if(!filterValue.includes(e.target.value)) setFilter([...filterValue, e.target.value])
      }else{
          tempArray = filterValue.filter(item => item !== e.target.value);
          setFilter(tempArray);
      }
    }
    // const handleSort = (type)=>{
    //   if(type === 'asc'){
    //     if(!isSorted)toggleSortBy(false, true)
    //     if(isSorted && !isSortedDesc)clearSortBy()
    //     else toggleSortBy(false, true)
    //   }
    //   if(type === 'dsc'){
    //     if(!isSorted)toggleSortBy(true, true)
    //     if(isSorted && isSortedDesc)clearSortBy()
    //     else toggleSortBy(true, true)
    //   }
    // }
    // let buttonAsc = 'unsorted'; let buttonDsc = 'unsorted';
    // if(isSorted){
    //   if(isSortedDesc){
    //     buttonAsc = 'sorted'; buttonDsc = 'sorted-active'
    //   }else{
    //     buttonAsc = 'sorted-active'; buttonDsc = 'sorted'
    //   }
    // }
    return ( 
      <>
        <span className="container-filter-icons" 
          onClick={()=>{
            if (toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter]) {
              setToggleSortFilter(prev=>{
                  Object.keys(prev).forEach(function(key){ prev[key] = false });
                return {...prev}
              })
            } else {
              setToggleSortFilter(prev=>{
                  Object.keys(prev).forEach(function(key){ prev[key] = false });
                return {...prev, [accessorFilter]: true}
              })
            }
          }}>
          {/* {
            isSorted?
              isSortedDesc? 
                <i className={`fas fa-sort-down ml-1`} /> :
                <i className={`fas fa-sort-up ml-1`} />
            : <i className={`fas fa-sort ml-1`} />
          } */}
          
          {
            filterValue === undefined 
            || 
            filterValue.length < 1
            ?
            <VscFilter /> : <VscFilterFilled />
          }
        </span>
        {
          toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter] && (
            <div id="container-filter" className="container-filter">
              {/* <div className="container-filter-sort">
                <div className="button-div">
                  <button className={buttonAsc}
                  onClick={()=>handleSort('asc')}><ImArrowUp />
                    <p>Ascending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
                <div className="button-div">
                  <button className={buttonDsc}
                  onClick={()=>handleSort('dsc')}><ImArrowDown/>
                    <p>Descending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
              </div> */}
              {/* <hr /> */}
              {
                status.map((s,i)=>{
                  if(s === '' || s === null){
                    return null;
                  }
                    return(
                      <div key={i}>
                        <input className="checkbox" onClick={e=>{handleCheckBox(e)}} type="checkbox" name="status" id={s} value={s} checked={filterValue?.includes(s)} />
                        <label for={s}>{s}</label>
                      </div>
                    )
                })
              }
            </div>
          )
        }
      </>
    );
  }
  if (column.filterType === 'multipleSelectPricingFor') {
    const {filterValue, setFilter, 
      preFilteredRows, 
      // toggleSortBy, 
      // clearSortBy, isSorted, isSortedDesc, 
      accessorFilter} = column;
    let status = [];
    let tempArray =[];
    for (let i = 0; i < preFilteredRows.length; i++) {
        if(preFilteredRows[i].original[accessorFilter].length >0){
          for (let j = 0; j < preFilteredRows.length; j++) {
            if (preFilteredRows[i].original[accessorFilter][j] !== null 
              && preFilteredRows[i].original[accessorFilter][j] !== undefined
              && preFilteredRows[i].original[accessorFilter][j] !== ''
              && !status.includes(preFilteredRows[i].original[accessorFilter][j])){
              status = [...status, preFilteredRows[i].original[accessorFilter][j]]
          }
        }
      }
    }
    const handleCheckBox = (e)=>{
      if(e.target.checked){
        if(filterValue === undefined) setFilter([e.target.value])
        else if(!filterValue.includes(e.target.value)) setFilter([...filterValue, e.target.value])
      }else{
          tempArray = filterValue.filter(item => item !== e.target.value);
          setFilter(tempArray);
      }
    }
    // const handleSort = (type)=>{
    //   if(type === 'asc'){
    //     if(!isSorted)toggleSortBy(false, true)
    //     if(isSorted && !isSortedDesc)clearSortBy()
    //     else toggleSortBy(false, true)
    //   }
    //   if(type === 'dsc'){
    //     if(!isSorted)toggleSortBy(true, true)
    //     if(isSorted && isSortedDesc)clearSortBy()
    //     else toggleSortBy(true, true)
    //   }
    // }
    // let buttonAsc = 'unsorted'; let buttonDsc = 'unsorted';
    // if(isSorted){
    //   if(isSortedDesc){
    //     buttonAsc = 'sorted'; buttonDsc = 'sorted-active'
    //   }else{
    //     buttonAsc = 'sorted-active'; buttonDsc = 'sorted'
    //   }
    // }
    return ( 
      <>
        <span className="container-filter-icons" 
          onClick={()=>{
            if (toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter]) {
              setToggleSortFilter(prev=>{
                  Object.keys(prev).forEach(function(key){ prev[key] = false });
                return {...prev}
              })
            } else {
              setToggleSortFilter(prev=>{
                  Object.keys(prev).forEach(function(key){ prev[key] = false });
                return {...prev, [accessorFilter]: true}
              })
            }
          }}>
          {/* {
            isSorted?
              isSortedDesc? 
                <i className={`fas fa-sort-down ml-1`} /> :
                <i className={`fas fa-sort-up ml-1`} />
            : <i className={`fas fa-sort ml-1`} />
          } */}
          
          {
            filterValue === undefined 
            || 
            filterValue.length < 1
            ?
            <VscFilter /> : <VscFilterFilled />
          }
        </span>
        {
          toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter] && (
            <div id="container-filter" className="container-filter">
              {/* <div className="container-filter-sort">
                <div className="button-div">
                  <button className={buttonAsc}
                  onClick={()=>handleSort('asc')}><ImArrowUp />
                    <p>Ascending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
                <div className="button-div">
                  <button className={buttonDsc}
                  onClick={()=>handleSort('dsc')}><ImArrowDown/>
                    <p>Descending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
              </div> */}
              {/* <hr /> */}
              {
                status.map((s,i)=>{
                  if(s === '' || s === null){
                    return null;
                  }
                    return(
                      <div key={i}>
                        <input className="checkbox" onClick={e=>{handleCheckBox(e)}} type="checkbox" name="status" id={s} value={s} checked={filterValue?.includes(s)} />
                        <label for={s}>{s}</label>
                      </div>
                    )
                })
              }
            </div>
          )
        }
      </>
    );
  }
  if (column.filterType === 'multipleSelectGetValue') {
    const {filterValue, setFilter, 
      preFilteredRows,
      getValueType,
      //  toggleSortBy, 
      // clearSortBy, isSorted, isSortedDesc, 
      accessorFilter} = column;
    let status = [];
    let tempArray =[];
    for (let i = 0; i < preFilteredRows.length; i++) {
      if (!status.includes(preFilteredRows[i].original[accessorFilter])) {
        status = [...status, preFilteredRows[i].original[accessorFilter]]
      }
    }
    const handleCheckBox = (e)=>{
      if(e.target.checked){
        if(filterValue === undefined) {
          setFilter([e.target.value])
        }
        else if(!filterValue.includes(e.target.value)) {
          setFilter([...filterValue, e.target.value])
        }
      }else{
          tempArray = filterValue.filter(item => item !== e.target.value);
          setFilter(tempArray);
      }
    }
    // const handleSort = (type)=>{
    //   if(type === 'asc'){
    //     if(!isSorted)toggleSortBy(false, true)
    //     if(isSorted && !isSortedDesc)clearSortBy()
    //     else toggleSortBy(false, true)
    //   }
    //   if(type === 'dsc'){
    //     if(!isSorted)toggleSortBy(true, true)
    //     if(isSorted && isSortedDesc)clearSortBy()
    //     else toggleSortBy(true, true)
    //   }
    // }
    const getValue = (type, value) => {
      if(type === 'ClassStatus'){
        // if(
        //     this.props.userType === 'admeduc' && 
        //     value === APPLICATION_STATUS.PENDING
        //     ){
        //     return 'PENDING HR APPROVAL';
        // }
        // console.log('props.userType :', props.userType)

        return Object.keys(CLASS_STATUS).find(key => CLASS_STATUS[key] === value);
      }
      if(type === 'SchoolLeadersStatus'){
        return Object.keys(SCHOOL_LEADERS_STATUS).find(key => SCHOOL_LEADERS_STATUS[key] === value);
      }
      if (type === 'PaymentHistoryStatus') {
        return Object.keys(PAYMENT_STATUS).find(key => PAYMENT_STATUS[key] === value);
      }
      if(type === 'PaymentHistoryPayout'){
        if(value !== ENROLLMENT_STATUS.FOR_PAYOUT && value !== ENROLLMENT_STATUS.PAYOUT_PAID){
          return 'unknown';
        }else{
            return Object.keys(ENROLLMENT_STATUS).find(key => ENROLLMENT_STATUS[key] === value);
        }
      }
      if(type === 'WebinarsStatus'){
        if (value === 'A') {
          return 'active'
        }else return 'inactive'
      }
      if(type === 'TeacherDashboardStatus'){
        return Object.keys(CLASS_STATUS).find(key => CLASS_STATUS[key] === value);
      }
    }
    // let buttonAsc = 'unsorted'; let buttonDsc = 'unsorted';
    // if(isSorted){
    //   if(isSortedDesc){
    //     buttonAsc = 'sorted'; buttonDsc = 'sorted-active'
    //   }else{
    //     buttonAsc = 'sorted-active'; buttonDsc = 'sorted'
    //   }
    // }
    return ( 
      <>
        <span className="container-filter-icons" onClick={()=>{
          if (toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter]) {
            setToggleSortFilter(prev=>{
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              return {...prev}
            })
          } else {
            setToggleSortFilter(prev=>{
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              return {...prev, [accessorFilter]: true}
            })
          }
        }}>
          {/* {
            isSorted?
              isSortedDesc? 
                <i className={`fas fa-sort-down ml-1`} /> :
                <i className={`fas fa-sort-up ml-1`} />
            : <i className={`fas fa-sort ml-1`} />
          } */}
          {
            filterValue === undefined 
            || 
            filterValue.length < 1
            ?
            <VscFilter /> : <VscFilterFilled />
          }
        </span>
        {
          toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter] && (
            <div id="container-filter" className="container-filter">
              {/* <div className="container-filter-sort">
                <div className="button-div">
                  <button className={buttonAsc}
                  onClick={()=>handleSort('asc')}><ImArrowUp />
                    <p>Ascending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
                <div className="button-div">
                  <button className={buttonDsc}
                  onClick={()=>handleSort('dsc')}><ImArrowDown/>
                    <p>Descending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
              </div> */}
              {/* <hr /> */}
              {
                status.map((s,i)=>{
                  if(s === '' || s === null){
                    return null;
                  }
                  return(
                    <div key={i}>
                      <input className="checkbox" onClick={e=>{handleCheckBox(e)}} type="checkbox" name="status" id={s} value={s} checked={filterValue?.includes(s)} />
                      <label for={s}>{
                      getValue(getValueType,s)
                      }</label>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </>
    );
  }
  if (column.filterType === 'multipleSelectAnnounce') {
    const {filterValue, setFilter, 
      preFilteredRows,
      //  toggleSortBy, 
      // clearSortBy, isSorted, isSortedDesc, 
      accessorFilter} = column;
    let status = [];
    let tempArray =[];
    for (let i = 0; i < preFilteredRows.length; i++) {
      if (!status.includes(preFilteredRows[i].original[accessorFilter])) {
        status = [...status, preFilteredRows[i].original[accessorFilter]]
      }
    }
    const handleCheckBox = (e)=>{
      // setFilter(['CSTAT002', 'CSTAT004']);
      if(e.target.checked){
        if(filterValue === undefined) {
          setFilter([e.target.value])
        }
        else if(!filterValue.includes(e.target.value)) {
          setFilter([...filterValue, e.target.value])
        }
      }else{
          tempArray = filterValue.filter(item => item !== e.target.value);
          setFilter(tempArray);
      }
    }
    // const handleSort = (type)=>{
    //   if(type === 'asc'){
    //     if(!isSorted)toggleSortBy(false, true)
    //     if(isSorted && !isSortedDesc)clearSortBy()
    //     else toggleSortBy(false, true)
    //   }
    //   if(type === 'dsc'){
    //     if(!isSorted)toggleSortBy(true, true)
    //     if(isSorted && isSortedDesc)clearSortBy()
    //     else toggleSortBy(true, true)
    //   }
    // }
    // const getValue = (value) => {
    //   // if(
    //   //     this.props.userType === 'admeduc' && 
    //   //     value === APPLICATION_STATUS.PENDING
    //   //     ){
    //   //     return 'PENDING HR APPROVAL';
    //   // }
    //   // console.log('props.userType :', props.userType)

    //   return Object.keys(CLASS_STATUS).find(key => CLASS_STATUS[key] === value);
    // }
    return ( 
      <>
        <span className="container-filter-icons" onClick={()=>{
          if (toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter]) {
            setToggleSortFilter(prev=>{
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              return {...prev}
            })
          } else {
            setToggleSortFilter(prev=>{
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              return {...prev, [accessorFilter]: true}
            })
          }
        }}>
          {
            filterValue === undefined 
            || 
            filterValue.length < 1
            ?
            <VscFilter /> : <VscFilterFilled />
          }
        </span>
        {
          toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter] && (
            <div id="container-filter" className="container-filter">
              {
                status.map((s,i)=>{
                  return(
                    <div key={i}>
                      <input className="checkbox" onClick={e=>{handleCheckBox(e)}} type="checkbox" name="status" id={s} value={s} checked={filterValue?.includes(s)} />
                      <label for={s}>{
                      s === 'A'? 'Active' : 'Inactive'
                      }</label>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </>
    );
  }
  if (column.filterType === 'multipleSelectManageEmail') {
    const {filterValue, setFilter, 
      preFilteredRows,
      //  toggleSortBy, 
      // clearSortBy, isSorted, isSortedDesc, 
      accessorFilter} = column;
    let status = [];
    let tempArray =[];
    for (let i = 0; i < preFilteredRows.length; i++) {
      if (!status.includes(preFilteredRows[i].original[accessorFilter])) {
        status = [...status, preFilteredRows[i].original[accessorFilter]]
      }
    }
    const handleCheckBox = (e)=>{
      if(e.target.checked){
        if(filterValue === undefined) {
          setFilter([e.target.value])
        }
        else if(!filterValue.includes(e.target.value)) {
          setFilter([...filterValue, e.target.value])
        }
      }else{
          tempArray = filterValue.filter(item => item !== e.target.value);
          setFilter(tempArray);
      }
    }
    // const handleSort = (type)=>{
    //   if(type === 'asc'){
    //     if(!isSorted)toggleSortBy(false, true)
    //     if(isSorted && !isSortedDesc)clearSortBy()
    //     else toggleSortBy(false, true)
    //   }
    //   if(type === 'dsc'){
    //     if(!isSorted)toggleSortBy(true, true)
    //     if(isSorted && isSortedDesc)clearSortBy()
    //     else toggleSortBy(true, true)
    //   }
    // }
    // const getValue = (value) => {
    //   // if(
    //   //     this.props.userType === 'admeduc' && 
    //   //     value === APPLICATION_STATUS.PENDING
    //   //     ){
    //   //     return 'PENDING HR APPROVAL';
    //   // }
    //   // console.log('props.userType :', props.userType)

    //   return Object.keys(CLASS_STATUS).find(key => CLASS_STATUS[key] === value);
    // }
    const getStatus = (key) => {
      switch (key) {
          case 'A':
              return "active"
          // case 'I':
          //     return "inactive"
          default:
              return "inactive"
      }
    }
    return ( 
      <>
        <span className="container-filter-icons" onClick={()=>{
          if (toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter]) {
            setToggleSortFilter(prev=>{
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              return {...prev}
            })
          } else {
            setToggleSortFilter(prev=>{
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              return {...prev, [accessorFilter]: true}
            })
          }
        }}>
          {
            filterValue === undefined 
            || 
            filterValue.length < 1
            ?
            <VscFilter /> : <VscFilterFilled />
          }
        </span>
        {
          toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter] && (
            <div id="container-filter" className="container-filter">
              {
                status.map((s,i)=>{
                  return(
                    <div key={i}>
                      <input className="checkbox" onClick={e=>{handleCheckBox(e)}} type="checkbox" name="status" id={s} value={s} checked={filterValue?.includes(s)} />
                      <label for={s}>{
                      getStatus(s)
                      }</label>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </>
    );
  }
  if (column.filterType === 'multipleSelectManageAccount') {
    const {filterValue, setFilter, 
      preFilteredRows,
      //  toggleSortBy, 
      // clearSortBy, isSorted, isSortedDesc, 
      accessorFilter} = column;
    let status = [];
    let tempArray =[];
    for (let i = 0; i < preFilteredRows.length; i++) {
      if (!status.includes(preFilteredRows[i].original[accessorFilter])) {
        status = [...status, preFilteredRows[i].original[accessorFilter]]
      }
    }
    const handleCheckBox = (e)=>{
      if(e.target.checked){
        if(filterValue === undefined) {
          setFilter([e.target.value])
        }
        else if(!filterValue.includes(e.target.value)) {
          setFilter([...filterValue, e.target.value])
        }
      }else{
          tempArray = filterValue.filter(item => item !== e.target.value);
          setFilter(tempArray);
      }
    }
    // const handleSort = (type)=>{
    //   if(type === 'asc'){
    //     if(!isSorted)toggleSortBy(false, true)
    //     if(isSorted && !isSortedDesc)clearSortBy()
    //     else toggleSortBy(false, true)
    //   }
    //   if(type === 'dsc'){
    //     if(!isSorted)toggleSortBy(true, true)
    //     if(isSorted && isSortedDesc)clearSortBy()
    //     else toggleSortBy(true, true)
    //   }
    // }
    // const getValue = (value) => {
    //   // if(
    //   //     this.props.userType === 'admeduc' && 
    //   //     value === APPLICATION_STATUS.PENDING
    //   //     ){
    //   //     return 'PENDING HR APPROVAL';
    //   // }
    //   // console.log('props.userType :', props.userType)

    //   return Object.keys(CLASS_STATUS).find(key => CLASS_STATUS[key] === value);
    // }
    const getStatus = (key) => {
      switch (key) {
          case ACCOUNT_STATUS.ACTIVE:
              return "active"
          case ACCOUNT_STATUS.DEACTIVATED:
              return "deactivated"
          case ACCOUNT_STATUS.SUSPENDED:
              return "suspended"
          default:
              return "pending"
      }
    }
    return ( 
      <>
        <span className="container-filter-icons" onClick={()=>{
          if (toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter]) {
            setToggleSortFilter(prev=>{
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              return {...prev}
            })
          } else {
            setToggleSortFilter(prev=>{
                Object.keys(prev).forEach(function(key){ prev[key] = false });
              return {...prev, [accessorFilter]: true}
            })
          }
        }}>
          {
            filterValue === undefined 
            || 
            filterValue.length < 1
            ?
            <VscFilter /> : <VscFilterFilled />
          }
        </span>
        {
          toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter] && (
            <div id="container-filter" className="container-filter">
              {
                status.map((s,i)=>{
                  if(s === null || s === ''){
                    return null;
                  }
                  return(
                    <div key={i}>
                      <input className="checkbox" onClick={e=>{handleCheckBox(e)}} type="checkbox" name="status" id={s} value={s} checked={filterValue?.includes(s)} />
                      <label for={s}>
                      {accessorFilter === 'status'?
                      getStatus(s) : USER_TYPE[s]
                      }</label>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </>
    );
  }
  if (column.filterType === 'sortOnly') {
    const {toggleSortBy, 
      clearSortBy, isSorted, isSortedDesc, accessorFilter,
    } = column;
    const handleSort = (type)=>{
      if(type === 'asc'){
        if(!isSorted)toggleSortBy(false, true)
        if(isSorted && !isSortedDesc)clearSortBy()
        else toggleSortBy(false, true)
      }
      if(type === 'dsc'){
        if(!isSorted)toggleSortBy(true, true)
        if(isSorted && isSortedDesc)clearSortBy()
        else toggleSortBy(true, true)
      }
    }
    let buttonAsc = 'unsorted'; let buttonDsc = 'unsorted';
    if(isSorted){
      if(isSortedDesc){
        buttonAsc = 'sorted'; buttonDsc = 'sorted-active'
      }else{
        buttonAsc = 'sorted-active'; buttonDsc = 'sorted'
      }
    }
    return ( 
      <>
        <span className="container-filter-icons" onClick={()=>{
          if (toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter]) {
            setToggleSortFilter(prev=>{
                let data = prev;
                Object.keys(data).forEach(function(key){ data[key] = false });
              return {...data}
            })
          } else {
            setToggleSortFilter(prev=>{
                let data = prev;
                Object.keys(data).forEach(function(key){ data[key] = false });
              return {...data, [accessorFilter]: true}
            })
          }
        }}>
          {
            isSorted?
              isSortedDesc? 
                <i className={`fas fa-sort-down ml-1`} /> :
                <i className={`fas fa-sort-up ml-1`} />
            : <i className={`fas fa-sort ml-1`} />
          }
        </span>
        {
          toggleSortFilter.hasOwnProperty(accessorFilter) && toggleSortFilter[accessorFilter] && (
            <div id="container-filter" className="container-filter">
              <div className="container-filter-sort">
                <div className="button-div">
                  <button className={buttonAsc}
                  onClick={()=>handleSort('asc')}><ImArrowUp />
                    <p>Ascending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
                <div className="button-div">
                  <button className={buttonDsc}
                  onClick={()=>handleSort('dsc')}><ImArrowDown/>
                    <p>Descending</p>
                    <div className="triangle"></div>
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </>
    );
  }
  return null
}
export default ColumnFilter;