import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header' 
import Nav from './components/nav/Nav' 
import Animation from './components/animation/Animation' 
import Description from './components/description/Description' 
import About from './components/about/About' 
import Privacy from './components/privacy/Privacy' 
import Footer from './components/footer/Footer'

function App() {
    return ( 
        <div>  
            <Nav/>
            <Header/>  
            <Animation/> 
            <Description/>  
            <About/>  
            <Privacy/> 
            <Footer/>
        </div>
    );
}

export default App;