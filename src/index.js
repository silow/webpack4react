import React from 'react';
import ReactDom from 'react-dom';
import ThemeButton from './components/themeButton';
import {LayoutContext,themes} from './context/LayoutContext'

function Toolbar(props){
    return (
        <button onClick={props.changeTheme}>
            Change Theme
        </button>
    )
    
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            theme : themes.light
        }
        this.toggleTheme = ()=>{
            this.setState(state=>({
                theme:
                    state.theme === themes.dark
                    ?themes.light
                    :themes.dark
            }))
        }   
    }
    render(){
       return( 
            <div>
                <LayoutContext.Provider value={this.state.theme}>
                    <Toolbar changeTheme={this.toggleTheme}/>
                </LayoutContext.Provider>
                <section>
                    <ThemeButton theme={this.state.theme}>abc</ThemeButton>
                </section>
            </div>)
    }
}


ReactDom.render(<App />, document.getElementById('app'))
