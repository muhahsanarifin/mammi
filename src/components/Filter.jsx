import React from "react";
import styles from "../styles/Filter.module.css";

const Filter = ({ onCategory }) => {
  const filters = [
    {
      id: 1,
      name: "Favorite Product",
      nilai: "Favorite",
      styles: "favor-products",
    },
    {
      id: 2,
      name: "Coffee",
      nilai: "Coffee",
      styles: "coffee-products",
    },
    {
      id: 3,
      name: "Non Coffee",
      nilai: "Non Coffee",
      styles: "non-coffee-products",
    },
    {
      id: 4,
      name: "Foods",
      nilai: "Food",
      styles: "non-coffee-products",
    },
    // {
    //   name: "Add-on",
    //   value: "add-on",
    // },
  ];

  // console.log(onCategory);

  const handleCategory = (e) => {
    // console.log(e.target.value);
    onCategory(e.target.value);
  };

  return (
    <>
      <span className={styles["main__products__header"]}>
        {filters.map((filter, idx) => (
          <button
            key={idx}
            className={`${styles[filter.styles]}`}
            onClick={handleCategory}
            value={`${filter.nilai}`}
          >
            {filter.name}
          </button>
        ))}
      </span>
    </>
  );
};

export default Filter;
