import React from "react";
import { projectsWidgets } from "../../common/data";
import CountUp from "react-countup";
import { Card, CardBody, Col, Row } from "reactstrap";

const Widgets = () => {
  return (
    <React.Fragment>
      <Row>
        {(projectsWidgets || []).map((item, key) => (
          <Col xl={4} key={key}>
            <Card className="card-animate">
              <CardBody>
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1 overflow-hidden ms-3">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                      {item.label}
                    </p>
                    <div className="d-flex align-items-center mb-3">
                      <h4 className="fs-4 flex-grow-1 mb-0">
                        {item.subCounter.map((item, key) => (
                          <span
                            className="counter-value me-1"
                            data-target="825"
                            key={key}
                          >
                            <CountUp
                              start={0}
                              suffix={item.suffix}
                              separator={item.separator}
                              end={item.counter}
                              duration={4}
                            />
                          </span>
                        ))}
                      </h4>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <span
                        className={
                          "fs-12 badge bg-" +
                          item.badgeClass +
                          "-subtle text-" +
                          item.badgeClass +
                          ""
                        }
                      >
                        <i className={"fs-13 align-middle me-1 " + item.icon} />
                        {item.percentage}
                      </span>
                      <p className="text-muted text-truncate mb-0">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                  <div className="avatar-sm flex-shrink-0">
                    <span
                      className={`avatar-title bg-${item.feaIconClass}-subtle text-${item.feaIconClass} rounded-2 fs-2`}
                    >
                      <i
                        className={`mdi ${item.feaIcon} text-${item.feaIconClass}`}
                      />
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default Widgets;
