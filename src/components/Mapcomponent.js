import { GoogleMap, useLoadScript, Marker, Polyline } from "@react-google-maps/api";

const MapComponent = ({ locations, addLocation, deleteLocation, clearLocations, setSelectedLocation }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyACLJFhsOrdp9IWI0zg026-mv1EJMC2kQ4",
  });

  if (!isLoaded) return <div>Loading...</div>;

  // Function to handle map clicks
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    addLocation({ lat, lng });
  };

  // Function to handle marker clicks
  const handleMarkerClick = (location) => {
    setSelectedLocation(location); // Set selected location on marker click
  };

  return (
    <div>
      <GoogleMap
        zoom={10}
        center={locations.length ? locations[0] : { lat: 51.505, lng: -0.09 }}
        mapContainerStyle={{ width: '100%', height: '400px' }}
        onClick={handleMapClick} // Add marker on map click
      >
        {/* Render markers for each location */}
        {locations.map((location, index) => (
          <Marker 
            key={index} 
            position={location}
            onClick={() => handleMarkerClick(location)} // Set selected location on marker click
          />
        ))}

        {/* Render polyline for the route */}
        {locations.length > 1 && <Polyline path={locations} />}
      </GoogleMap>

      {/* Button to clear all locations */}
      <button onClick={clearLocations}>Clear All Locations</button>
    </div>
  );
};

export default MapComponent;
