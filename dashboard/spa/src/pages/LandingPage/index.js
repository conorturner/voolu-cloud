// React Basic and Bootstrap
import React, {Component} from "react";

// Import Generic components
import Section from "./section";
import Services from "./Services";
import HowItWorks from "./HowItWorks";

//Import Images
import logolight from "../../assets/images/logo-light.png";
import logodark from "../../assets/images/logo-dark.png";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        document.body.classList = "";
        document.getElementById("top-menu").classList.add("nav-light");
        // document.getElementById("buyButton").className = "btn btn-light";
        document.getElementById("brandLogo").src = logolight;
        window.addEventListener("scroll", this.scrollNavigation, true);
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
            // document.getElementById("buyButton").className = "btn btn-primary";
            document.getElementById("brandLogo").src = logodark;
        } else {
            document.getElementById("topnav").classList.remove("nav-sticky");
            // document.getElementById("buyButton").className = "btn btn-light";
            document.getElementById("brandLogo").src = logolight;
        }
    };

    render() {
        return (
            <React.Fragment>
                {/* Hero Start */}
                <Section/>

                {/* Search */}
                {/*<Search/>*/}

                {/* Services */}
                <HowItWorks/>

                <Services/>

                {/* HowItWorks */}

                {/* Price */}
                {/*<Price/>*/}

                {/* Testi */}
                {/*<Testi/>*/}
            </React.Fragment>
        );
    }
}

export default Index;
