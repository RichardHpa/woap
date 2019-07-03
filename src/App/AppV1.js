import React, { Component } from 'react';
import logo from '../woap19-logo.svg';
import './App.scss';
import MapContainer from '../Map/Map';
import Info from '../Info/Info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faFlag, faUtensils, faCocktail } from '@fortawesome/free-solid-svg-icons';
import InputRange from 'react-input-range';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            pageLoaded: false,
            navVisibile: false,
            navOpen: false,
            currentView: 'burger',
            currentEvent: null,
             value: { min: 2, max: 10 },
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.changeView = this.changeView.bind(this);
        this.handleSelectMarker = this.handleSelectMarker.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
    }
    componentDidMount () {
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


    toggleNav(){
        this.setState(prevState => ({
          navOpen: !prevState.navOpen
        }));
    }

    changeView(type){
        this.setState({
            currentView: type
        })
    }

    handleSelectMarker(marker){
        this.setState({
            currentEvent: marker
        });
    }

    handleMapClick(){
        this.setState({
            currentEvent: null
        });
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
                <div className={`sidebar ${navOpen? 'sidebar-open': ''}`}>

                    <div className="filters">
                        <div className="festivalCatsContainer">
                            <div className={`festivalCats events ${currentView === 'events'? 'active': ''}`} onClick={this.changeView.bind(this,'events')}><FontAwesomeIcon icon={faFlag}/> Events</div>
                            <div className={`festivalCats dine ${currentView === 'dine'? 'active': ''}`} onClick={this.changeView.bind(this,'dine')}><FontAwesomeIcon icon={faUtensils}/> Dine</div>
                            <div className={`festivalCats burger ${currentView === 'burger'? 'active': ''}`} onClick={this.changeView.bind(this,'burger')}> <FontAwesomeIcon icon={faHamburger}/> Burger</div>
                            <div className={`festivalCats cocktail ${currentView === 'cocktail'? 'active': ''}`} onClick={this.changeView.bind(this,'cocktail')}><FontAwesomeIcon icon={faCocktail}/> Cocktails</div>
                        </div>
                        <div className="priceFilter">
                            <label>Price Range ($)</label>
                        </div>

                    </div>


                    <Info
                        currentEvent={currentEvent}
                        currentView={currentView}
                        closeEvent={this.handleMapClick}
                    />
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

//

// <InputRange
//   maxValue={20}
//   minValue={0}
//   value={this.state.value}
//   formatLabel={value => `$${value}`}
//   onChange={value => this.setState({ value })} />
