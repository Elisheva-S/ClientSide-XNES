import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { variables } from "../variables";
import resources from "./resources";
export default function EditDep() {
  const { state } = useLocation();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  ////////////////////////////////////////// This function set specific department by id
  const setDepartmentData = async () => {
    let dep = {
      DepartmentId: Number(state),
      DepartmentName: name,
      Description: desc,
    };
    try {
      await axios
        .put(variables.BASE_URL + variables.EditDep, dep)
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>{resources.EditDepartment}</h1>
      <input
        placeholder={resources.placeholderName}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <input
        placeholder={resources.placeholderDesc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          setDepartmentData();
        }}
      >
        {resources.onClickSend}
      </button>
    </div>
  );
}
