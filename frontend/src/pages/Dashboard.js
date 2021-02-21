import React, { useState, useRef } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { ToastsContainer, ToastsStore } from "react-toasts";
import axios from "axios";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const yourname = useRef("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const getTwillioToken = () => {
    const currentUserName = yourname;
    if (currentUserName.length === 0) {
      ToastsStore.error("Please enter the username!");
      return;
    }

    axios.get("/token/" + currentUserName).then((results) => {
      const { identity, jwt } = results.data;
      this.setState(
        {
          identity,
          jwt,
        },
        () => {
          if (jwt.length === 0 || identity.length === 0) {
            ToastsStore.error("Issue to fetch token!");
          } else {
            this.setState({ userName: currentUserName });
            this.joinRoom();
          }
        }
      );
    });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          {!hasJoinedRoom && (
            <div className="row">
              <div className="col-3 form-inline">
                <div className="form-group mt-2">
                  <input className="form-control" type="text" ref={yourname} />{" "}
                  <button
                    className="btn btn-success ml-2"
                    onClick={() => {
                      getTwillioToken();
                      history.push("/Rooms");
                    }}
                  >
                    Join Room
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
