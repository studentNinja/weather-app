import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Map: React.FC = () => {
    const weather = useSelector((state: RootState) => state.weather.data);

    const coord = weather?.coord;
    const center: [number, number] = coord ? [coord.lat, coord.lon] : [0, 0];

    //for correct marker rendering
    React.useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);

    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '50vh', width: '50vw' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coord && (
                <Marker position={center} />

            )}
        </MapContainer>
    );
};

export default Map;
