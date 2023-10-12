import React, {Component} from "react";
import './Terminal.css'

class Terminal extends Component {
    render() {
        const {height, width, backgroundColor = '#101522bd', im} = this.props;
        console.log('img', im, height)
        return (
            <div className={'term-body'}>
                <div className='fakeMenu'>
                    <div className="fakeButtons fakeClose"></div>
                    <div className="fakeButtons fakeMinimize"></div>
                    <div className="fakeButtons fakeZoom"></div>
                </div>
                <div style={{height, backgroundColor, width}} className="fakeScreen">
                    {
                        im ? (
                            <img src={im} className="img-fluid" alt=""/>
                        ) : [
                            <p className="line1">{this.props.command}<span className="cursor1">_</span></p>,
                            <p className="line2">{this.props.output}<span className="cursor2">_</span></p>
                        ]
                    }

                    {/*<p className="line3">[?] What more would you like? (Press space to select)<span*/}
                    {/*    className="cursor3">_</span></p>*/}
                    {/*<p className="line4">><span className="cursor4">_</span></p>*/}
                </div>
            </div>
        )
    }
}

export default Terminal