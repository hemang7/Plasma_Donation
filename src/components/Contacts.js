import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import "../index.css";

const Contacts = () => {
  const [user] = useAuthState(auth);
  var [currentId, setCurrentId] = useState("");
  var [contactObjects, setContactObjects] = useState({});

  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val()
        });
      else setContactObjects({});
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === "")
      firebaseDb.child("contacts").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    else
      firebaseDb.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.child(`contacts/${id}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-primary">
        <div className="container">
          <h1 className="display-4 text-white">Plasma Life - Jodhpur</h1>
          <p class="lead">Be the miracle some family is hoping for.</p>
        </div>
      </div>

      <div className="container-md">
      <p class="para">Note : If women are uncomfortable sharing their mobile numbers then it is advised to please list a male relative's number.</p>
        <div className="mb-5">
          <ContactForm {...{ currentId, contactObjects, addOrEdit }} />
        </div>
        <h1 className="mb-3">Available Plasma donors</h1>

        <div className="table-responsive availablePersons">
          <table className="table table-borderless table-stripped table-content">
            <thead className="thead-light">
              <tr>
                <th>Full Name</th>
                <th>Age</th>
                <th>Blood Group</th>
                <th>Mobile</th>
                <th>Address</th>
                {user && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {Object.keys(contactObjects).map((id) => {
                return (
                  <tr key={id}>
                    <td className="td">{contactObjects[id].fullName}</td>
                    <td className="td">{contactObjects[id].age}</td>
                    <td className="td">{contactObjects[id].bloodgrp}</td>
                    <td className="td">{contactObjects[id].mobile}</td>
                    <td className="td">{contactObjects[id].address}</td>
                    {user && (
                      <td>
                        {contactObjects[id].addedBy === user.email ? (
                          <>
                            <button
                              className="btn text-primary"
                              onClick={() => {
                                if (typeof window !== "undefined") {
                                  window["scrollTo"]({
                                    top: 0,
                                    behavior: "smooth"
                                  });
                                }
                                setCurrentId(id);
                              }}
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </button>
                            <button
                              className="btn text-danger"
                              onClick={() => {
                                onDelete(id);
                              }}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </>
                        ) : null}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <footer>
        <div class="footer-copyright text-center py-3">Created by Hemang Choudhary
      </div>
      </footer>
      </div>
    </>
  );
};

export default Contacts;
