import { atom, selector } from "recoil";

export const records = atom({
  key: "records",
  default: []
});

export const recordsSelector = selector({
  key: "recordsSelector",
  get: ({ get }: { get: Function }) => get(records),
  set: ({ set }: { set: Function }, newValue: []) => set(records, newValue)
});

export const activeRecords = atom({
  key: "activeRecords",
  default: []
});

export const activeRecordsSelector = selector({
  key: "activeRecordsSelector",
  get: ({ get }: { get: Function }) => get(activeRecords),
  set: ({ set }: { set: Function }, newValue: []) => set(activeRecords, newValue)
});

export const record = atom({
  key: "record",
  default: {}
});

export const recordSelector = selector({
  key: "recordSelector",
  get: ({ get }: { get: Function }) => get(record),
  set: ({ set }: { set: Function }, newValue: []) => set(record, newValue)
});

export const range = atom({
  key: "range",
  default: [1914, 1945]
});

export const rangeSelector = selector({
  key: "rangeSelector",
  get: ({ get }: { get: Function }) => get(range),
  set: ({ set }: { set: Function }, newValue: []) => set(range, newValue)
});
