import { Range } from "rc-slider";
import { useRecoilState } from "recoil";
import {
  activeRecordsSelector,
  recordsSelector,
  rangeSelector
} from "../../store";
import "rc-slider/assets/index.css";

const marks = () => {
  const marks = [];

  for (let index = 1914; index <= 1945; index++) {
    marks.push(index);
  }

  return marks.reduce((a, c) => {
    return {
      ...a,
      [c]: c
    };
  }, {});
};

const SliderCmp = () => {
  const [activeRecords, setActiveRecords] = useRecoilState(
    activeRecordsSelector
  );
  const [records, setRecords] = useRecoilState(recordsSelector);
  const [range, setRange] = useRecoilState(rangeSelector);

  const onChange = (e) => {
    setRange(e);
    setActiveRecords(
      Object.keys(records)
        .filter(
          (record) =>
            records[record].year >= e[0] && records[record].year <= e[1]
        )
        .map((record) => records[record].iseq)
    );
  };

  return (
    <div
      className="w-full absolute flex justify-center"
      style={{ zIndex: 99999, bottom: 30 }}
    >
      <div
        className="p-10 box-border w-8/12 bg-white rounded shadow-xl"
        style={{ minHeight: "80px" }}
      >
        <Range
          min={1914}
          max={1945}
          defaultValue={range}
          onAfterChange={onChange}
          marks={marks()}
        />
      </div>
    </div>
  );
};

export default SliderCmp;
