import resources from "./resources";
import axios from "axios";
import React from "react";
import { variables } from "../variables";
import { useState } from "react";
const Departments = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  ////////////////////////////////////////// This function add new department to the departments list
  const addDepartmentData = async () => {
    //add check if the department is already exists (by name)
    let dep = {
      DepartmentName: departmentName,
      Description: description,
    };
    try {
      console.log(dep);
      await axios
        .post(variables.BASE_URL + variables.PostDep, dep)
        .then((res) => {
          console.log(res.data);
          alert(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>{resources.department}</h1>
      <input
        placeholder={resources.placeholderName}
        onChange={(e) => {
          setDepartmentName(e.target.value);
        }}
      ></input>
      <input
        placeholder={resources.placeholderDescription}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          addDepartmentData();
        }}
      >
        {resources.onClickAddToDb}
      </button>
    </div>
  );
};
export default Departments;
