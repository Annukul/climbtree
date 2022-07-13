import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [longitude, setLongitude] = useState<any>();
  const [latitude, setLatitude] = useState<any>();
  if (navigator.geolocation) {
    console.log("Available");
  } else {
    console.log("Not Available");
  }

  useEffect(() => {
    const error = (err: any) => {
      console.warn("ERROR(" + err.code + "): " + err.message);
    };

    const options = {
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 0,
    };

    const success = (pos: any) => {
      console.log(pos.coords.latitude, pos.coords.longitude);
      setLongitude(pos.coords.longitude);
      setLatitude(pos.coords.latitude);
    };

    navigator.geolocation.watchPosition(success, error, options);
  }, [longitude, latitude]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>ClimbTree</h2>
        {longitude && latitude && (
          <a
            href={`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`}
            target="_blank"
            rel="noreferrer"
          >
            Click here
          </a>
        )}
      </header>
    </div>
  );
}

export default App;
