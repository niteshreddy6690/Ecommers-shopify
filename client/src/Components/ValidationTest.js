import React from "react";
import { useForm } from "react-hook-form";

function ValidationTest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First name</label>
      <input name="fname" {...register({ required: "Name is requited" })} />
      {errors.fname && (
        <p styes={{ color: "red" }}>Please enter number for age.</p>
      )}
      <label>Last name</label>
      <input {...register("lastName", { required: true })} />
      {errors.lastName && (
        <p styes={{ color: "red" }}>Last name is required.</p>
      )}
      <label>Age</label>
      <input name="age" {...register("age", { pattern: /\d+/ })} />
      {errors.age && (
        <p styes={{ color: "red" }}>Please enter number for age.</p>
      )}
      <input type="submit" />
    </form>
  );
}

export default ValidationTest;
