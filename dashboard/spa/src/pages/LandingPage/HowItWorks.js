// React Basic and Bootstrap
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

//Import Components
import SectionTitleLeft from "../../components/Shared/SectionTitleLeft";

//import images
import hosting1 from "../../assets/images/hosting/1.png";
import hosting2 from "../../assets/images/hosting/2.png";

class HowItWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features1: [
        { title: "Google Cloud Platform" },
        { title: "Amazon Web Services" },
        { title: "Microsoft Azure" },
        { title: "Digital Ocean" },
      ],
      features2: [
        { title: "Stripped back setup process" },
        { title: "One-to-One Support" },
        { title: "Preset and Fixed Billing" },
      ]
    };
  }

  render() {
    return (
      <React.Fragment>
        <section className="section bg-light">
          <Container>
            <Row className="align-items-center">
              <Col lg={5} md={6}>
                <img src={hosting1} className="img-fluid" alt="" />
              </Col>

              <Col lg={7} md={6} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                <div className="section-title ml-lg-5">
                  <SectionTitleLeft
                    title="Provider Agnostic Deployment"
                    desc={"Existing partnerships with many cloud providers as well as our 'new provider guarantee'."}
                    features={this.state.features1}
                    class=""
                  />
                  <Link to="/get-started" className="btn btn-primary mt-3">
                    Get Started <i className="mdi mdi-chevron-right"></i>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>

          <Container className="mt-100 mt-60">
            <Row className="align-items-center">
              <Col
                lg={6}
                md={{ size: 6, order: 1 }}
                xs={{ order: 2 }}
                className=" mt-4 mt-sm-0 pt-2 pt-sm-0"
              >
                <div className="section-title">
                  <SectionTitleLeft
                    title="Streamlined Setup and Billing"
                    desc={"With our delivery framework and skilled team cloud administration has never been easier."}
                    features={this.state.features2}
                    class=""
                  />
                  <Link to="/get-started" className="btn btn-primary mt-3">
                    Get Started <i className="mdi mdi-chevron-right"></i>
                  </Link>
                </div>
              </Col>

              <Col lg={6} md={{ size: 6, order: 2 }} xs={{ order: 1 }}>
                <img src={hosting2} className="img-fluid" alt="" />
              </Col>
            </Row>
          </Container>

        </section>
        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg
              viewBox="0 0 2880 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M720 125L2160 0H2880V250H0V125H720Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HowItWorks;
