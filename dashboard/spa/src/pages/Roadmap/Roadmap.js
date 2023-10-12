import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Card, CardBody, Col, Container, Row} from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

// import images
import logodark from "../../assets/images/logo-dark.png";

export default class Roadmap extends Component {
    componentDidMount() {
        document.body.classList = "";
        window.addEventListener("scroll", this.scrollNavigation, true);
        document.getElementById("brandLogo").src = logodark;
    }

    // Make sure to remove the DOM listener when the component is unmounted.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollNavigation, true);
    }

    scrollNavigation = () => {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if (top > 80) {
            document.getElementById("topnav").classList.add("nav-sticky");
        } else {
            document.getElementById("topnav").classList.remove("nav-sticky");
        }
    };

    render() {

        const Item = ({left = false, title = 'title', children = 'description', label}) => {

            if (left) return (
                <div className="timeline-item mt-4">
                    <Row>
                        <Col lg={6} md={6} sm={6} className="order-sm-1 order-2">
                            <Card
                                className="event event-description-left rounded shadow border-0 overflow-hidden float-left">
                                {/*<img src={blog2} className="img-fluid" alt=""/>*/}
                                <CardBody>
                                    <h5 className="mb-0 text-capitalize">
                                        {title}
                                    </h5>
                                    <p className="mt-3 mb-0 text-muted">
                                        {children}
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        {label ? (<Col lg={6} md={6} sm={6} className="order-sm-2 order-1">
                            <div
                                className="duration duration-right rounded border p-2 px-4 position-relative shadow text-left">
                                {label}
                            </div>
                        </Col>) : null}
                    </Row>
                </div>
            )
            else return (
                <div className="timeline-item mt-4">
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            {label ? (<div
                                className="duration date-label-left border rounded p-2 px-4 position-relative shadow">
                                {label}
                            </div>) : label}
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <Card
                                className="event event-description-right rounded shadow border-0 overflow-hidden float-left">
                                {/*<img src={blog1} className="img-fluid" alt=""/>*/}
                                <CardBody>
                                    <h5 className="mb-0 text-capitalize">{title}</h5>
                                    <p className="mt-3 mb-0 text-muted">
                                        {children}
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }

        return (
            <React.Fragment>
                <section className="bg-half bg-light d-table w-100">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={12} className="text-center">
                                <div className="page-next-level">
                                    <h4 className="title"> Feature Roadmap </h4>
                                    <div className="page-next">
                                        <nav aria-label="breadcrumb" className="d-inline-block">
                                            <ul className="breadcrumb bg-white rounded shadow mb-0">
                                                <li className="breadcrumb-item">
                                                    <Link to="/">Voolu</Link>
                                                </li>
                                                <li
                                                    className="breadcrumb-item active"
                                                    aria-current="page"
                                                >
                                                    Roadmap
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <div className="position-relative">
                    <div className="shape overflow-hidden text-white">
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
                <section className="section">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={9}>
                                <div className="main-icon rounded-pill text-primary text-center mt-4 pt-2">
                                    <i>
                                        <FeatherIcon icon="star" className="fea icon-md-sm"/>
                                    </i>
                                </div>
                                <div className="timeline-page pt-2 position-relative">
                                    <Item left={true} label={'Beta release'} title={'Web request proxy'}>
                                        The goal of this feature is to allow remote development for websites, where
                                        access to a local http server is required.
                                    </Item>
                                    <Item left={true} title={'Host resilience'}>
                                        Host connection negotiation will be resilient to connection interruption.
                                        This means if your host goes offline, you won't need to use a new token on the
                                        client.
                                    </Item>


                                    <Item left={false} label={'V1.0.0 release'} title={'Dashboard'}>
                                        Users will be able to log in, create, view and manage connections. Login
                                        credentials can then also be used to allow for tokenless connection, speeding up
                                        configuration.
                                    </Item>

                                    <Item left={false} title={'Large files'}>
                                        As part of the V1 release we plan to introduce bi-directional transfers for
                                        large files. Allowing support for the following use cases:
                                        <br/><br/>
                                        <ul>
                                            <li>Large project files.</li>
                                            <li>Local testing of large build fragments.</li>
                                            <li>Simple content deployment.</li>
                                        </ul>
                                    </Item>
                                    <Item left={false} title={'Global Deployment'}>
                                        Our beta servers are based in London England, leaving speed on the table for US
                                        users. We plan to create deployments in each aws region around the world,
                                        allowing all users to achieve top latency.
                                    </Item>


                                    <Item left={true} label={'V1.1.0'} title={'Host only mode'}>
                                        Feature set designed for less technical users, allowing for host monitoring and
                                        management without needing a client CLI connected.

                                    </Item>

                                    <Item left={true} title={'Browse files'}>
                                        Browse and manage host files, creating a virtual cloud interface to on-premise
                                        hardware.
                                    </Item>
                                    <Item left={true} title={'Run Commands'}>
                                        Run commands on host allowing for a no-code way to interact with a remote host.
                                    </Item>
                                    <Item left={true} title={'Monitor host'}>
                                        Live host hardware usage piped back to Web interface to make access easier.
                                    </Item>


                                    <Item left={false} label={'Distant Future'} title={'Hosted Runtimes'}>
                                        Rather than worrying about your own host machines, use Voolu provisioned
                                        machines to execute code from anywhere.
                                    </Item>
                                    <Item left={false} title={'Terminal Forwarding'}>
                                        Full terminal forwarding terminal support. This feature may become a priority in
                                        the event users would like to replace SSH all together.
                                    </Item>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}
