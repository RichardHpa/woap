import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios'
import './Map.scss';
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


export class MapContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            locations: [],
            markers: [],
            currentType: 'all',
            currentView: []
        }
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
            console.log(allLocations);
            this.setState({
                locations: allLocations
            })
        })
    }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.currentView !== prevProps.currentView) {
          const { locations } = this.state;
          var newView = this.props.currentView;
          var searchTerm = '';
          switch(newView){
              case 'event':
                searchTerm = '';
              break;
              case 'dine':
                searchTerm = 'festival_dish_description';
              break;
              case 'cocktail':
                searchTerm = 'main_type_of_spirit_in_your_cocktail';
              break;
              case 'burger':
                searchTerm = 'burger_price';
              break;
          }

          var eventsToShow = [];

          for (var i = 0; i < locations.length; i++) {
              var venue = locations[i];
              for (var j = 0; j < venue.Event.length; j++) {
                  var singleEvent = venue.Event[j];
                  if(singleEvent[searchTerm] !== undefined){
                      var latLng = venue.Venue.ll.split(",");
                      eventsToShow.push({
                          id: i+1,
                          venueDetails: venue.Venue,
                          eventDetails: singleEvent,
                          lat: parseFloat(latLng[0]),
                          lng: parseFloat(latLng[1])
                      })
                    }

                }

            }
            console.log(eventsToShow);
            this.setState({
                markers: eventsToShow,
                currentType: newView
            })
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.currentType !== nextProps.currentView);
    }


    render() {
        const { locations } = this.state;
      return (
          <Map
              google={this.props.google}
              initialCenter={{
                 lat: -41.2865,
                 lng: 174.7762
               }}
               zoom={12}
          >
          {
                this.state.markers.map(marker => {
                    return(
                        <Marker
                        key={marker.id}
                         title={marker.title}
                         name={marker.title}
                         position={{lat: marker.lat, lng: marker.lng}} />
                    )

                })
            }

          </Map>
      );
    }
  }



export default GoogleApiWrapper({
  apiKey: (API_KEY)
})(MapContainer)







// <div className="container">
// {
//       this.state.locations.map(location => {
//           return(
//               <div
//               key={location.Venue.id}
//                className="locationCard">
//                   <div className="card">
//                       <img className="img-top" src={location.Venue.image} alt="image"/>
//                       <div className="card-body">
//                           <h5>{location.Venue.title}</h5>
//                       </div>
//                   </div>
//               </div>
//           )
//
//       })
//   }
// </div>

// var u = r.eventTypes && 3 === r.eventTypes.length;
// (u || -1 !== r.eventTypes.indexOf("dine")) && f(a, "Event.what_dietaries_are_or_could_be_catered_to_in_this_menu_from_all_dishes", r.dietary),
// (u || -1 !== r.eventTypes.indexOf("burger")) && f(a, "Event.burger_dietary_requirements", r.dietary),
// (u || -1 !== r.eventTypes.indexOf("cocktail")) && f(a, "Event.cocktail_dietary_requirements", r.dietary)
