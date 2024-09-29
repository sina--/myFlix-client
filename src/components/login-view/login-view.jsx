import React from "react";
import { useState, useEffect } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      access: username,
      secret: password
    };

    //fetch("https://openlibrary.org/account/login.json", {
    //  method: "POST",
    //  body: JSON.stringify(data)
    //}).then((response) => {
    //  if (response.ok) {
    //    onLoggedIn(username);
    //  } else {
    //    alert("Login failed");
    //  }
    //});

     fetch("https://sw-movie-flix-5fc48d8b332a.herokuapp.com/login", {
       method: "POST:,",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify(data)
     })
     .then((response) => response.json())
     .then((data) => {
       console.log("Login response: ", data);
       if (data.user) {
         onLoggedIn(data.user, data.token);
       } else {
         alert("No such user");
       }
     })
     .catch((e) => {
       alert("Something went wrong");
     });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};
