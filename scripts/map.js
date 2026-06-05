import { landmarkList, buildingList } from "./marker-list.js";

const [esriConfig, Map, MapView, Graphic, GraphicsLayer] =
    await $arcgis.import([
        "@arcgis/core/config.js",
        "@arcgis/core/Map.js",
        "@arcgis/core/views/MapView.js",
        "@arcgis/core/Graphic.js",
        "@arcgis/core/layers/GraphicsLayer.js",
    ])
;

// Set the API key
// Hard-coded because I'm not really concerned about security for the scope of this project (plus it's only authorized to be used by localhost and my GitHub page)
esriConfig.apiKey = "AAPTaDyQWmtzlR6cG6o8OZObS7w..KBqbdhb1irZYqrpXFuXmGmDcwNWYvPnhuukMMY29OJCvjREkTNe04EuSFWkvxQmgdD006BXpCD7tZ66CyOutZ3tUWc9FiG4Ds2KIvnDJZawsQx_bYFRwJ9WeKTIdOKwLGq5PdaobtWRIv4i0oXoLXnVXZ0Vcwuiz70rbZXyaWVbk3HDsOpzBongTU-kkGiCqruRi8olEvpJL8fbozAYGa6BAmjteqrJWylIcA42w4g8Mja6jdGqaMamNzuw85ok.AT1_GrVi93q8";
// Initialize the map baselayer
const map = new Map({
    basemap: "arcgis/community",
});

// Setting the map's configurations and attach it to a DOM element (map-div)
const view = new MapView({
    container: "map-div",
    map: map,
    center: [-111.78311813556628, 43.81768993455273],
    zoom: 15,
    constraints: {
        snapToZoom: false,
    },
});

// Create/add the graphicslayer that will contain all the map pins
const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);

// Create the symbol for the landmarks
const landmarkSymbol = {
    type: "simple-marker",
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
    color: [0, 115, 184],
    size: "32px",
    yoffset: "16px", // <- Make sure this is just half of the size
};
// Create the symbol for the buildings
const buildingSymbol = {
    type: "simple-marker",
    style: "square",
    color: [0, 82, 110],
    size: "12px",
};

// Generate all the landmark pins from the imported list
landmarkList.forEach(landmark => {
    const landmarkGraphic = new Graphic({
        geometry: {
            type: "point",
            longitude: landmark.longitude,
            latitude: landmark.latitude,
        },
        symbol: landmarkSymbol,
        attributes: {
            name: landmark.name,
            description: landmark.description,
        },
        popupTemplate: {
            title: landmark.name,
            content: landmark.description,
        },
    });

    graphicsLayer.add(landmarkGraphic);
});

// Generate all the building pins from the imported list
buildingList.forEach(building => {
    const buildingGraphic = new Graphic({
        geometry: {
            type: "point",
            longitude: building.longitude,
            latitude: building.latitude,
        },
        symbol: buildingSymbol,
        attributes: {
            name: building.name,
            description: building.description,
        },
        popupTemplate: {
            title: building.name,
            content: building.description,
        },
    });

    graphicsLayer.add(buildingGraphic);
});
