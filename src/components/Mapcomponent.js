import { GoogleMap, useLoadScript, Marker, Polyline } from "@react-google-maps/api";

const Mapcomponent = ({ vehiclePosition, route }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyACLJFhsOrdp9IWI0zg026-mv1EJMC2kQ4",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={10}
      center={vehiclePosition}
      mapContainerStyle={{ width: '100%', height: '400px' }}
    >
      <Marker position={vehiclePosition} />
      <Polyline path={route} />
    </GoogleMap>
  );
};

export default Mapcomponent;
