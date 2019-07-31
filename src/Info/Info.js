import React, { Component } from 'react';
import './Info.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'

class Info extends Component {

    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            imgLoaded: false
        }
        this.closeInfo = this.closeInfo.bind(this);
        this.handleImageLoad = this.handleImageLoad.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentEvent !== prevProps.currentEvent) {
            this.setState({
                imgLoaded: false,
                loaded: true,
            })
            if(this.props.currentEvent === null ){
                this.setState({
                    loaded: false,
                    imgLoaded: false
                })
            }
        }
    }

    handleImageLoad(){
        this.setState({
            imgLoaded: true
        })
    }

    renderMoreInfo(){
        const {currentEvent, currentView} = this.props;
        const {imgLoaded} = this.state;
        let styles = {
            'backgroundImage': 'url('+currentEvent['eventDetails']['image']+')'
        }
        if(currentView === 'burger'){
            return(
                <div className='eventDetails'>
                    <h2>{currentEvent['eventDetails']['name_of_burger']} - ${currentEvent['eventDetails']['burger_price']}</h2>
                    <h3>{currentEvent['venueDetails']['title']}</h3>
                    {currentEvent['eventDetails']['image']?
                        <div className={`mainImage ${imgLoaded ? 'imageLoaded':''}`} style={styles}>
                        {
                            imgLoaded ? '': <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        }
                            <img
                                src={currentEvent['eventDetails']['image']}
                                alt={currentEvent['eventDetails']['name_of_burger']}
                                className="imgSrc"
                                onLoad={this.handleImageLoad}
                            />
                        </div>
                    :
                        ''
                    }
                    <p>{currentEvent['eventDetails']['burger_description']}</p>
                    <p>{currentEvent['venueDetails']['address1']}, {currentEvent['venueDetails']['address2']}</p>
                </div>
            )
        } else if(currentView === 'dine'){
            return(
                <div className='eventDetails'>
                    <h2>{currentEvent['venueDetails']['title']}</h2>
                    {currentEvent['eventDetails']['image']?
                        <div className={`mainImage ${imgLoaded ? 'imageLoaded':''}`} style={styles}>
                        {
                            imgLoaded ? '': <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        }
                            <img
                                src={currentEvent['eventDetails']['image']}
                                className="imgSrc"
                                alt={currentEvent['venueDetails']['title']}
                                onLoad={this.handleImageLoad}
                            />
                        </div>
                    :
                        ''
                    }
                    <p>{currentEvent['eventDetails']['festival_dish_description']}</p>
                    <p>{currentEvent['venueDetails']['address1']}, {currentEvent['venueDetails']['address2']}</p>
                </div>
            )
        } else if(currentView === 'events'){
            return(
                <div className='eventDetails'>
                    <h2>{currentEvent['eventDetails']['title']}</h2>
                    <h3>{currentEvent['venueDetails']['title']}</h3>
                    {currentEvent['eventDetails']['image']?
                        <div className={`mainImage ${imgLoaded ? 'imageLoaded':''}`} style={styles}>
                        {
                            imgLoaded ? '': <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        }
                            <img
                                src={currentEvent['eventDetails']['image']}
                                className="imgSrc"
                                alt={currentEvent['eventDetails']['title']}
                                onLoad={this.handleImageLoad}
                            />
                        </div>
                    :
                        ''
                    }
                    <p>{currentEvent['eventDetails']['short_description']}</p>
                    <p>{currentEvent['venueDetails']['address1']}, {currentEvent['venueDetails']['address2']}</p>
                </div>
            )
        } else if(currentView === 'cocktail'){
            return(
                <div className='eventDetails'>
                    <h2>{currentEvent['eventDetails']['title']} - ${currentEvent['eventDetails']['price_of_cocktail_tapas_match']}</h2>
                    <h3>{currentEvent['venueDetails']['title']}</h3>
                    {currentEvent['eventDetails']['image']?
                        <div className={`mainImage ${imgLoaded ? 'imageLoaded':''}`} style={styles}>
                        {
                            imgLoaded ? '': <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        }
                            <img
                                src={currentEvent['eventDetails']['image']}
                                className="imgSrc"
                                alt={currentEvent['eventDetails']['title']}
                                onLoad={this.handleImageLoad}
                            />
                        </div>
                    :
                        ''
                    }
                    <p>{currentEvent['eventDetails']['description_of_cocktail_and_regionally_inspired_tapas_match']}</p>
                    <p>{currentEvent['venueDetails']['address1']}, {currentEvent['venueDetails']['address2']}</p>
                </div>
            )
        }

    }

    closeInfo(){
        this.setState({
            loaded: false,
            imgLoaded: false
        })
        this.props.closeEvent();
    }

    render(){
        const {currentEvent} = this.props;
        const {loaded} = this.state;
        return(
            <div
                className={`infoSidebar ${loaded? 'InfoOpen': ''}`}

            >
                <div
                    className="backArrow"
                    onClick={this.closeInfo}
                ><FontAwesomeIcon icon={faArrowLeft} size="2x"/></div>

                { currentEvent? this.renderMoreInfo() : '' }

            </div>
        )
    }
}


export default Info;
