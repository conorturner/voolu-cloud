import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid1: [
        { title: "About us", link: "/page-aboutus" },
        { title: "Services", link: "/page-services" },
        { title: "Team", link: "/page-team" },
        { title: "Pricing", link: "/page-pricing" },
        { title: "Project", link: "/page-work" },
        { title: "Careers", link: "/page-jobs" },
        { title: "Blog", link: "/page-blog" },
        { title: "Login", link: "/page-cover-login" },
      ],
      grid2: [
        { title: "Terms of Services", link: "/page-terms" },
        { title: "Privacy Policy", link: "/page-privacy" },
        { title: "Documentation", link: "/documentation" },
        { title: "Changelog", link: "/changelog" },
        { title: "Components", link: "/components" },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>

      </React.Fragment>
    );
  }
}

export default Footer;
