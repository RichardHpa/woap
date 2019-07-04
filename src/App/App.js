import React, { Component } from 'react';
import logo from '../woap19-logo.svg';
import './App.scss';
import axios from 'axios'
import Info from '../Info/Info';
import MapContainer from '../Map/Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faFlag, faUtensils, faCocktail } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            appLoaded: false,
            eventsLoaded: false,
            navVisibile: false,
            navOpen: false,
            allEvents: [],
            currentView: 'burger',
            currentEvent: null
        }

        this.handleMapReady = this.handleMapReady.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.handleSelectMarker = this.handleSelectMarker.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
    }

    componentDidMount () {
        axios.get('https://visawoap.com/api/venues/page:1/limit:1000/.json?key=4e44f1ac85cd60e3caa56bfd4afb675e')
        .then(response => {
            const allLocations = [];
            for (var i = 0; i < response.data.venues.length; i++) {
                if(response.data.venues[i].Event.length > 0){
                    allLocations.push(response.data.venues[i]);
                }
            }
            const allEvents = {
                events: [],
                burger: [],
                dine: [],
                cocktail: []
            };
            var iterationNum = 1
            for (var j = 0; j < allLocations.length; j++) {
                var venue = allLocations[j];
                for (var x = 0; x < venue.Event.length; x++) {
                    var latLng = venue.Venue.ll.split(",");
                    var singleEvent = venue.Event[x];
                    let singleEventToPush = {
                        id: iterationNum,
                        venueDetails: venue.Venue,
                        eventDetails: singleEvent,
                        lat: parseFloat(latLng[0]),
                        lng: parseFloat(latLng[1])
                    }
                    let eventID = parseInt(singleEventToPush.eventDetails.event_type_id);
                    if(eventID === 29){
                        //event
                        allEvents['events'].push(singleEventToPush);
                    } else if(eventID === 30){
                        //burger
                        allEvents['burger'].push(singleEventToPush);
                    } else if(eventID === 31){
                        //dine
                        allEvents['dine'].push(singleEventToPush);
                    } else if(eventID === 32){
                        //cocktail
                        allEvents['cocktail'].push(singleEventToPush);
                    }
                    iterationNum++;
                }
            }
            this.setState({
                allEvents: allEvents,
                eventsLoaded: true
            });
        })
        //This needs to be called from another function when the Map is ready
        // var self = this;
        // setTimeout(function(){
        //     self.setState({
        //         appLoaded: true,
        //     });
        //     setTimeout(function(){
        //         self.setState(prevState => ({
        //           navVisibile: !prevState.navVisibile
        //         }));
        //     }, 1200)
        // }, 3000)
    }

    handleMapReady(){
        console.log('ready');
        this.setState({
            appLoaded: true,
            navVisibile: true,
        })
    }

    changeView(type){
        this.setState({
            currentView: type,
            currentEvent: null
        })
    }

    toggleNav(){
        this.setState(prevState => ({
          navOpen: !prevState.navOpen
        }));
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
        const { appLoaded, navOpen , navVisibile, allEvents, currentView, currentEvent, eventsLoaded} = this.state;
        return(
            <div className="App">
                <header className={`App-header ${appLoaded? '': 'App-Loading'}`}>
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
                    </div>
                    <Info
                        currentEvent={currentEvent}
                        currentView={currentView}
                        closeEvent={this.handleMapClick}
                    />
                </div>
                <div id="Map">
                {
                    eventsLoaded? <MapContainer
                        currentView={this.state.currentView}
                        currentMarkers={allEvents[currentView]}
                        selectedMarker={this.handleSelectMarker}
                        mapClick={this.handleMapClick}
                        mapReady={this.handleMapReady}
                    />: ''
                }

                </div>
            </div>
        )
    }
}

export default App;
