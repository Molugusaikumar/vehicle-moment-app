import React, { useState } from "react";
import MapComponent from "./components/Mapcomponent";
import polyline from 'polyline'; // Import polyline package

const App = () => {
  const [locations, setLocations] = useState([]); // Array to store coordinates
  const [selectedLocation, setSelectedLocation] = useState({ lat: '', lng: '' }); // For selected marker
  const [encodedPolyline, setEncodedPolyline] = useState(''); // For encoded polyline

  // Function to add a new location
  const addLocation = (location) => {
    setLocations((prevLocations) => {
      const newLocations = [...prevLocations, location];
      const encoded = polyline.encode(newLocations.map(loc => [loc.lat, loc.lng]));
      setEncodedPolyline(encoded); // Update encoded polyline
      return newLocations;
    });
    setSelectedLocation({ lat: location.lat, lng: location.lng }); // Update selected location
  };

  // Function to delete a specific location
  const deleteLocation = (index) => {
    setLocations((prevLocations) => {
      const newLocations = prevLocations.filter((_, i) => i !== index);
      const encoded = polyline.encode(newLocations.map(loc => [loc.lat, loc.lng]));
      setEncodedPolyline(encoded); // Update encoded polyline
      return newLocations;
    });
    if (locations.length > 0) {
      setSelectedLocation(locations[Math.min(index, locations.length - 1)]); // Update selected location
    } else {
      setSelectedLocation({ lat: '', lng: '' });
    }
  };

  // Function to clear all locations
  const clearLocations = () => {
    setLocations([]);
    setEncodedPolyline(''); // Clear encoded polyline
    setSelectedLocation({ lat: '', lng: '' }); // Clear selected location
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedLocation((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <MapComponent 
        locations={locations} 
        addLocation={addLocation} 
        deleteLocation={deleteLocation} 
        clearLocations={clearLocations} 
        setSelectedLocation={setSelectedLocation}
      />
      <div>
        <h3>Locations:</h3>
        <ul>
          {locations.map((location, index) => (
            <li key={index}>
              {`Lat: ${location.lat}, Lng: ${location.lng}`} 
              <button onClick={() => deleteLocation(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <button onClick={() => addLocation(selectedLocation)}>Add Location</button>
        <button onClick={clearLocations}>Clear All</button>
        <div>
          <h3>Selected Location:</h3>
          <label>
            Latitude:
            <input
              type="text"
              name="lat"
              value={selectedLocation.lat}
              onChange={handleInputChange}
              placeholder="Latitude"
            />
          </label>
          <label>
            Longitude:
            <input
              type="text"
              name="lng"
              value={selectedLocation.lng}
              onChange={handleInputChange}
              placeholder="Longitude"
            />
          </label>
        </div>
        <div>
          <h3>Encoded Polyline:</h3>
          <textarea 
            rows="4" 
            cols="50" 
            value={encodedPolyline} 
            readOnly 
          />
        </div>
      </div>
    </div>
  );
};

export default App;
