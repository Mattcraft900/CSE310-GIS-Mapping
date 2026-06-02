const [esriConfig, Map, MapView, Graphic, GraphicsLayer] =
    await $arcgis.import([
        "@arcgis/core/config.js",
        "@arcgis/core/Map.js",
        "@arcgis/core/views/MapView.js",
        "@arcgis/core/Graphic.js",
        "@arcgis/core/layers/GraphicsLayer.js",
    ]);

esriConfig.apiKey = "AAPTaDyQWmtzlR6cG6o8OZObS7w..KBqbdhb1irZYqrpXFuXmGmDcwNWYvPnhuukMMY29OJCvjREkTNe04EuSFWkvxQmgdD006BXpCD7tZ66CyOutZ3tUWc9FiG4Ds2KIvnDJZawsQx_bYFRwJ9WeKTIdOKwLGq5PdaobtWRIv4i0oXoLXnVXZ0Vcwuiz70rbZXyaWVbk3HDsOpzBongTU-kkGiCqruRi8olEvpJL8fbozAYGa6BAmjteqrJWylIcA42w4g8Mja6jdGqaMamNzuw85ok.AT1_GrVi93q8";
const map = new Map({
    basemap: "arcgis/community",
});

const view = new MapView({
    container: "map-div",
    map: map,
    center: [-111.78311813556628, 43.81768993455273],
    zoom: 15,
    constraints: {
        snapToZoom: false,
    },
});

const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);

const point = {
    type: "point",
    longitude: -111.78311813556628,
    latitude: 43.81768993455273,
};

const simpleMarkerSymbol = {
    type: "simple-marker",
    color: [0, 0, 0],
    outline: {
        color: [255, 255, 255],
        width: 1,
    },
};

const attributes = {
    name: "Point",
    description: "I am a point",
};

const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol,
    attributes: attributes,
    popupTemplate: {
        title: attributes.name,
        content: attributes.description,
    },
});

graphicsLayer.add(pointGraphic);