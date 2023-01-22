import React from "react";
import { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import styles from "../styles/Sorter.module.css";

const Sorter = ({ onPrice, onPost }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [initSort, setintSort] = useState("");
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // console.log(onPost);

  const sorts = [
    {
      name: "Price",
      values: ["expensive", "low"],
    },
    {
      name: "Post",
      values: ["latest", "oldest"],
    },
  ];

  const handlePrice = (e) => {
    setintSort(e.target.value);
    onPrice(e.target.value);

    // console.log(e.target.value);
  };

  const handlePost = (e) => {
    setintSort(e.target.value);
    onPost(e.target.value);
  };

  return (
    <>
      <span className={styles.sorting}>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret className={styles["dropdown-products"]}>
            <p>{!initSort ? "Sorts" : initSort}</p>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem className={styles["dropdown-item-products"]} header>
              {sorts[0].name}
            </DropdownItem>
            {sorts[0].values.map((e, idx) => (
              <DropdownItem
              key={idx}
                className={styles["dropdown-item-products"]}
                onClick={handlePrice}
                value={e}
              >
                {e}
              </DropdownItem>
            ))}
            <DropdownItem className={styles["dropdown-item-products"]} header>
              {sorts[1].name}
            </DropdownItem>
            {sorts[1].values.map((e, idx) => (
              <DropdownItem
              key={idx}
                className={styles["dropdown-item-products"]}
                onClick={handlePost}
                value={e}
              >
                {e}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </span>
    </>
  );
};

export default Sorter;
