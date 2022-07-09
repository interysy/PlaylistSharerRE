
import './App.css';
import Header from './components/header/Header' 
import Nav from './components/nav/Nav'  
import Options from './components/options/Options'
import Animation from './components/animation/Animation' 
import Description from './components/description/Description' 
import ContactMe from './components/contactme/ContactMe' 
import Privacy from './components/privacy/Privacy' 
import Footer from './components/footer/Footer'
 
 
let loginToSpotify = function() { 
    window.location.replace("http://localhost:3000/loginspotify");
} 

function App() {
    return ( 
        <div>  
            <Nav/>
            <Header/>  
            <Animation/>  
            <Options/>
            <Description/>  
            <ContactMe/>
            <Privacy/> 
            <Footer/>
        </div>
    );
}

export default App;