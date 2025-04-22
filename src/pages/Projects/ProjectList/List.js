import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { ToastContainer } from "react-toastify";
import { setSelectedProject } from "../../../slices/dashboardProject/reducer";
import { useSelector, useDispatch } from "react-redux";
import FeatherIcon from "feather-icons-react";

//import action
import {
  getProjectList as onGetProjectList,
  deleteProjectList as onDeleteProjectList,
} from "../../../slices/thunks";
import { createSelector } from "reselect";

const List = () => {
  const dispatch = useDispatch();

  const selectDashboardData = createSelector(
    (state) => state.Projects,
    (projectLists) => projectLists.projectLists
  );
  // Inside your component
  const projectLists = useSelector(selectDashboardData);

  const [project, setProject] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(onGetProjectList());
  }, [dispatch]);

  useEffect(() => {
    setProject(projectLists);
  }, [projectLists]);

  // delete
  const onClickData = (project) => {
    setProject(project);
    setDeleteModal(true);
  };

  const handleDeleteProjectList = () => {
    if (project) {
      dispatch(onDeleteProjectList(project));
      setDeleteModal(false);
    }
  };

  //   const activebtn = (ele) => {
  //     if (ele.closest("button").classList.contains("active")) {
  //       ele.closest("button").classList.remove("active");
  //     } else {
  //       ele.closest("button").classList.add("active");
  //     }
  //   };

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteProjectList()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <Row className="g-4 mb-3">
        <div className="col-sm-auto">
          <div>
            <Link to="/apps-projects-create" className="btn btn-success">
              <i className="ri-add-line align-bottom me-1"></i> Add New
            </Link>
          </div>
        </div>
        <div className="col-sm-3 ms-auto">
          <div className="d-flex justify-content-sm-end gap-2">
            <div className="search-box ms-2 col-sm-7">
              <Input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
              <i className="ri-search-line search-icon"></i>
            </div>

            <select
              className="form-control w-md"
              data-choices
              data-choices-search-false
            >
              <option value="All">All</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last Year">Last Year</option>
              <option value="This Month">This Month</option>
              <option value="Today">Today</option>
              <option value="Yesterday" defaultValue>
                Yesterday
              </option>
            </select>
          </div>
        </div>
      </Row>

      <div className="row">
        {(projectLists || []).map((item, index) => (
          <React.Fragment key={index}>
            <Col xxl={3} sm={6} className="project-card">
              <Card>
                <CardBody>
                  <div
                    className={`p-3 mt-n3 mx-n3 bg-${item.cardHeaderClass}-subtle rounded-top`}
                  >
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h5 className="mb-0 fs-14">
                          <Link
                            to="/apps-projects-overview"
                            className="text-body"
                          >
                            {item.title}
                          </Link>
                        </h5>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="d-flex gap-1 align-items-center my-n2">
                          <UncontrolledDropdown direction="start">
                            <DropdownToggle
                              tag="button"
                              className="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15"
                            >
                              <FeatherIcon
                                icon="more-horizontal"
                                className="icon-sm"
                              />
                            </DropdownToggle>

                            <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem
                                onClick={() => {
                                  dispatch(setSelectedProject(item));
                                }}
                                tag={Link}
                                to="/apps-projects-overview"
                              >
                                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                View
                              </DropdownItem>
                              <DropdownItem href="apps-projects-create">
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Edit
                              </DropdownItem>
                              <div className="dropdown-divider"></div>
                              <DropdownItem
                                href="#"
                                onClick={() => onClickData(item)}
                                data-bs-toggle="modal"
                                data-bs-target="#removeProjectModal"
                              >
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                Remove
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-3">
                    <Row className="gy-3">
                      <Col xs={6}>
                        <div>
                          <p className="text-muted mb-1">Status</p>
                          <div
                            className={
                              "fs-12 badge bg-" +
                              item.statusClass +
                              "-subtle" +
                              " text-" +
                              item.statusClass
                            }
                          >
                            {item.status}
                          </div>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div>
                          <p className="text-muted mb-1">Deadline</p>
                          <h5 className="fs-14">{item.deadline}</h5>
                        </div>
                      </Col>
                    </Row>

                    <div className="d-flex align-items-center mt-3">
                      <p className="text-muted mb-0 me-2">Team :</p>
                      <div className="avatar-group">
                        {item.subItem.map((item, key) => (
                          <React.Fragment key={key}>
                            {item.imgTeam ? (
                              <Link
                                to="#"
                                className="avatar-group-item"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="Darline Williams"
                              >
                                <div className="avatar-xxs">
                                  <img
                                    src={item.imgTeam}
                                    alt=""
                                    className="rounded-circle img-fluid"
                                  />
                                </div>
                              </Link>
                            ) : (
                              <Link
                                to="#"
                                className="avatar-group-item"
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="Donna Kline"
                              >
                                <div className="avatar-xxs">
                                  <div
                                    className={
                                      item.bgColor
                                        ? "avatar-title rounded-circle bg-" +
                                          item.bgColor
                                        : "avatar-title fs-16 rounded-circle bg-light border-dashed border text-primary"
                                    }
                                  >
                                    {item.imgNumber}
                                  </div>
                                </div>
                              </Link>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex mb-2">
                      <div className="flex-grow-1">
                        <div>Progress</div>
                      </div>
                      <div className="flex-shrink-0">
                        <div>{item.progressBar}</div>
                      </div>
                    </div>
                    <div className="progress progress-sm animated-progess">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: item.progressBar }}
                      ></div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </React.Fragment>
        ))}
      </div>
      <Row className="g-0 text-center text-sm-start align-items-center mb-4">
        <Col sm={6}>
          <div>
            <p className="mb-sm-0 text-muted">
              Showing <span className="fw-semibold">1</span> to{" "}
              <span className="fw-semibold">10</span> of{" "}
              <span className="fw-semibold text-decoration-underline">12</span>{" "}
              entries
            </p>
          </div>
        </Col>

        <Col sm={6}>
          <ul className="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
            <li className="page-item disabled">
              <Link to="#" className="page-link">
                Previous
              </Link>
            </li>
            <li className="page-item active">
              <Link to="#" className="page-link">
                1
              </Link>
            </li>
            <li className="page-item ">
              <Link to="#" className="page-link">
                2
              </Link>
            </li>
            <li className="page-item">
              <Link to="#" className="page-link">
                3
              </Link>
            </li>
            <li className="page-item">
              <Link to="#" className="page-link">
                4
              </Link>
            </li>
            <li className="page-item">
              <Link to="#" className="page-link">
                5
              </Link>
            </li>
            <li className="page-item">
              <Link to="#" className="page-link">
                Next
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default List;
