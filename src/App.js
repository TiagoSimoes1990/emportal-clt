import UserCard from './components/user-card';
import './App.css';

// Images imports
const userPhoto = '../../images/TS_ProfilePhoto.jpg'

function fnHandleClickEvent(msg) {
  console.log(msg);
}

function App() {
  return (
    <div className="App">
      <UserCard
        userPhoto = {userPhoto}
        firstName = {"Tiago"}
        lastName = {"Simões"}
        position = {"Software Engineer"}
        email = {"tiago.simoes@gmail.com"}
        phoneNumber = {"+351 912 738 499"}
        onCardClick = {fnHandleClickEvent}/>
    </div>
  );  
}

export default App;
