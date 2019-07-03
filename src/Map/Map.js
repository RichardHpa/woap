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
            stores: [{latitude: -41.292662, longitude: 174.778967},
                     {latitude: -41.2936945, longitude: 174.7731592},
                     {latitude: -41.291377, longitude: 174.7922569},
                     {latitude: -41.287890, longitude: 174.779022},
                     {latitude: -41.293972, longitude: 174.782270}]
           }
        }

        displayMarkers = () => {
              return this.state.stores.map((store, index) => {
                return <Marker key={index} id={index} position={{
                 lat: store.latitude,
                 lng: store.longitude
               }}
               onClick={() => console.log("You clicked me!")} />
              })
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
               minZoom = {10}
               minZooom={9}
               styles={styles}

          >
            {this.displayMarkers()}
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
