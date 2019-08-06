import React, { Component } from 'react';
import logo from '../woap19-logo.svg';
import './App.scss';
import axios from 'axios'
import Info from '../Info/Info';
import MapContainer from '../Map/Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faFlag, faUtensils, faCocktail } from '@fortawesome/free-solid-svg-icons';
import InputRange from 'react-input-range';

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
            currentEvent: null,
            value: { min: 2, max: 10 },
            filters: {min: 0, max: 10},
            filteredMarkers: [],
            warning: false,
            dietaryRequirements: [
                'Gluten Free',
                'Dairy Free',
                'Nut Free',
                'Vegetarian',
                'Vegan'
            ],
            activeDietaryFitlers: []
        }

        this.handleMapReady = this.handleMapReady.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.handleSelectMarker = this.handleSelectMarker.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.filter = this.filter.bind(this);
        this.changeCheckbox = this.changeCheckbox.bind(this);

        this.filterEvents = this.filterEvents.bind(this);
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
            var min = 10000000;
            var max = 0;
            for (var k = 0; k < allEvents['burger'].length; k++) {
                let price = parseInt(allEvents['burger'][k].eventDetails.burger_price);
                if(price < min){
                    min = price;
                }
                if(price > max){
                    max = price;
                }
            }
            this.setState({
                allEvents: allEvents,
                eventsLoaded: true,
                filters: {
                    min: min,
                    max: max
                },
                value: {
                    min: min,
                    max: max
                },
                filteredMarkers: allEvents[this.state.currentView]
            });
        })
    }

    handleMapReady(){
        var self = this;
        this.setState({
            appLoaded: true,
            navVisibile: true,
        })
        setTimeout(function(){
            self.setState({
                warning: true
            })
        }, 5000);
    }

    changeView(type){
        const {allEvents} = this.state;
        var min = 10000000;
        var max = 0;
        for (var k = 0; k < allEvents[type].length; k++) {
            var price = 0;
            if(type === 'events'){
                price = parseInt(allEvents[type][k].eventDetails.highest_price);
            } else if(type === 'burger'){
                price = parseInt(allEvents[type][k].eventDetails.burger_price);
            } else if(type === 'dine'){
                price = parseInt(allEvents[type][k].eventDetails.price_of_your_festival_dish);
            } else if(type === 'cocktail'){
                price = parseInt(allEvents[type][k].eventDetails.price_of_cocktail_tapas_match);
            }
            if(price < min){
                min = price;
            }
            if(price > max){
                max = price;
            }
        }
        this.setState({
            currentView: type,
            currentEvent: null,
            filters: {
                min: min,
                max: max
            },
            value: {
                min: min,
                max: max
            },
            filteredMarkers: allEvents[type]
        })
    }

    toggleNav(){
        this.setState(prevState => ({
          navOpen: !prevState.navOpen
        }));
    }

    handleSelectMarker(marker){
        this.setState({
            currentEvent: marker,
            navOpen: false
        });
    }

    handleMapClick(){
        this.setState({
            currentEvent: null
        });
    }

    changeFilter(value){
        this.setState({
            value: value
        })
    }

    filter(){
        this.filterEvents();
        // const {value, allEvents, currentView} = this.state;
        // let filteredEvents = []
        // for (var i = 0; i < allEvents[currentView].length; i++) {
        //     var price = 0;
        //     if(currentView === 'events'){
        //         price = parseInt(allEvents[currentView][i].eventDetails.highest_price);
        //     } else if(currentView === 'burger'){
        //         price = parseInt(allEvents[currentView][i].eventDetails.burger_price);
        //     } else if(currentView === 'dine'){
        //         price = parseInt(allEvents[currentView][i].eventDetails.price_of_your_festival_dish);
        //     } else if(currentView === 'cocktail'){
        //         price = parseInt(allEvents[currentView][i].eventDetails.price_of_cocktail_tapas_match);
        //     }
        //     if((price > value.min) && (price < value.max) ){
        //         filteredEvents.push(allEvents[currentView][i]);
        //     }
        // }
        // this.setState({
        //     filteredMarkers: filteredEvents
        // })
    }

    changeCheckbox(value){
        const {activeDietaryFitlers} = this.state;
        if(value === 'None'){
            this.setState({
                activeDietaryFitlers: []
            })
        } else {
            if(activeDietaryFitlers.includes(value)){
                var a = activeDietaryFitlers.indexOf(value);
                activeDietaryFitlers.splice(a, 1);
            } else {
                activeDietaryFitlers.push(value);
            }
            this.setState({
                activeDietaryFitlers: activeDietaryFitlers,
                currentEvent: null
            })
        }
        this.filterEvents();
    }



    filterEvents(){
        const {value, allEvents, currentView, activeDietaryFitlers} = this.state;
        let filteredEventsPrice = [];
        for (var i = 0; i < allEvents[currentView].length; i++) {
            let price = 0;
            if(currentView === 'events'){
                price = parseInt(allEvents[currentView][i].eventDetails.highest_price);
            } else if(currentView === 'burger'){
                price = parseInt(allEvents[currentView][i].eventDetails.burger_price);
            } else if(currentView === 'dine'){
                price = parseInt(allEvents[currentView][i].eventDetails.price_of_your_festival_dish);
            } else if(currentView === 'cocktail'){
                price = parseInt(allEvents[currentView][i].eventDetails.price_of_cocktail_tapas_match);
            }
            if((price > value.min) && (price < value.max) ){
                filteredEventsPrice.push(allEvents[currentView][i]);
            }
        }
        if(currentView === 'burger'){
            if(activeDietaryFitlers.length > 0){
                let lowerDietary = []
                for (var f = 0; f < activeDietaryFitlers.length; f++) {
                    lowerDietary.push(activeDietaryFitlers[f].toLowerCase());
                }
                let filteredEventsDiet = [];
                for (var j = 0; j < filteredEventsPrice.length; j++) {
                    let currentEventDiet = filteredEventsPrice[j].eventDetails.does_your_burger_offering_cater_to_please_leave_blank_if_you_cannot_cater_to_these_dietaries;

                    for (var x = 0; x < currentEventDiet.length; x++) {
                        let requirement = currentEventDiet[x].toLowerCase().replace('_possible','');
                        if(lowerDietary.includes(requirement)){
                            filteredEventsDiet.push(filteredEventsPrice[j]);
                        }
                    }
                }
                this.setState({
                    filteredMarkers: filteredEventsDiet
                })
            } else {
                this.setState({
                    filteredMarkers: filteredEventsPrice,
                    currentEvent: null
                })
            }
        } else {
            this.setState({
                filteredMarkers: filteredEventsPrice,
                currentEvent: null
            })
        }
    }

    render(){
        const { appLoaded, navOpen , navVisibile, currentView, currentEvent, eventsLoaded, dietaryRequirements} = this.state;
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
                    <div className={`filters view-${currentView}`}>
                        <div>
                            <div className="festivalCatsContainer">
                                <div className={`festivalCats style-events ${currentView === 'events'? 'active': ''}`} onClick={this.changeView.bind(this,'events')}><FontAwesomeIcon icon={faFlag}/> Events</div>
                                <div className={`festivalCats style-dine ${currentView === 'dine'? 'active': ''}`} onClick={this.changeView.bind(this,'dine')}><FontAwesomeIcon icon={faUtensils}/> Dine</div>
                                <div className={`festivalCats style-burger ${currentView === 'burger'? 'active': ''}`} onClick={this.changeView.bind(this,'burger')}> <FontAwesomeIcon icon={faHamburger}/> Burger</div>
                                <div className={`festivalCats style-cocktail ${currentView === 'cocktail'? 'active': ''}`} onClick={this.changeView.bind(this,'cocktail')}><FontAwesomeIcon icon={faCocktail}/> Cocktails</div>
                            </div>
                            <div className="priceFilter">
                                <label>Price Range ($)</label>
                                <InputRange
                                    maxValue={this.state.filters['max']}
                                    minValue={this.state.filters['min']}
                                    value={this.state.value}
                                    onChange={value => this.setState({ value })}
                                    onChangeComplete={this.filter}
                                />
                            </div>
                            {
                                currentView === 'burger'?
                                <div className="dietaries">
                                    <label>Dietary Requirements</label>
                                    {dietaryRequirements.map(requirement => {
                                        return <div className="example" key={requirement}>
                                          <label className="checkbox-button">
                                            <input type="checkbox" className="checkbox-button__input" name={requirement} value={requirement} onChange={this.changeCheckbox.bind(this, requirement)}/>
                                            <span className="checkbox-button__control"></span>
                                            <span className="checkbox-button__label">{requirement}</span>
                                          </label>

                                        </div>
                                    })}
                                </div>
                                :
                                ''
                            }

                        </div>
                        <div className="credit">
                            <p>Created by <a rel="noopener noreferrer" href="http://richard-hpa.com/" target="_blank">Richard Hpa</a></p>
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
                        currentMarkers={this.state.filteredMarkers}
                        selectedMarker={this.handleSelectMarker}
                        mapClick={this.handleMapClick}
                        mapReady={this.handleMapReady}
                    />: ''
                }
                </div>
                <div id="warning" className={this.state.warning? 'warning-open': ''}>
                    <p>This is not an official Visa WOAP application and has just been created for fun by <a rel="noopener noreferrer" href="http://richard-hpa.com/" target="_blank">Richard Hpa</a>.</p>
                </div>
            </div>
        )
    }
}

export default App;
