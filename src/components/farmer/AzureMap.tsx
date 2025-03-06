"use client";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import * as atlas from "azure-maps-control";
import LabContext from "@/context/labContext";
import { Lab } from "@/models/Labs";

interface AzureMapProps {
  subscriptionKey: string;
  setLocations?: (locations: any) => void;
  destination: { longitude: number; latitude: number } | null;
}

const AzureMap: React.FC<AzureMapProps> = ({
  subscriptionKey,
  setLocations,
  destination,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  const UserLocationPin = `
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50Z"
        fill="#3478F5"
        fill-opacity="0.2"
      />
      <path
        d="M25 37C31.6274 37 37 31.6274 37 25C37 18.3726 31.6274 13 25 13C18.3726 13 13 18.3726 13 25C13 31.6274 18.3726 37 25 37Z"
        fill="white"
      />
      <path
        d="M25 35C30.5228 35 35 30.5228 35 25C35 19.4772 30.5228 15 25 15C19.4772 15 15 19.4772 15 25C15 30.5228 19.4772 35 25 35Z"
        fill="#3478F5"
      />
    </svg>`;

  const labContext = useContext(LabContext);
  if (!labContext) {
    console.error("Lab context is not provided");
    return <div>Error: Lab context is not provided.</div>;
  }

  const { getLabs } = labContext;

  const loadMap = useCallback(
    (center: [number, number]) => {
      if (!mapRef.current) return null;

      const map = new atlas.Map(mapRef.current, {
        center: center,
        zoom: 10,
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey: subscriptionKey,
        },
        tileset:
          "https://atlas.microsoft.com/map/tileset?api-version=2.1&language=NGT&tilesetId=microsoft.traffic.relative",
        mode: "no-cors",
        view: "Auto",
      });

      map.events.add("ready", () => {
        if (center[0] !== 0 && center[1] !== 0) {
          map.markers.add(
            new atlas.HtmlMarker({
              position: center,
              htmlContent: UserLocationPin,
            })
          );
        }
      });

      return map;
    },
    [subscriptionKey, UserLocationPin]
  );

  const loadLabs = useCallback(
    async (map: atlas.Map, center: [number, number]) => {
      const labs: Lab[] = await getLabs();

      if (setLocations) setLocations(labs);
      const bounds = [[center[0], center[1]]];
      const labDataSource = new atlas.source.DataSource();

      map.events.add("ready", () => {
        map.sources.add(labDataSource);

        labs.forEach((lab: Lab) => {
          const point = new atlas.data.Point([
            lab.position?.longitude!,
            lab.position?.latitude!,
          ]);
          const feature = new atlas.data.Feature(point, {
            name: lab.name,
          });
          labDataSource.add(feature);
          bounds.push([lab.position?.longitude!, lab.position?.latitude!]);
        });

        const symbolLayer = new atlas.layer.SymbolLayer(
          labDataSource,
          undefined,
          {
            iconOptions: {
              image: "pin-red",
              anchor: "center",
              allowOverlap: true,
              offset: [0, -10],
            },
            textOptions: {
              textField: ["get", "name"],
              offset: [0, 1.2],
            },
          }
        );

        map.layers.add(symbolLayer);

        if (bounds.length > 0) {
          map.setCamera({
            bounds: atlas.data.BoundingBox.fromPositions(bounds),
            padding: 50,
          });
        }
      });
    },
    [getLabs, setLocations]
  );

  const getDirections = useCallback(
    (map: atlas.Map, position: { longitude: number; latitude: number }) => {
      if (!userLocation || !destination) return;
      console.log("Getting directions");

      map.events.add("ready", () => {
        const lineDatasource = new atlas.source.DataSource();
        map.sources.add(lineDatasource);

        map.layers.add(
          new atlas.layer.LineLayer(lineDatasource, undefined, {
            strokeColor: ["get", "strokeColor"],
            strokeWidth: ["get", "strokeWidth"],
            lineJoin: "round",
            lineCap: "round",
          }),
          "labels"
        );

        const query = `${userLocation[1]},${userLocation[0]}:${destination.latitude},${destination.longitude}`;
        const truckRouteUrl = `https://atlas.microsoft.com/route/directions/json?api-version=1.0&travelMode=truck&vehicleWidth=2&vehicleHeight=2&vehicleLength=5&vehicleLoadType=USHazmatClass2&query=${query}`;

        fetch(truckRouteUrl, {
          headers: {
            "Subscription-Key": subscriptionKey,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            const route = response.routes[0];
            const routeCoordinates = route.legs.flatMap((leg: any) =>
              leg.points.map((point: any) => [point.longitude, point.latitude])
            );

            lineDatasource.add(
              new atlas.data.Feature(
                new atlas.data.LineString(routeCoordinates),
                {
                  strokeColor: "#2272B9",
                  strokeWidth: 9,
                }
              ),
              0
            );
          });
      });
    },
    [userLocation, destination, subscriptionKey]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    let map: atlas.Map | null = null;

    const initializeMap = (position: [number, number]) => {
      map = loadMap(position);
      if (map) {
        loadLabs(map, position);
      }
      if (map && destination) {
        getDirections(map, destination);
      }
    };

    if (!userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPos: [number, number] = [longitude, latitude];
          setUserLocation(userPos);
          initializeMap(userPos);
        },
        (error) => {
          console.error("Error getting user location:", error);
          initializeMap([0, 0]);
        }
      );
    } else {
      initializeMap(userLocation);
    }

    return () => {
      if (map) {
        map.dispose();
      }
    };
  }, [loadMap, loadLabs, getDirections, userLocation, destination]);

  return <div ref={mapRef} className="h-full w-full"></div>;
};

export default AzureMap;
