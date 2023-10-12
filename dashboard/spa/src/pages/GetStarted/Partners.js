import React, { Component } from "react";

//import partner images
import amazon from "../../assets/images/client/aws.svg";
import lenovo from "../../assets/images/client/google.svg";
import paypal from "../../assets/images/client/azure.svg";
import shopify from "../../assets/images/client/digitalocean.svg";
import spotify from "../../assets/images/client/kamatera.svg";

export default class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [
        {
          id: 1,
          img: paypal,
        },
        {
          id: 2,
          img: lenovo,
        },
        {
          id: 3,
          img: amazon,
        },
        {
          id: 4,
          img: shopify,
        },
        {
          id: 5,
          img: spotify,
        },
      ],
    };
  }
  render() {
    return (
      <React.Fragment>
        <section className="py-4 border-top bg-light">
          <div className="container">
            <div className="row justify-content-center">
              {this.state.partners.map((partners, key) => (
                <div
                  className="col-lg-2 col-md-2 col-6 text-center py-4"
                  key={key}
                >
                  <img
                    src={partners.img}
                    className="avatar avatar-ex-sm"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
