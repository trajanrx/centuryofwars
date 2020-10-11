import { useState } from "react";
import { useRecoilState } from "recoil";
import { recordSelector } from "../../store";

const Img = ({ src }) => <img src={src} style={{ height: "80px" }} className="pb-5" />;

const Dialog = () => {
  const open = useState(false);
  const [record, setRecord] = useRecoilState(recordSelector);

  const getClipart = (army) => {
    const arm = army?.split(" ")[0];

    const clip = {
      US: "usa.jpeg",
      GER: "ger.png",
      BR: "brit.png"
    };

    return clip[arm];
  };

  const getAction = record => {

    /*     frontat : Direct strategy. Indicator variable, coded as 1 if the attacker executed a frontal attack, and 0
    otherwise. Source: (Dupuy, 1984; Army, 1986).
    envelop : Indirect strategy. Indicator variable, coded as 1 if the attacker executed an envelopment, double
    envelopment or flanking maneuver, and 0 otherwise. Source: Dupuy (1984); Army (1986).
    defoff : Defender counterattack. Indicator variable, coded as 1 if the defender executed a counterattack,
    and 0 otherwise. Source: Dupuy (1984); Army (1986).
    surprise : Level of surprise. Ordinal variable, coded 3 if “complete” surprise was achieved by the attacker,
    2 if “substantial” surprise was achieved by the attacker, 1 if “minor” surprise was achieved by the
    attacker, 0 if “no surprise” was achieved by either side, -1 if “minor” surprise was achieved by the
    defender, -2 if “substantial” surprise was achieved by the defender, and -3 if “complete” surprise was
    achieved by the defender. Source: Dupuy (1984); Army (1986).
    fort : Fortified defenses. Indicator variable, coded 1 if the defender employed planned entrenchments, field
    fortifications, or other obstacles, and 0 otherwise. Source: Dupuy (1984); Army (1986). */
  }

  return (
    <div
      className={`text-xs bg-white p-5 box-border rounded-md absolute shadow-xl ${open ? "block" : "hidden"}`}
      style={{ width: "400px", zIndex: 99999, left: record?.position?.x, top: record?.position?.y }}
    >
      <p className="pb-1"> {record?.data?.war} </p>
      <p className="font-bold text-sm pb-1">
        {record?.data?.engagem} - {record?.data?.campn}
      </p>
      <p className="pb-5">
        {record?.data?.year} ({record?.data?.duration} days)
      </p>
      <div className="w-full flex">
        <div className="w-1/2">
          <Img src={getClipart(record?.data?.atkr)} />
          <p className="pb-1">{record?.data?.atkr}</p>
          <p>{record?.data?.atk_cmdr}</p>
          <p>
            <span>Infantry: </span>
            {record?.data?.amilpert}
          </p>
          <p>
            <span>Armor: </span>
            {record?.data?.a_tks_mb}
          </p>
          <p>
            <span>Air: </span>
            {record?.data?.a_sortie}
          </p>
          <p>
            <span>Artillery: </span>
            {record?.data?.a_arty}
          </p>
          <p>
            <span>Total losses: </span>
            {record?.data?.acas_per}
          </p>
        </div>
        <div className="w-1/2">
          <Img src={getClipart(record?.data?.defr)} />
          <p>{record?.data?.defr}</p>
          <p>{record?.data?.def_cmdr}</p>
          <p>
            <span>Infantry: </span>
            {record?.data?.dmilpert}
          </p>
          <p>
            <span>Armor: </span>
            {record?.data?.d_tks_mb}
          </p>
          <p>
            <span>Air: </span>
            {record?.data?.d_sortie}
          </p>
          <p>
            <span>Artillery: </span>
            {record?.data?.d_arty}
          </p>
          <p>
            <span>Total losses: </span>
            {record?.data?.dcas_per}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
