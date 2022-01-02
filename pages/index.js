import { stations } from "../components/Stations";
import styles from "../styles/Scroll.module.css";
import React, { useEffect, useState } from "react";

/***** EXAMPLE OF A HIGHER-ORDER FUNCTION *****/
/*****  React uses higher-order component (HOC) technique -> a function that takes a component and returns a new component *****/
export const Assignment = () => {
  const [id, setID] = useState();
  const [meteo, setMeteo] = useState({});

  // API params
  const URL = `https://api.openweathermap.org/data/2.5/onecall`;
  const API_KEY = `c44f77911579d2cbc82efc379374400c`;

  /***** EXAMPLE OF A PURE FUNCTION *****/
  /*****  The argument "id" is passed to the function to get coords of the selected city and will return the weather of this city *****/
  const getStation = async (id) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${id}&appid=${API_KEY}`
    );
    const data = await res.json();
    const latLon = data.coord;
    const res2 = await fetch(
      `${URL}?lat=${latLon?.lat}&lon=${latLon?.lon}&exclude=minutely&appid=${API_KEY}&units=metric`
    );
    const weatherRender = await res2.json();
    setMeteo(weatherRender);
    setID(id);
  };

  /***** EXAMPLE OF DATA TRANSFORMATION WITH MAP *****/
  /***** Below Array.map() is used to create a new array with the result of a function executed on every item of the original array -> to render data *****/
  return (
    <>
      <div className={styles.main}>
        <div>
          <div>
            <p>
              {new Date(meteo.current?.dt * 1000).toLocaleString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <form>
              <select onChange={(e) => getStation(e.target.value)}>
                {stations.map((station, index) => (
                  <option key="index" value={station.name}>
                    {station.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div>
            <h2>Current weather</h2>
            {meteo.current?.weather.map((description, index) => (
              <p key="index">Description: {description.main}</p>
            ))}
            <p>Feels like: {meteo.current?.feels_like} °C </p>
            <p>
              Sunrise:{" "}
              {new Date(meteo.current?.sunrise * 1000).toLocaleTimeString(
                "en-GB",
                { hour: "2-digit", minute: "2-digit" }
              )}
            </p>
            <p>
              Sunset:{" "}
              {new Date(meteo.current?.sunset * 1000).toLocaleTimeString(
                "en-GB",
                { hour: "2-digit", minute: "2-digit" }
              )}
            </p>
            <p>Temperature: {meteo.current?.temp} °C </p>
            <p>Wind speed: {meteo.current?.wind_speed} m/s </p>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Assignment;
