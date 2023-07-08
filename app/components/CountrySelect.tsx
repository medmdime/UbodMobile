import React, { useState } from "react";
import {  Text } from "react-native";
import { useCountries } from "../hooks";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";

interface CountrySelectProps {
  selected: string,
  setSelected: React.Dispatch<React.SetStateAction<string>>,
  Mode: "MODAL" | "FLATLIST" | "SCROLLVIEW"
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  selected,
  setSelected ,
  Mode = "MODAL"
}) => {
  const { getAll } = useCountries();
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState(
    getAll().map((item) => {
      const i: ItemType<string> = {
        label: item.label,
        value: item.label,
        icon: () => (<Text>{item.flag}</Text>)
      }
      return i
    })
  )

  return (
    <DropDownPicker
      open={open}
      value={selected}
      items={items}
      setOpen={setOpen}
      setValue={setSelected}
      setItems={setItems}
      autoScroll
      listMode={Mode}
    />
  )
}

export { CountrySelect };
