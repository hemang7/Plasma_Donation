import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebase } from "../firebase";
import "../index.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ContactForm = (props) => {
  const [user, loading, error] = useAuthState(auth);

  const [values, setValues] = useState({
    fullName: "",
    age: "",
    bloodgrp: "",
    mobile: "",
    address: "",
    addedBy: user ? user.email : ""
  });

  useEffect(() => {
    if (props.currentId === "")
      setValues({
        fullName: "",
        age: "",
        bloodgrp: "",
        mobile: "",
        address: "",
        addedBy: user ? user.email : ""
      });
    else
      setValues({
        ...props.contactObjects[props.currentId]
      });
  }, [props.currentId, props.contactObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      console.log("Login please!");
      return;
    }

    if (
      values.fullName === "" ||
      values.address === "" ||
      values.age === "" ||
      values.bloodgrp === "" ||
      values.mobile === ""
    )
      return alert("Please fill in all the fields.");
    if (user.email) {
      console.log("inside form", user);

      setValues({ ...values, addedBy: user.email });
      console.log(values);
      props.addOrEdit({ ...values, addedBy: user.email });
    }
  };

  const signInWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          className="form-control"
          placeholder="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-font"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Age"
            type="number"
            name="age"
            value={values.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-tint"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Blood Group"
            name="bloodgrp"
            value={values.bloodgrp}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-mobile-alt"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Mobile no."
            type="number"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <p class="para2">Note : If women are uncomfortable sharing their mobile numbers then it is advised to please list a male relative's number.</p>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Address"
          name="address"
          value={values.address}
          onChange={handleInputChange}
        />
      </div>
      {user ? (
        <button
          disabled={!user}
          type="submit"
          className="btn btn-primary btn-block"
        >
          {props.currentId === "" ? "Save" : "Update"}
        </button>
      ) : (
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled">Please Sign In First.</Tooltip>
          }
        >
          <button
            disabled={!user}
            type="submit"
            className="btn btn-primary btn-block"
          >
            {props.currentId === "" ? "Save" : "Update"}
          </button>
        </OverlayTrigger>
      )}

      {user ? (
        <button
          type="button"
          onClick={() => auth.signOut()}
          className="btn btn-primary btn-block"
        >
          Sign Out
        </button>
      ) : (
        <button
          type="button"
          onClick={signInWithGoogle}
          className="btn btn-primary btn-block"
        >
          {loading ? "Signing you in..." : "Sign In with Google"}
        </button>
      )}
    </form>
  );
};

export default ContactForm;
