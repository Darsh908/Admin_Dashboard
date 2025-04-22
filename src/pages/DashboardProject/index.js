import React from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";

const DashboardProject = () => {
  document.title = "Projects | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboard" />
          <Row className="project-wrapper">
            <Widgets />
          </Row>
          <Row></Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardProject;
