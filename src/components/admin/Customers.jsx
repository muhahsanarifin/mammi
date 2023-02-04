import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import usersAction from "../../redux/actions/users";

const CustomersList = ({ onCustomers }) => {
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState("");
  const [customers, setCustomers] = useState([]);
  const accessToken = localStorage.getItem("access-token");
  const distpatch = useDispatch();

  const costomerSelect = {
    // border: "1px solid darkblue",
    height: "2rem",
    fontSize: "14px",
    cursor: "pointer",
    // textShadow: "0px 4px 4px rgba(0, 0, 0, 0.8)",
    color: "#ffffff",
  };

  const customerList = {
    color: "#181818",
  };

  // Get Customer
  const resFullfilled = (data) => {
    // console.log("Data all customers: ",data);
    setCustomers(data);
  };

  useEffect(() => {
    distpatch(
      usersAction.getUsersThunk(
        accessToken,
        `page=${page}&limit=${limit}`,
        resFullfilled
      )
    );
  }, [distpatch, accessToken, page, limit]);

  const handleCustomer = (e) => {
    const delayDebounce = setTimeout(() => {
      onCustomers(e.target.value);
    }, 500);
    return () => clearTimeout(delayDebounce);
  };
  return (
    <>
      <select name="" id="" style={costomerSelect} onChange={handleCustomer}>
        <option style={{ display: "none" }}>Customer</option>
        {customers.map((customer, idx) => (
          <option value={customer.id} style={customerList} key={idx}>
            {customer.id}
          </option>
        ))}
      </select>
    </>
  );
};

export default CustomersList;
