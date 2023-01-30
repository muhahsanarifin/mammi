import React from "react";
const statuses = ["Delivered", "Pending"];



const StatusList = ({onFilter}) => {
  const statusList = {
    // border: "1px solid darkblue",
    height: "2rem",
    fontSize: "14px",
    cursor: "pointer",
    // textShadow: "0px 4px 4px rgba(0, 0, 0, 0.8)",
    color: "#ffffff",
  };
  

  const optionList = {
    color: "#181818",
  };

  const handleSatatus = (e) => {
    // onFilter(e.target.value);
    const delayDebounce = setTimeout(() => {
      onFilter(e.target.value);
    }, 500);
    return () => clearTimeout(delayDebounce);
  };
  return (
    <select name="" id="" style={statusList} onChange={handleSatatus}>
      <option style={{display:"none"}}>Status</option>
      {statuses.map((status) => (
        <option value={status} style={optionList}>{status}</option>
      ))}
    </select>
  );
};

export default StatusList;
