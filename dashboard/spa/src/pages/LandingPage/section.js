import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "reactstrap";

// import images
import bg1 from "../../assets/images/hosting/bg.png";
import Typist from "react-typist";
import TypistLoop from 'react-typist-loop'

const typist_strings = [
    " at your fingertips.",
    " with streamlined billing.",
    " managed by experts.",
    " without the admin costs."
]

class Section extends Component {
    render() {
        return (
            <React.Fragment>
                <section
                    className="bg-half-260 bg-primary d-table w-100"
                    style={{background: `url(${bg1}) center center`}}
                    id="home"
                >
                    <div className="bg-overlay"></div>
                    <Container>
                        <Row className="row mt-5 justify-content-center">
                            <Col lg={12}>
                                <div className="title-heading text-center">
                                    <h1 className="heading title-dark text-white mb-3">
                                        Cloud Resources
                                        <TypistLoop interval={1000}>
                                            {typist_strings.map(text =>
                                                <Typist key={text} startDelay={1000}>
                                                    <span className="element" style={{color: '#78a3ff'}}>{text}</span>
                                                    <Typist.Backspace count={text.length} delay={1000}/>
                                                </Typist>)}
                                        </TypistLoop>

                                    </h1>
                                    <p className="para-desc para-dark mx-auto" style={{color: '#a9b7cb'}}>
                                        Fully managed cloud resources for research and teaching professionals.
                                    </p>
                                    <div className="mt-4 pt-2">
                                        <div>
                                            <Link to="/get-started"
                                                  className="btn btn-primary rounded mouse-down mr-2 mb-2">
                                                Get Started
                                            </Link>
                                            {/*<a download={true} href="/download/voolu"*/}
                                            {/*   className="btn btn-secondary rounded mouse-down mr-2 mb-2">*/}
                                            {/*    Download Now*/}
                                            {/*</a>*/}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <div className="position-relative">
                    <div className="shape overflow-hidden text-light">
                        <svg
                            viewBox="0 0 2880 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Section;
