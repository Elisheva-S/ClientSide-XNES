import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import resources from "./resources";
import { variables } from "../variables";
export default function Products() {
  const [depList, setDepList] = useState([]);
  const [departmentId, setDepartmentId] = useState();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [unitsInStock, setUnitsInStock] = useState(0);
  ////////////////////////////////////////// This Function init the list of departments for the select
  const fillList = async () => {
    try {
      await axios.get(variables.BASE_URL + variables.GetDep).then((res) => {
        setDepList(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  ////////////////////////////////////////// This function add new product to the Products list
  const addProductData = async () => {
    //add check if the product is already exists (by name)
    let pro = {
      DepartmentId: departmentId,
      ProductName: productName,
      Price: price,
      InStock: unitsInStock,
    };
    try {
      console.log(pro);
      await axios
        .post(variables.BASE_URL + variables.PostPro, pro)
        .then((res) => {
          console.log(res.data);
          alert(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  ////////////////////////////////////////// This function load the departments list for the select
  useEffect(() => {
    return () => {
      fillList();
    };
  }, [depList]);
  return (
    <div>
      <h1>{resources.product}</h1>
      <select
        onChange={(e) => {
          console.log(e.target.selectedOptions[0].value);
          setDepartmentId(e.target.selectedOptions[0].value);
        }}
      >
        {depList.map((o) => {
          return (
            <option key={o.DepartmentId} value={o.DepartmentId}>
              {o.DepartmentName}
            </option>
          );
        })}
      </select>
      <input
        placeholder={resources.placeholderName}
        onChange={(e) => {
          setProductName(e.target.value);
        }}
      ></input>
      <input
        placeholder={resources.placeholderPrice}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      <input
        placeholder={resources.placeholderStock}
        onChange={(e) => {
          setUnitsInStock(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          addProductData();
        }}
      >
        {resources.onClickAddToDb}
      </button>
    </div>
  );
}
