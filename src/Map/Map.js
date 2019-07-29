import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Map.scss';
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const styles = require('./GoogleMapStyles.json');

export class MapContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            zoom: 12,
            mapLocation:{
                lat: -41.2865,
                lng: 174.7762
            },
            markers: [],
            currentType: '',
            activeMarker: null
        }

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        this.mapReady = this.mapReady.bind(this);
    }

    componentDidMount () {
        this.setState({
            markers: this.props.currentMarkers,
            currentType: this.props.currentView
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentView !== prevProps.currentView) {
            this.setState({
                markers: this.props.currentMarkers,
                currentType: this.props.currentView,
                activeMarker: null
            })
        }
        if(this.props.currentMarkers !== prevProps.currentMarkers){
            this.setState({
                markers: this.props.currentMarkers,
                activeMarker: null
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if((this.state.zoom !== nextState.zoom) || (this.state.mapLocation !== nextState.mapLocation)){
            return true;
        }
        if(this.state.markers !== nextProps.currentMarkers){
            return true;
        }
        return (this.state.currentType !== nextProps.currentView);
    }

    onMarkerClick(props, marker, e){
        const { markers } = this.state;
        var markerID = props.id;
        for (var i = 0; i < markers.length; i++) {
            if(markers[i].id === markerID){
                this.props.selectedMarker(markers[i]);
                this.setState({
                    zoom: 15,
                    mapLocation: marker.position,
                    activeMarker: marker
                });
                break;
            }
        }
    }

    onMapClicked(){
        this.props.mapClick();
    }

    displayMarkers = () => {
        const { activeMarker } = this.state;
        return this.state.markers.map((marker, index) => {
            let icon = process.env.PUBLIC_URL + '/img/'+this.state.currentType+'Marker.png';
            if(activeMarker && (activeMarker.id === marker.id)){
                icon = process.env.PUBLIC_URL + '/img/selectedMarker.png';
            }
            return <Marker
                key={index}
                id={marker.id}
                icon={{ url: icon}}
                position={{
                lat: marker.lat,
                lng: marker.lng
                }}
                onClick={this.onMarkerClick}
            />
        })
    }

    mapReady(){
        this.props.mapReady();
    }

    render() {
        const {zoom, mapLocation} = this.state;
        this.mapReady();
        return (
            <Map
            google={this.props.google}
            initialCenter={mapLocation}
            center={mapLocation}
            zoom={zoom}
            minZoom={10}
            styles={styles}
            onClick={this.onMapClicked}
            onReady={this.mapReady}
            disableDefaultUI={true}
            zoomControl={true}
            zoomControlOptions={{
                position: 'LEFT_CENTER'
            }}

            >
                {this.displayMarkers()}
            </Map>

        );
    }
  }

export default GoogleApiWrapper({
  apiKey: (API_KEY)
})(MapContainer)

// zoomControlOptions {
// position: google.maps.ControlPosition.LEFT_CENTER
// },
