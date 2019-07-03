import React, { Component } from 'react';
import logo from '../woap19-logo.svg';
import './App.scss';
import MapContainer from '../Map/Map';
import { faHamburger, faFlag, faUtensils, faCocktail } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            pageLoaded: false,
        }

    }

    componentDidMount () {
        //This needs to be called from another function when the Map is ready
        var self = this;
        setTimeout(function(){
            self.setState({
                pageLoaded: true,
            });
            setTimeout(function(){
                self.setState(prevState => ({
                  navVisibile: !prevState.navVisibile
                }));
            }, 1200)
        }, 3000)
    }

    render(){
        const { pageLoaded, navOpen , navVisibile, currentView, currentEvent} = this.state;
        return(
            <div className="App">
                <header className={`App-header ${pageLoaded? '': 'App-Loading'}`}>
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <div className={`hamburgerContainer ${navVisibile? '': 'hidden'}`}>
                    <div
                        id="nav-icon3"
                        onClick={this.toggleNav}
                        className={navOpen? 'open': ''}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div id="Map">
                    <MapContainer
                        currentView={this.state.currentView}
                        selectedMarker={this.handleSelectMarker}
                        mapClick={this.handleMapClick}
                    />
                </div>
            </div>
        )
    }
}

export default App;
