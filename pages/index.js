import React, { useEffect } from "react";
import { useQuery } from "react-query";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import {
  recordsSelector,
  activeRecordsSelector,
  rangeSelector
} from "../store";
import Dialog from "../components/dialog";
import Slider from "../components/slider";

const Map = dynamic(() => import("../components/map"), {
  ssr: false
});

const App = ({ battles }) => {
  const [records, setRecords] = useRecoilState(recordsSelector);

  useEffect(() => {
    setRecords(battles);
  }, []);

  return (
    <div>
      <Map />
      <Dialog />
      <Slider />
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("http://localhost:3000/battles.json");
  const battles = await response.json();

  return {
    props: {
      battles: battles
        .filter((record) => record.lat !== "NA")
        .map((battle) => {
          return {
            ...battle,
            year: parseInt(battle.date.toString().split(".")[0])
          };
        })
        .reduce((a, c) => {
          return {
            ...a,
            [c.iseq]: c
          };
        }, {})
      /*         .reduce((a, c) => {
          return {
            ...a,
            [c.campn]: a[c.campn] ? [...a[c.campn], c] : [c]
          };
        }, {}) */
    }
  };
}

export default App;
