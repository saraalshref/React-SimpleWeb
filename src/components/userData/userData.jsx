import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correctly importing jwtDecode as a named import

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7098/api/account/users');
        setUsers(response.data.data); 
        setIsLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setIsLoading(false);
      }
    };

    const token = localStorage.getItem('userToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setLoggedInUser(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
    }

    fetchUsers();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <div className="container">
      <h3 className="text-main text-center my-4 fw-bold">Users Data</h3>
      <div className="row">
        {users.map(user => (
          <div key={user.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-main fw-bold text-center mb-4">{user.name}</h5>
                <p className="card-text"><strong>Email:</strong> {user.email}</p>
                <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
                <p className="card-text"><strong>Age:</strong> {user.age}</p>
              </div>
              <div className="card-footer text-center">
                {loggedInUser === user.email && (
                  <Link to={`/edit/${user.id}`} className="btn bg-main text-light my-2 ps-5 pe-5">Edit</Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
