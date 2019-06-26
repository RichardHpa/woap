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
            currentView: 'all'
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.changeView = this.changeView.bind(this);
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

    render(){
        const { pageLoaded, navOpen , navVisibile, currentView} = this.state;
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
                    <h1>VISA WELLINGTON ON A PLATE 2019</h1>
                    <hr/>
                    <div className="festivalCatsContainer">
                        <div className={`festivalCats events ${currentView === 'event'? 'active': ''}`} onClick={this.changeView.bind(this,'event')}><FontAwesomeIcon icon={faFlag}/> Events</div>
                        <div className={`festivalCats dine ${currentView === 'dine'? 'active': ''}`} onClick={this.changeView.bind(this,'dine')}><FontAwesomeIcon icon={faUtensils}/> Dine</div>
                        <div className={`festivalCats burger ${currentView === 'burger'? 'active': ''}`} onClick={this.changeView.bind(this,'burger')}> <FontAwesomeIcon icon={faHamburger}/> Burger</div>
                        <div className={`festivalCats cocktail ${currentView === 'cocktail'? 'active': ''}`} onClick={this.changeView.bind(this,'cocktail')}><FontAwesomeIcon icon={faCocktail}/> Cocktails</div>
                    </div>
                </div>

                <div id="Map">
                    <h1>VISA WELLINGTON ON A PLATE 2019</h1>
                    <MapContainer
                        currentView={this.state.currentView}
                    />
                </div>

            </div>
        )
    }
}

export default App;
