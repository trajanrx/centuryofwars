import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import { useRecoilState } from "recoil";
import {
  activeRecordsSelector,
  recordSelector,
  recordsSelector,
  rangeSelector
} from "../../store";

const Map = () => {
  const [activeRecords, setActiveRecords] = useRecoilState(
    activeRecordsSelector
  );
  const [record, setRecord] = useRecoilState(recordSelector);
  const [records, setRecords] = useRecoilState(recordsSelector);
  const [range, setRange] = useRecoilState(rangeSelector);
  const markers = useRef(null);

  const map = useRef(null);
  const icon = useRef(
    L.icon({
      iconUrl: "/marker-icon.png"
    })
  );

  const onClickMarker = useCallback((position, id) => {
    setRecord({ position, data: records[id] });
  }, []);

  const setMarker = (lat, lng, customID) =>
    L.marker([lat, lng], { icon: icon.current, customID })
      .addTo(markers.current)
      .on("click", (e) =>
        onClickMarker(
          { x: e.originalEvent.pageX, y: e.originalEvent.pageY },
          e.sourceTarget.options.customID
        )
      );

  const onRenderMarkers = (collection) => {
    collection.forEach((id) => {
      const { lat, long, iseq } = records[id];

      setMarker(lat, long, iseq);
    });
  };

  useEffect(() => {
    if (!map.current) {
      const position = [48.864716, 2.349014];

      map.current = L.map("map", {
        attributionControl: false,
        zoomControl: true,
        fadeAnimation: true,
        zoomAnimation: true
      }).setView(position, 7);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map.current
      );

      markers.current = L.layerGroup().addTo(map.current);
    }
  }, []);

  useEffect(() => {
    if (range.length) {
      markers.current.clearLayers();
    }

    onRenderMarkers(
      activeRecords.length ? activeRecords : Object.keys(records)
    );
  }, [range, activeRecords]);

  return (
    <div>
      <div id="map" className="w-full h-full"></div>
    </div>
  );
};

export default Map;
