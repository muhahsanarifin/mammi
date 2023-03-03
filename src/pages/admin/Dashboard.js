import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TransactionsAction from "../../redux/actions/transactions";

import Header from "../../components/admin/Header";
import Footer from "../../components/Footer";
import TitleBar from "../../components/TitleBar";
import styles from "../../styles/admin/Dashboard.module.css";
import BarChart from "../../components/admin/BarCharts";
import DoughnutChart from "../../components/admin/DoughnutChart";

const Dashboard = () => {
  const accessToken = localStorage.getItem("access-token");
  const dispatch = useDispatch();
  const [dataDashboard, setDataDashboard] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState("Pending");
  // const [pending, setPending] = useState([]);
  // const [delivered, setDelivered] = useState([]);

  useEffect(() => {
    dispatch(
      TransactionsAction.getDataDashboardThunk(
        accessToken,
        resFulfilledGetDataDashboard
      )
    );

    dispatch(
      TransactionsAction.getTransactionsThunk(
        accessToken,
        `status=${status}`,
        resFulfilledGetTransactions
      )
    );
  }, [dispatch, accessToken, status]);

  // Get data dashboard
  const resFulfilledGetDataDashboard = (data) => {
    setDataDashboard(data);
  };

  // Get Transactions
  const resFulfilledGetTransactions = (data) => {
    //  console.log("Transactions data: ", data);
    setTransactions(data);
  };

  const sum = (data) => {
    // First way
    const initValue = 0;
    const price = data
      .map((el) => parseFloat(el.subtotal))
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initValue
      );
    return `Income total: IDR ${price}`;

    // || Second way
    // let sumPrice = 0;
    // const price = data.map((el) => parseFloat(el.subtotal));
    // console.log(price.length);
    // for (let idx = 0; idx < price.length; idx++) {
    //   sumPrice += price[idx];
    // }
    // return sumPrice;
  };

  return (
    <>
      <TitleBar title={"MAMMI | Dashboard"} />
      <Header />
      <main className={styles["main-section"]}>
        <section className={styles["title-section"]}>
          <h3 className={styles["title"]}>Daily Report MAMMI</h3>
        </section>
        <section className={styles["components-section"]}>
          <div className={styles["left-side-fiturs"]}>
            <h3 className={styles["chart-title"]}>History Income</h3>
            <div className={styles["chart-table"]}>
              <BarChart
                incomeValue={dataDashboard.map((e) => parseFloat(e.subtotal))}
                time={dataDashboard.map((e) => e.updated_at.split(" ")[1])}
              />
            </div>
            <div className={styles["chart-conculation"]}>
              {<p>{sum(dataDashboard)}</p>}
            </div>
          </div>
          <div className={styles["rigth-side-fiturs"]}>
            <h3 className={styles["others-component"]}>Transactions</h3>
            <span className={styles["others-chart"]}>
              <DoughnutChart
                data={transactions.map((transaction) => transaction.user_id)}
                status={status}
              />
            </span>
            <select
              name=""
              id=""
              onChange={(e) => setStatus(e.target.value)}
              className={styles["others-chart-select"]}
            >
              <option value={"Pending"}>Pending</option>
              <option value={"Delivered"}>Delivered</option>
            </select>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
