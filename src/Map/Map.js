import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios'
import './Map.scss';

export class MapContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            locations: [],
            markers: []
        }
    }

    componentDidMount () {
        axios.get('https://visawoap.com/api/venues/page:1/limit:1000/.json?key=4e44f1ac85cd60e3caa56bfd4afb675e')
        .then(response => {
            var allMarkers = [];
            for (var i = 0; i < response.data.venues.length; i++) {
                if(response.data.venues[i].Venue.ll){
                    var latLng = response.data.venues[i].Venue.ll.split(",");
                    allMarkers.push({
                        id: response.data.venues[i].Venue.id,
                        title: response.data.venues[i].Venue.title,
                        lat: parseFloat(latLng[0]),
                        lng: parseFloat(latLng[1]),
                    })
                }
            }

            this.setState({
                locations: response.data.venues,
                markers: allMarkers
            })
        })
    }

    render() {
        // console.log(this.state.markers);
        const allLocation = this.state.locations;
        console.log(allLocation);
        // if(this.state.locations.length > 0){
        //     console.log(this.state.locations[1].Venue);
        //     console.log(this.state.locations[1].Venue.ll);
        //     console.log(this.state.locations);
        // }
      return (
          <div className="container">
          {
                this.state.locations.map(location => {
                    return(
                        <div
                        key={location.Venue.id}
                         className="locationCard">
                            <div className="card">
                                <img className="img-top" src={location.Venue.image}/>
                                <div className="card-body">
                                    <h5>{location.Venue.title}</h5>
                                </div>
                            </div>
                        </div>
                    )

                })
            }
          </div>
      );
    }
  }
  //
  // <Marker
  //  title={'The marker`s title will appear as a tooltip.'}
  //  name={'SOMA'}
  //  position={{lat: -41.2865, lng: 174.7762}} />


export default GoogleApiWrapper({
  apiKey: ('AIzaSyBG1GkBIq_BFaENfsdC9Rw7i-MbW6xY3kg')
})(MapContainer)

// <Map
//     google={this.props.google}
//     initialCenter={{
//        lat: -41.2865,
//        lng: 174.7762
//      }}
//      zoom={12}
// >
// {
//       this.state.markers.map(marker => {
//           return(
//               <Marker
//               key={marker.id}
//                title={marker.title}
//                name={marker.title}
//                position={{lat: marker.lat, lng: marker.lng}} />
//           )
//
//       })
//   }
//
// </Map>
