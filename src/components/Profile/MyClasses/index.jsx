import { getAllClasses } from "api/class";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css';
const Entities = require('html-entities').XmlEntities;
const he = new Entities();


export default function MyClasses() {
  const dispatch = useDispatch();
  const classes = useSelector((state) =>
    state.classes ? state.classes.getIn(["data", "class"]) : []
  );

  const applicationStatus = useSelector(
    (state) => state.teacherApp.data.applicationStatus
  );

  React.useEffect(() => {
    getAllClasses(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card-body">
      <div className="row el-element-overlay">
        <div className="col-md-12 m-b-20">
          <div style={{ width: "50%", float: "left" }}>
            <h3 className="card-title">All Classes</h3>
          </div>
          <div style={{ width: "50%", float: "right" }} className="text-right ">
            {applicationStatus === "ASTAT008" ? (
              <a href="/createClass" className="btn btn-info">
                + Create New Class
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
        {classes.map(({ title, classIntroduction, thumbnailImage, url }) => (
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card col">
              <div className="el-card-item">
                <div className="el-card-avatar el-overlay-1">
                  {" "}
                  <img
                    src={
                      thumbnailImage
                        ? thumbnailImage
                        : "https://via.placeholder.com/401x226?text=Tagpros.us"
                    }
                    style={{maxHeight:'100px', objectFit:'contain'}}
                    alt="user"
                  />
                  {/* <div className="el-overlay">
                                        <ul className="el-info">
                                            <li><a className="btn default btn-outline image-popup-vertical-fit" href={url}><i className="icon-magnifier" /></a></li>
                                            <li><a className="btn default btn-outline" href="#/"><i className="icon-link" /></a></li>
                                        </ul>
                                    </div> */}
                </div>
                <div className="el-card-content text-left p-l-20 p-r-20">
                  <h5 className="box-title">{he.decode(title)}</h5>{" "}
                  <div className="desc">{he.decode(classIntroduction)}</div>
                  <br />{" "}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
