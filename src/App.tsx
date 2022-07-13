import React, { useEffect, useState } from "react";
import "./App.css";
import { getDistance } from "geolib";

function App() {
  const [longitude, setLongitude] = useState<any>();
  const [latitude, setLatitude] = useState<any>();
  const [distance, setDistance] = useState<any>();

  useEffect(() => {
    const error = (err: any) => {
      console.warn("ERROR(" + err.code + "): " + err.message);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };

    const success = (pos: any) => {
      const dist = getDistance({latitude: pos.coords.latitude, longitude: pos.coords.longitude}, {
        latitude: 28.6519500,
        longitude: 77.2314900,
      });
      setLongitude(pos.coords.longitude);
      setLatitude(pos.coords.latitude);
      setDistance(dist);
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>ClimbTree</h2>
        {distance && (
          <p>You are {distance/1000} Kms away from Delhi.</p>
        )}
        {longitude && latitude ? (
          <a
            href={`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`}
            target="_blank"
            rel="noreferrer"
          >
            Click here
          </a>
        ) : (
          <>
            <img
              src="https://loading.io/icon/gfoopo"
              width="10%"
              height="10%"
              style={{ position: "absolute" }}
              className="giphy-embed"
              alt="Loader"
            />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
