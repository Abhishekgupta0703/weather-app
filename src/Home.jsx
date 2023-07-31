import React, { useState } from "react";
import axios from "axios";
export default function Home() {
  const [data, setData] = useState({
    celsius: 10,
    name: "london",
    humidity: 80,
    speed: 2,
    iconCode: "04d",
    iconUrl: "http://openweathermap.org/img/w/04d.png"
  });
  const [name, setName] = useState("");
  function handleClick() {
    if (name !== "") {
      const apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        name +
        "&appid=f469881006409f19353f9ffe604cdc4b&units=metric";

      axios
        .get(apiUrl)
        .then((res) => {
          setData({
            ...data,
            celsius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            iconCode: res.data.weather[0].icon,
            iconUrl:
              "http://openweathermap.org/img/w/" +
              res.data.weather[0].icon +
              ".png"
          });
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleClick}>
            <img
              src="https://th.bing.com/th/id/OIP.zauFo5LpJiOvon3jJEM3nwHaHa?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt=""
            />
          </button>
        </div>
        <div className="w-info">
          <img src={data.iconUrl} alt="" className="icon" />
          <h1>{Math.round(data.celsius)}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img
                src="https://th.bing.com/th/id/OIP.wTDznQhLRVzOfb3pMDHkMAHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt=""
              />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img
                src="https://cdn2.iconfinder.com/data/icons/nature-life-line-art/128/wind-1024.png"
                alt=""
              />
              <div className="wind">
                <p>{Math.round(data.speed)} KM/H</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
