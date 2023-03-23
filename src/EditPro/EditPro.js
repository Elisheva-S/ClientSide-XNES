import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { variables } from "../variables";
import resources from "./resources";
export default function EditPro() {
  const { state } = useLocation();
  const [depList, setDepList] = useState([]);
  const [departmentId, setDepartmentId] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [unitsInStock, setUnitsInStock] = useState("");
  ////////////////////////////////////////// This function set specific product by id
  const setProductData = async () => {
    let pro = {
      DepartmentId: departmentId,
      ProductId: Number(state),
      ProductName: name,
      Price: price,
      InStock: unitsInStock,
    };
    try {
      await axios
        .put(variables.BASE_URL + variables.EditPro, pro)
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
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
  ////////////////////////////////////////// This function load the departments list for the select
  useEffect(() => {
    return () => {
      fillList();
    };
  }, [depList]);

  return (
    <div>
      <h1>{resources.EditProduct}</h1>
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
          setName(e.target.value);
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
          setProductData();
        }}
      >
        {resources.onClickSend}
      </button>
    </div>
  );
}
