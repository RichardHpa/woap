import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios'
import './Map.scss';
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const styles = require('./GoogleMapStyles.json')


export class MapContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            locations: [],
            markers: [],
            currentType: 'all',
            currentView: []
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
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
            // console.log(allLocations);
            this.setState({
                locations: allLocations
            })
        })
    }

    componentDidUpdate(prevProps) {
        // this.setState({
        //     markers: []
        // })
      if (this.props.currentView !== prevProps.currentView) {
          const { locations } = this.state;
          var newView = this.props.currentView;
          var eventID = 0;
          switch(newView){
              case 'event':
                eventID = 29;
              break;
              case 'burger':
                eventID = 30;
              break;
              case 'dine':
                  eventID = 31;
              break;
              case 'cocktail':
                eventID = 32;
              break;
              default:

              break;
          }

          var eventsToShow = [];
          var iterationNum = 1
          for (var i = 0; i < locations.length; i++) {
              var venue = locations[i];
              for (var j = 0; j < venue.Event.length; j++) {
                  var singleEvent = venue.Event[j];
                  if(singleEvent['event_type_id'] == eventID){
                      var latLng = venue.Venue.ll.split(",");
                      eventsToShow.push({
                          id: iterationNum,
                          venueDetails: venue.Venue,
                          eventDetails: singleEvent,
                          lat: parseFloat(latLng[0]),
                          lng: parseFloat(latLng[1])
                      });
                      iterationNum++;
                  }
                }
            }
            this.setState({
                markers: eventsToShow,
                currentType: newView
            })
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.currentType !== nextProps.currentView);
    }

    renderMarkers() {
      return this.state.markers.map((marker, i) => {
        return <Marker
          key={i}
          markerID={marker.id}
          title={marker.title}
          name={marker.title}
          animation={this.props.google.maps.Animation.DROP}
          position={{lat: marker.lat, lng: marker.lng}}
          onClick={this.onMarkerClick}
          />
      })
    }

    boundsChanged(bounds){
        console.log('here');

        // console.log(this.map.getBounds().getNorthEast());
    }


    onMarkerClick(props, marker, e){
        const { markers } = this.state;
        var markerID = props.markerID;
        for (var i = 0; i < markers.length; i++) {
            if(markers[i].id === markerID){
                this.props.selectedMarker(markers[i]);
                break;
            }
        }
    }

    render() {
      return (
          <Map
              google={this.props.google}
              initialCenter={{
                 lat: -41.2865,
                 lng: 174.7762
               }}
               zoom={12}
               onDragend={this.boundsChanged}
               styles={styles}

          >
          {
              this.renderMarkers()
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
