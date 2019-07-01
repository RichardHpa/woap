import React, { Component } from 'react';
import logo from '../woap19-logo.svg';
import './App.scss';
import MapContainer from '../Map/Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger, faFlag, faUtensils, faCocktail } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            pageLoaded: false,
            navVisibile: false,
            navOpen: false,
            currentView: 'burger',
            currentEvent: {
                  id: 30,
                  venueDetails: {
                    id: '408',
                    region: 'Wellington Suburbs\u2028',
                    reference_num: '',
                    aisle_number: null,
                    type: '',
                    description: 'Brew’d Island Bay takes the \'small local bar\' and fuses it with bohemian Italian décor, a simple menu, and a range of craft beers.',
                    created: '2018-02-23 07:35:58',
                    modified: '2019-05-27 11:29:31',
                    enabled: false,
                    title: 'Brew\'d Island Bay ',
                    abn: 'Wellington Hospitality Group',
                    address1: '163 The Pde',
                    address2: '',
                    suburb: ' Island Bay',
                    postcode: '6023',
                    phone: '04 383 8260',
                    contact_person: 'Isiah Fong',
                    website: 'whg.co.nz/brewd-island-bay/',
                    twitter: '',
                    facebook: 'https://www.facebook.com/BrewdIslandBay',
                    instagram: 'brewdislandbay',
                    hours_of_operation: null,
                    email: 'islandbay@brewd.co.nz',
                    image: 'https://goodcms.s3.amazonaws.com/woap/venue/11148340_862112757159478_8968624003470755947_n-190521-114706.jpg',
                    ll: '-41.335280, 174.773581',
                    user_id: '790',
                    site_id: '5',
                    public_link: '/venue/408/brew-d-island-bay',
                    takes_bookings: 'Yes, via a combination of the above',
                    booking_software: 'Evive',
                    open__sun: '1',
                    open_hours__sun: '11am - Late',
                    open__mon: '1',
                    open_hours__mon: '3pm - late',
                    open__tue: '1',
                    open_hours__tue: '3pm - late',
                    open__wed: '1',
                    open_hours__wed: '3pm - late',
                    open__thu: '1',
                    open_hours__thu: '3pm - late',
                    open__fri: '1',
                    open_hours__fri: '11am - Late',
                    open__sat: '1',
                    open_hours__sat: '11am - Late',
                    open_hours: 'Mon–Thu 4pm–late, Fri–Sun 11am–late',
                    wheelchair_access: [
                      'Yes'
                    ],
                    open_Sun: '1',
                    open_hours_Sun: '11am - Late',
                    open_Mon: '1',
                    open_hours_Mon: '3pm - late',
                    open_Tue: '1',
                    open_hours_Tue: '3pm - late',
                    open_Wed: '1',
                    open_hours_Wed: '3pm - late',
                    open_Thu: '1',
                    open_hours_Thu: '3pm - late',
                    open_Fri: '1',
                    open_hours_Fri: '11am - Late',
                    open_Sat: '1',
                    open_hours_Sat: '11am - Late'
                  },
                  eventDetails: {
                    id: '1807',
                    site_id: '5',
                    facebook_tracking: '',
                    link: null,
                    iticket: '0',
                    invoiced: true,
                    created: '2019-03-06 11:30:28',
                    modified: '2019-05-22 17:15:28',
                    views: '0',
                    enabled: true,
                    cancelled: false,
                    hidden: false,
                    finalised: true,
                    featured: false,
                    close_tickets_x_minutes_before: '30',
                    user_id: '790',
                    venue_id: '408',
                    reference_num: '',
                    title: 'Brewd Island Bay Burger Welli',
                    registration_fees: null,
                    event_type_id: '30',
                    blurb: null,
                    content: null,
                    notes: null,
                    image: 'https://goodcms.s3.amazonaws.com/woap/event/Brewd-Island-Bay-burger-WOAP-190520-111840.jpg',
                    image2: null,
                    json: null,
                    tags: null,
                    soldout: false,
                    sellingfast: false,
                    weeklong: false,
                    multiday: false,
                    label: '',
                    label_flag: '',
                    label_hex: '',
                    region: null,
                    public_link: '/event/view/1807-brewd-island-bay-burger-welli',
                    sessions: [],
                    session_tickets: [],
                    total_price_for_burger_beer_match: '31',
                    select_your_garage_project_beer_match: 'Kuro - Japanese inspired Black Lager',
                    does_your_burger_offering_cater_to_please_leave_blank_if_you_cannot_cater_to_these_dietaries: [
                      'Gluten Free'
                    ],
                    burger_price: '23',
                    burger_description: 'Crispy pork belly tossed in calamansi and miso sauce with a grilled beef patty, smoked cheddar, apple Sriracha slaw and scallions in a soft brioche bun, with dirty chips and bacon bits.',
                    are_fries_included: 'Yes',
                    what_is_the_main_protein_of_your_burger: 'Pork',
                    does_the_name_include_a_pun: 'Yes',
                    name_of_burger: 'It\'s Swine Time',
                    general_sale_tickets_soldout: 0
                  },
                  lat: -41.33528,
                  lng: 174.773581
                }
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.changeView = this.changeView.bind(this);
        this.handleSelectMarker = this.handleSelectMarker.bind(this);
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
        // console.log(marker);
        // var myJSON = JSON.stringify(marker);
        // console.log(myJSON);
        this.setState({
            currentEvent: marker
        });
    }

    handleImageLoaded(){
        console.log("image has loaded");
    }
    renderMoreInfo(){
        const {currentEvent, currentView} = this.state;
        if(currentView === 'burger'){
            return (
                <div className="eventDetails">
                    <h2>{currentEvent['eventDetails']['name_of_burger']}</h2>
                    <img
                        src={currentEvent['eventDetails']['image']} alt={currentEvent['eventDetails']['name_of_burger']}
                        onLoad={this.handleImageLoaded.bind(this)}

                    />
                    <p>{currentEvent['eventDetails']['burger_description']}</p>
                    <h3>{currentEvent['venueDetails']['title']}</h3>
                    <p>{currentEvent['venueDetails']['address1']}, {currentEvent['venueDetails']['address2']}</p>
                </div>
            )
        } else {
            return (
                <div className="eventDetails">
                    <p>nothing Yet</p>
                </div>
            )
        }

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

                    <div className="festivalCatsContainer">
                        <div className={`festivalCats events ${currentView === 'event'? 'active': ''}`} onClick={this.changeView.bind(this,'event')}><FontAwesomeIcon icon={faFlag}/> Events</div>
                        <div className={`festivalCats dine ${currentView === 'dine'? 'active': ''}`} onClick={this.changeView.bind(this,'dine')}><FontAwesomeIcon icon={faUtensils}/> Dine</div>
                        <div className={`festivalCats burger ${currentView === 'burger'? 'active': ''}`} onClick={this.changeView.bind(this,'burger')}> <FontAwesomeIcon icon={faHamburger}/> Burger</div>
                        <div className={`festivalCats cocktail ${currentView === 'cocktail'? 'active': ''}`} onClick={this.changeView.bind(this,'cocktail')}><FontAwesomeIcon icon={faCocktail}/> Cocktails</div>
                    </div>
                    <hr/>
                    { currentEvent? this.renderMoreInfo() : '' }
                </div>

                <div id="Map">
                    <MapContainer
                        currentView={this.state.currentView}
                        selectedMarker={this.handleSelectMarker}
                    />
                </div>

            </div>
        )
    }
}

export default App;
