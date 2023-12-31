// React Basic and Bootstrap
import React, {Component} from "react";
import {Container, Row, Col} from "reactstrap";
import {Link} from "react-router-dom";

class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features: [
                {
                    icon: 'uil uil-browser h1 text-primary',
                    title: "Cost Optimisation",
                    desc: "Secure multi-tenant hosting for optimised resource usage.",
                    link: "#",
                },
                {
                    icon: 'uil uil-cloud-computing h1 text-primary',
                    title: "Data Wrangling",
                    desc: "We assist in data transfer between on-premise and cloud.",
                    link: "#",
                },
                {
                    icon: 'uil uil-server h1 text-primary',
                    title: "Large Scale Deployment",
                    desc: "Our experts take the repetitiveness away from scaling cloud deployments.",
                    link: "#",
                },
                {
                    icon: 'uil uil-map h1 text-primary ',
                    title: "User Management",
                    desc: "",
                    link: "#",
                },
                {
                    icon: 'uil uil-lock h1 text-primary',
                    title: "Application Setup",
                    desc: "",
                    link: "#",
                },
                {
                    icon: 'uil uil-code-branch h1 text-primary',
                    title: "Backup and Restore",
                    desc: "",
                    link: "#",
                },
            ].map(obj => Object.assign(obj, {link: '/roadmap'})),
        };
    }

    render() {
        return (
            <React.Fragment>
                <section className="section">
                    <Container className="pb-lg-4 mb-md-5 mb-4">
                        <Row className="align-items-center mb-4">
                            <Col lg="9" md="8" className="text-sm-left">
                                <div className="section-title">
                                    <h4 className="title mb-4">Services</h4>
                                    <p className="text-muted para-desc mb-0">
                                        <span className="text-primary font-weight-bold">
                                          Academian
                                        </span>{" "}
                                        is currently in beta, with new features being developed all the time.
                                        We have a lot of ideas but would love to hear which you are most interested in.
                                    </p>
                                </div>
                            </Col>

                            <Col
                                lg="3"
                                md="4"
                                className="mt-4 mt-sm-0 text-sm-right pt-2 pt-sm-0"
                            >
                                <Link to="/contact" className="btn btn-outline-primary">
                                    Contact <i className="mdi mdi-chevron-right"></i>
                                </Link>
                            </Col>
                        </Row>

                        <Row>
                            {this.state.features.map((feature, key) => (
                                <Col lg="4" md="6" xs="12" className="mt-5 pt-3" key={key}>
                                    <div className="features">
                                        <div className="image position-relative d-inline-block">
                                            <i className={feature.icon}></i>
                                        </div>

                                        <div className="content mt-4">
                                            <h5 className="title-2">{feature.title}</h5>
                                            <p className="text-muted">{feature.desc}</p>
                                            {/*<Link to={feature.link} className="text-success">*/}
                                            {/*    Read more <i className="mdi mdi-chevron-right"></i>*/}
                                            {/*</Link>*/}
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
                <div className="position-relative">
                    <div className="shape overflow-hidden text-light">
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

export default Services;
