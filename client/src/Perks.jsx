import React from "react";
import { FaCarSide } from "react-icons/fa6";
import { GiGate } from "react-icons/gi";
import { IoWifi } from "react-icons/io5";
import { PiDog, PiTelevisionSimple } from "react-icons/pi";

function Perks({selected, onChange}) {


  function handleCbClick(ev){
    const {checked, name} = ev.target;
    if (checked){
      onChange([...selected, name])
    } else {
      onChange(
        [...selected.filter(selectedName => selectedName !== name)]
      )
    }
  }

  return (
    <>
      <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input name="wifi" type="checkbox"  onChange={handleCbClick} />
          <IoWifi />
          <span>Wifi</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input name="parking" type="checkbox" onChange={handleCbClick} />
          <FaCarSide />
          <span>Free parking spot</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input name="tv" type="checkbox" onChange={handleCbClick} />
          <PiTelevisionSimple />
          <span>TV</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input name="pets" type="checkbox" onChange={handleCbClick} />
          <PiDog />
          <span>Pets</span>
        </label>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input name="entrance" type="checkbox" onChange={handleCbClick} />
          <GiGate />
          <span>Private entrance</span>
        </label>
      </div>
    </>
  );
}

export default Perks;
