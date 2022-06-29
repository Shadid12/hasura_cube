import { useState } from "react";
import ClockLoader from "react-spinners/ClockLoader";
import ReactJson from 'react-json-view'
import BarChart from "./components/BarChart";
import './App.css';

const HASURA_API_KEY = "kh3cmCCU3rjOQbY1e00y5BcdxuehAhubPprvl8Qb2C01V2KJvG7597uDOE9DJ4jH"; 


function App() {
  const [loading, setLoading] = useState(false);
  const [loadingCube, setLoadingCube] = useState(false);
  const [dbdata, setDbdata] = useState([]);
  const [datacube, setDataCube] = useState([]);

  const getDBdata = async () => {
    getTableData();
    getDataWithCube();
  }

  const getDataWithCube = () => {
    setLoadingCube(true);
    fetch("https://informed-monkfish-25.hasura.app/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": HASURA_API_KEY,
      },
      body: JSON.stringify({
        query: `
        query CubeQuery {
          cube(limit: 5000, where: { fraud: { amount: { gte: 5000 } } }) {
            fraud(orderBy: { amount: asc }) {
              isfraud
              isflaggedfraud
              type
              amount
            }
          }
        }
      `
      }),
    })
      .then(response => response.text())
      .then(result => {
        console.log('====>>>>', JSON.parse(result));
        setDataCube(JSON.parse(result));
        setLoadingCube(false);
      })
      .catch(error => console.log('error', error));
  }

  const getTableData = () => {
    setLoading(true);
    fetch("https://informed-monkfish-25.hasura.app/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": HASURA_API_KEY,
      },
      body: JSON.stringify({
        query: `
        query MyQuery {
          fraud(where: {amount: {_gte: "5000"}}, limit: 5000, order_by: {amount: asc}) {
            isFraud
            isFlaggedFraud
            type
            amount
          }
        }
      `
      }),
    })
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result));
        setDbdata(JSON.parse(result));
        // Set some 
        setLoading(false);
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <button onClick={getDBdata}>Query Data</button>
      <div className="main-container">

        <div className="hasura-cube-container">
          <h2>Hasura + Cube</h2>
          {
            loadingCube ? 
            <ClockLoader /> : 
            <>
              <BarChart cubeData={datacube} />
              <ReactJson src={datacube} />
            </>
          }
        </div>

        <div className="hasura-only-container">
          <h2>Hasura Only</h2>
          {
            loading ? 
            <ClockLoader /> : 
            <>
              <BarChart rawData={dbdata} />
              <ReactJson src={dbdata} />
            </>
          }
        </div>

      </div>
    </div>
  );
}

export default App;
