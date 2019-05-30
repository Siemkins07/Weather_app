import React, {
    Component
} from 'react';
import './App.css';
import Form from './Form';
import Result from './Result'

const APIKey = 'a0a0f8d4f1866241fcaa209be5288f29';

class App extends Component {
    state = {
        value: '',
        date: "",
        city: '',
        sunrise: '',
        sunset: '',
        temp: '',
        pressure: "",
        wind: '',
        error: false,
        iconCode: '',
    }

    handleInputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleCitySearch = (e) => {
        e.preventDefault();
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

        fetch(API)
            .then(response => {
                if (response.ok) {
                    return response
                }
                throw Error('Nie udało się')
            })
            .then(response => response.json())
            .then(result => {
                const time = new Date().toLocaleString()
                this.setState(prevState => ({
                    error: false,
                    date: time,
                    city: prevState.value,
                    sunrise: result.sys.sunrise,
                    sunset: result.sys.sunset,
                    temp: result.main.temp,
                    pressure: result.main.pressure,
                    wind: result.wind.speed,
                    iconCode: result.weather[0].icon,
                    value: ""
                }))
            })
            .catch(err => {
                this.setState(prevState => ({
                    error: true,
                    city: prevState.value
                }))
            })
    }

    render() {
        return ( <
            div className = 'app' >
            <
            Form value = {
                this.state.value
            }
            placeholder = 'Wpisz miasto'
            change = {
                this.handleInputChange
            }
            search = {
                this.handleCitySearch
            }
            /> <
            Result weather = {
                this.state
            }
            /> <
            /div>
        );
    }
}

export default App;











// 4. FETCH THROW CATCH Dodawanie kolejnych userów + foto z api

// import React, {
//     Component
// } from 'react'
// import './App.css'
// import ButtonFetchUsers from './ButtonFetchUsers'
// import UsersList from './UsersList'

// const API = 'https://randomuser.me/api/?results=1'

// class App extends Component {
//     state = {
//         users: []
//     }

//     handleDataFetch = () => {
//         // console.log('klik');
//         fetch(API)
//             .then(response => {
//                 if (response.ok) {
//                     // console.log(response)

//                     return response;
//                 }
//                 throw Error(response.status)
//             })
//             .then(response => response.json())
//             .then(result => {
//                 const user = result.results
//                 this.setState((prevState) => ({
//                     users: prevState.users.concat(user)
//                 }))
//             })
//             .catch(error => console.log(error + ' nie działa'))
//     }

//     render() {
//         const users = this.state.users
//         return ( <
//             div >
//             <
//             ButtonFetchUsers click = {
//                 this.handleDataFetch
//             }
//             /> {
//                 users.length > 0 ? < UsersList users = {
//                     users
//                 }
//                 /> : null} <
//                 /div>
//             );
//         }
//     }

//     export default App;



// 3. POBIERANIE ZA POMOCA XMLHTTPREQUEST Z (FEJOWEGO) API

// import React, { Component } from 'react';

// class App extends Component {

//     state = {
//         users: []
//     }

//     componentDidMount() {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
//         xhr.onload = () => {
//             if (xhr.status === 200) {
//                 const users = JSON.parse(xhr.response)
//                 console.log(users);
//                 this.setState({
//                     users
//                 })
//             }
//         }


//         xhr.send(null)
//     }

//     render() {

//         const users = this.state.users.map(user => (
//             <div key={user.id}>
//                 <h4>{user.name}</h4>
//                 <p>{user.address.street}, {user.address.city}</p>
//             </div>
//         ))

//         return (
//             <>
//                 {users}
//             </>
//         );
//     }
// }

// export default App;




// 2. POBIERANIE ZA POMOCA FETCH Z LOKALNEGO PLIKU (WORDS.JSON)

// import React, { Component } from 'react';
// import './App.css';
// import Word from './Word'

// class App extends Component {
//     state = {
//         words: [],
//         isLoaded: false,
//     }

//     componentDidMount() {
//         setTimeout(this.fetchData, 3000)
//     }

//     fetchData = () => {
//         fetch('words.json')
//             .then(response => response.json())
//             .then(result => {
//                 this.setState({
//                     words: result.words,
//                     isLoaded: !this.state.isLoaded
//                 })
//             })
//     }


//     render() {

//         const words = this.state.words.map(word => (
//             <Word key={word.id} english={word.en} polish={word.pl} />


//         ))
//         return (
//             <ul>
//                 {this.state.isLoaded ? words : "Ładuję dane"}
//             </ul>
//         )
//     }
// }

// export default App;





// 1. GENERATOR WIADOMOSCI


// import React, { Component } from 'react';
// import './App.css';


// const data = [
//   { id: 1, title: "wiadomość 1", body: 'zawartość wiadomości 1...' },
//   { id: 2, title: "wiadomość 2", body: 'zawartość wiadomości 2...' },
// ]

// setInterval(() => {
//   const index = data.length + 1;
//   data.push({
//     id: index,
//     title: `wiadomość ${index}`,
//     body: `zawartość wioadomości ${index} ...`
//   })

// }
//   , 8000)

// class App extends Component {
//   state = {
//     messages: [...data]
//   }

//   getData = () => {
//     if (this.state.messages.length <= data.length) {
//       this.setState({
//         messages: [...data]
//       })
//     } else {
//       console.log('brak zmian');
//     }
//   }

//   componentDidMount() {
//     this.idI = setInterval(this.getData, 5000)
//   }

//   componentWillUnmount() {
//     clearInterval(this.idI)
//   }

//   render() {
//     const messages = this.state.messages.map(message => (
//       <div key={message.id}>
//         <h4>{message.title}</h4>
//         <p>{message.body}</p>
//       </div>

//     ))
//     return (
//       <div className="App">
//         {messages.reverse()}
//       </div>

//     );
//   }
// }

// export default App;