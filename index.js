const Map = ol.Map;
const View = ol.View;
const ImageLayer = ol.layer.Image;
const TileLayer = ol.layer.Tile;
const ImageWMS = ol.source.ImageWMS;
const OSM = ol.source.OSM;
const WMSCapabilities = ol.format.WMSCapabilities;


let layers = [
    new TileLayer({
      source: new OSM()
    }),
    new ImageLayer({
      extent: [17.79569523402574, 48.71936026587261, 17.957725778672316, 48.79917418319719],
      source: new ImageWMS({
        url: 'http://localhost:8080/geoserver/ows',
      params: {LAYERS: ['WMS_Kocovce:Budovy','WMS_Kocovce:Cesta','WMS_Kocovce:Elektricke_vedenie','WMS_Kocovce:Ovocny_sad','WMS_Kocovce:Stlp_el.vedena','WMS_Kocovce:Veza','WMS_Kocovce:Vodny_tok','WMS_Kocovce:Zeleznica','WMS_Kocovce:obchody','WMS_Kocovce:stanica']},
        ratio: 1,
        serverType: 'geoserver'
      })
    })
  ];
  let map = new Map({
    layers: layers,
    target: 'map',
    view: new View({
      center: [17.889477, 48.749152],
      zoom: 13,
      projection: 'EPSG:4326'
    })
  });

  function getcapabilities(){
  fetch('http://localhost:8080/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities',{mode: 'cors'}).then(function(response) {
    return response.text();
  }).then(function(data) {
    let parser = new DOMParser();
    XMLDocument = parser.parseFromString(data, 'text/xml');
    document.getElementById('Capabilities_xml').textContent=data;
  })};