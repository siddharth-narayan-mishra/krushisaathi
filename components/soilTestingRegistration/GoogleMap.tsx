"use client";
import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface GoogleMapProps {
  subscriptionKey: string;
  locations: { position: { latitude: number; longitude: number }; labName: string }[];
  destination: { longitude: number; latitude: number } | null;
  setDestination: (destination: {
    longitude: number;
    latitude: number;
  }) => void;
}

const containerStyle = {
  width: "full",
  height: "100vh",
};

const CustomGoogleMap: React.FC<GoogleMapProps> = ({
  subscriptionKey,
  locations,
  destination,
  setDestination,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [routePolyline, setRoutePolyline] =
    useState<google.maps.Polyline | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting user location:", error);
        setUserLocation({ lat: 0, lng: 0 });
      }
    );
  }, []);

  // Fit bounds to include user location and 3 nearest labs
  useEffect(() => {
    if (window.google?.maps?.geometry && map && userLocation) {
      const bounds = new window.google.maps.LatLngBounds();

      const nearestLocations = locations
        .map((location) => {
          const latLng = new window.google.maps.LatLng(
            location.position.latitude,
            location.position.longitude
          );

          return {
            ...location,
            latLng,
            distance:
              window.google.maps.geometry.spherical.computeDistanceBetween(
                new window.google.maps.LatLng(
                  userLocation.lat,
                  userLocation.lng
                ),
                latLng
              ),
          };
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      nearestLocations.forEach((location) => {
        bounds.extend(location.latLng);
      });
      bounds.extend(
        new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
      );

      map.fitBounds(bounds);
    }
  }, [locations, userLocation, map]);
  const fetchRoute = useCallback(
    async (origin: { lat: number; lng: number }, destination: { latitude: number; longitude: number }) => {
      const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": subscriptionKey,
          "X-Goog-FieldMask":
            "routes.polyline.encodedPolyline,routes.legs,routes.distanceMeters,routes.duration",
        },
        body: JSON.stringify({
          origin: {
            location: {
              latLng: {
                latitude: origin.lat,
                longitude: origin.lng,
              },
            },
          },
          destination: {
            location: {
              latLng: {
                latitude: destination.latitude,
                longitude: destination.longitude,
              },
            },
          },
          travelMode: "DRIVE",
        }),
      });

      const data = await response.json();
      return data.routes?.[0]?.polyline?.encodedPolyline;
    },
    [subscriptionKey]
  ); // Dependency array to avoid unnecessary recreation

  useEffect(() => {
    if (map && userLocation && destination) {
      fetchRoute(userLocation, destination).then((encodedPolyline) => {

        if (encodedPolyline) {
          if (routePolyline) {
            routePolyline.setMap(null);
          }

          const decodedPath =
            window.google.maps.geometry.encoding.decodePath(encodedPolyline);
          const polyline = new window.google.maps.Polyline({
            path: decodedPath,
            geodesic: true,
            strokeColor: "#0000ff",
            strokeOpacity: 1.0,
            strokeWeight: 3,
          });

          polyline.setMap(map);
          setRoutePolyline(polyline);
        } else {
          console.error("Failed to fetch route.");
        }
      });
    }
  }, [map, userLocation, destination, fetchRoute, routePolyline]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: subscriptionKey,
    libraries: ["geometry", "places"],
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    if (!window.google) return;
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const userLocationIcon = isLoaded
    ? {
        url: "/assets/icons/user-location.svg",
        scaledSize: new window.google.maps.Size(40, 40),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(20, 40),
      }
    : undefined;

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || { lat: 0, lng: 0 }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon} />
        )}
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{
              lat: location.position.latitude,
              lng: location.position.longitude,
            }}
            onClick={() => {
              setDestination(location.position);
            }}
            label={{
              text: location.labName,
              className: "marker-label",
            }}
          />
        ))}
      </GoogleMap>
    )
  );
};

export default CustomGoogleMap;
