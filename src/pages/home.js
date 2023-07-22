import React, { Component } from 'react';
import { Carousel } from 'antd';
import '../css/style.css';
import i1 from '../images/1.jpg'
import i2 from'../images/2.jpg'
import i3 from'../images/3.jpg'
import i4 from'../images/4.jpg'




class Home extends Component {
    render() {
        return (
            <div>
                <Carousel autoplay >
                    <div>
                        <img src={i1} alt="1" style={{width: '100%', height: '100%'}} /> 
                    </div>
                    <div>
                        <img src={i2} alt="2" style={{width: '100%', height: '100%'}} /> 
                    </div>
                    <div>
                        <img src={i3} alt="3" style={{width: '100%', height: '100%'}} /> 
                    </div>
                    <div>
                        <img src={i4} alt="4" style={{width: '100%', height: '100%'}} /> 
                    </div>
                </Carousel>

            </div>
        );
    }
}

export default Home;