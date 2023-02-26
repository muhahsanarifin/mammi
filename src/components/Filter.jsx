import React from "react";
import styles from "../styles/Filter.module.css";

const Filter = ({ onCategory }) => {
  const filters = [
    {
      id: 1,
      name: "Favorite Product",
      value: "Favorite",
    },
    {
      id: 2,
      name: "Coffee",
      value: "Coffee",
    },
    {
      id: 3,
      name: "Non Coffee",
      value: "NonCoffee",
    },
    {
      id: 4,
      name: "Foods",
      value: "Food",
    },
    // {
    //   name: "Add-on",
    //   value: "add-on",
    // },
  ];

  const handleCategory = (e) => {
    onCategory(e.target.value);
  };

  return (
    <>
      <span className={styles["main__products__header"]}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={styles["btn-style"]}
            onClick={handleCategory}
            value={`${filter.value}`}
          >
            {filter.name}
          </button>
        ))}
      </span>
    </>
  );
};

export default Filter;
