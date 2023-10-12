import React, {Component} from "react";
import {Container, Row, Col} from "reactstrap";

//import Images
import bgimg from "../../assets/images/digital/about.png";

export default class index extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="bg-half bg-light d-table w-100">
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6} xs={12}>
                                <div className="title-heading">
                                    <h1 className="font-weight-bold mt-2 mb-3">
                                        Contact Us
                                    </h1>
                                    <p className="para-desc text-muted">
                                        Install and use the Voolu CLI to join the remote development revolution.
                                    </p>
                                    <div className="mt-4 pt-2">
                                        <a href="https://github.com/voolu/vcli" rel="noreferrer" target="_blank"
                                           className="btn btn-primary mr-2">
                                            Github
                                        </a>
                                        <a href="https://pypi.org/project/voolu/" rel="noreferrer" target="_blank"
                                           className="btn btn-outline-primary">
                                            PyPI
                                        </a>
                                    </div>
                                </div>
                            </Col>

                            <div className="col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
                                <img src={bgimg} className="img-fluid d-block mx-auto" alt=""/>
                            </div>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}
