import React, { useEffect, useState } from "react";
import { getApi } from "../Api/Api";

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(()=>{
    setTimeout(()=>{
        setDebouncedSearch(search)
    },300)
    return ()=> clearTimeout()
  },[search])


  const filterData = data.filter(
    (user) =>
      user.username.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getApi();
        console.log(res.data);
        setError("");
        setData(res.data);
      } catch (error) {
        setError("Fetching api");
        console.error("fetching api from server");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleHandle = (id) => {
    setToggle((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {loading ? (
        <p>Loading data............</p>
      ) : error ? (
        <p className="text-red-600 font-medium">{error}</p>
      ) : (
        <div className="items-center">
          <input
            type="text"
            placeholder="Search by name or email"
            className="border p-2 rounded mb-4 w-full max-w-md "
            value={search}
            onChange={(e)=>
                setSearch(e.target.value)}
          />

          <h1 className="text-3xl font-bold text-center pb-4">User List</h1>
          <ul className="grid  gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   ">
            {filterData.map((curUser) => {
              const { id, username, email, phone, website,address } = curUser;
              return (
                <li
                  onClick={() => toggleHandle(id)}
                  key={id}
                  className={`px-4 py-4 border shadow rounded cursor-pointer transition ${
                    toggle.includes(id)
                      ? "bg-blue-700 text-white"
                      : "text-blue-700 bg-white"
                  }`}
                >
                  <h1>
                    <strong className="pr-2">Name:</strong>
                    {username}
                  </h1>
                  <p>
                    <strong className="pr-2">Email:</strong>
                    {email}
                  </p>
                  <p>
                    <strong className="pr-2">Phone:</strong>
                    {phone}
                  </p>
                  <p>
                    <strong className="pr-2">Website:</strong>
                    {website}
                  </p>
                  <p>
                    <strong className="pr-2">Address:</strong>
                    {address.city}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserList;
