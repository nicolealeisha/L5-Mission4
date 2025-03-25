import "./App.css";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import ChatBot from "./components/Chatbot";

const App = () => {

  return (
  <>
    <HeaderNav></HeaderNav>
    <div>
      <h1>Welcome to Turners</h1>
      <img className='source-image' src='https://content.tgstatic.co.nz/webassets/contentassets/334c8c19736f43d883ca6c5d4cc3328f/img_2469_sky.jpg' alt='image of vehicle'></img>
    </div>
    <ChatBot></ChatBot>
    <Footer></Footer>
  </>
  );
};

export default App;
