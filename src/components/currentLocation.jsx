import React from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather/build/ReactAnimatedWeather";

const dateBuilder = () => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let newDate = new Date();
  let day = days[newDate.getDay()];
  let date = newDate.getDate();
  let month = months[newDate.getMonth()];
  let year = newDate.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
    displayCelsius: true,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        // If user allows location service then fetch data & send it to getWeather function.
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          // If user denied location service then standard location weather will le shown on basis of latitude & latitude.
          this.getWeather(28.67, 77.22);
          alert(
            "Location service disabled. Allow location access. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getWeather = async (lat, lon) => {
    const response = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKeys.key}`
    );
    const data = await response.json();
    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,
    });
  };

  handleToggle = () => {
    this.setState((prevState) => ({
      displayCelsius: !prevState.displayCelsius,
    }));
  };

  render() {
    if (this.state.temperatureC) {
      return (
        <React.Fragment>
          <div className="city">
            <div className="title">
              <h2>{this.state.city}</h2>
              <h3>{this.state.country}</h3>
            </div>
            <div className="mb-icon">
              {" "}
              <ReactAnimatedWeather
                icon={this.state.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              <p>{this.state.main}</p>
            </div>
            <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </div>
                <div className="current-date">{dateBuilder()}</div>
              </div>
              <div className="temperature">
                <button
                  style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    padding:'5px',
                    borderRadius:'8px',
                    zIndex: 1000,
                    fontWeight:'bold',
                    backgroundColor:'light-Gray',
                    cursor:'pointer'
                  }}
                  onClick={this.handleToggle}
                >
                  In Fahrenheit
                </button>
                <p className="tmpleft">
                  {this.state.displayCelsius
                    ? this.state.temperatureC + "°C"
                    : this.state.temperatureF + "°F"}
                </p>
              </div>
            </div>
          </div>
          <Forcast icon={this.state.icon} weather={this.state.main} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {/* <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} /> */}
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location will be displayed on the App <br /> & used for
            calculating Real time weather.
          </h3>
        </React.Fragment>
      );
    }
  }
}

export default Weather;
