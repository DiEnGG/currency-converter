import React, { Component } from 'react'
import dnLogo from '../../assests/images/dnLogo.png';
import '../../assests/css/header.css';

export class Header extends Component {
    render() {
        return (
            <div className='row'>
                <img src={dnLogo} className='logo' alt='Logo DIEN Projects'/>
            </div>
        )
    }
}

export default Header
