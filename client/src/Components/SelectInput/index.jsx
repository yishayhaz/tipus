/*
  <Select
    placeholder="מסעדה"
    dropdownitems={[
      'option 1',
      'option 2',
      'option 3',
    ]}
    onChange={(newVal) => console.log(newVal)}
  />
*/

import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import Input from "../Input";

export default function Select(props) {
  const { dropdownitems, onChange, onSubmit, defaulttext } = props;

  const [items, setItems] = useState(dropdownitems);
  const [inputValue, setInputValue] = useState("");
  const [hideDropDown, setHideDropDown] = useState(true);
  const [selectedItem, setSelectedItem] = useState(0);
  const [inputStatus, setInputStatus] = useState("");

  useEffect(() => {
    setSelectedItem(0);
    if (!inputValue.length) {
      setHideDropDown(true);
      setInputStatus("");
    } else {
      if (dropdownitems.includes(inputValue)) {
        setHideDropDown(true);
        setInputStatus("success");
      } else {
        setItems(dropdownitems.filter((item) => item.includes(inputValue)));
        setHideDropDown(false);
        setInputStatus("");
      }
    }
    if (typeof onChange === "function") {
      onChange(inputValue);
    }
    if (dropdownitems.includes(inputValue) && typeof onSubmit === "function") {
      onSubmit(inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    if (!items.length) {
      setHideDropDown(false);
      setInputStatus("error");
    }
  }, [items]);

  const HandleKey = (e) => {
    const elem = e.target.nextSibling;
    if (hideDropDown) return;
    switch (e.code) {
      case "ArrowDown":
        if (selectedItem === items.length - 1) {
          setSelectedItem(0);
          elem.scrollTop = 0;
        } else {
          setSelectedItem(selectedItem + 1);
          if (selectedItem > 2) elem.scrollTop += 32.5;
        }
        break;
      case "ArrowUp":
        if (!selectedItem) {
          setSelectedItem(items.length - 1);
          elem.scrollTop = elem.scrollHeight;
        } else {
          setSelectedItem(selectedItem - 1);
          if (32.5 * selectedItem - 97.5 < elem.scrollTop)
            elem.scrollTop -= 32.5;
        }
        break;
      case "Enter":
        setInputValue(items[selectedItem]);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.Wrraper}>
      <Input
        {...props}
        type={"text"}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyDown={HandleKey}
        status={inputStatus}
      />
      <div className={styles.dropDown} hidden={hideDropDown}>
        {!items.length ? (
          defaulttext ? (
            <option onClick={() => setInputValue("")}>{defaulttext}</option>
          ) : null
        ) : (
          items.map((item, i) => (
            <option
              key={i}
              onClick={(e) => setInputValue(e.target.value)}
              className={i === selectedItem ? styles.selected : null}
            >
              {item}
            </option>
          ))
        )}
      </div>
    </div>
  );
}
