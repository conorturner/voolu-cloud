import React, {Component} from "react";
import {
    Container,
    Col,
    Row,
} from "reactstrap";

export default class Quick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "1",
        };
        this.toggleTab = this.toggleTab.bind(this);
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {
        const highlight = (txt) => <span className="text-primary font-weight-bold">{" " + txt + " "}</span>

        return (
            <React.Fragment>
                <Container className="container mt-100 mt-60">
                    <Row className="row justify-content-center">
                        <Col xs={12}>
                            <div className="section-title text-center mb-4 pb-2">
                                <h6 className="text-primary">Quickstart</h6>
                                <h4 className="title mb-4">1. Install Voolu</h4>
                                <p className="para-desc mx-auto text-muted mb-0">
                                    To start working with {highlight('Voolu')}, install via pip.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <br/>
                <br/>
            </React.Fragment>
        );
    }
}
