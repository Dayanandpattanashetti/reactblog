import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { axiosInstance } from "../../config";

const Sidebar = () => {
  const [cat, setCats] = useState([]);
  useEffect(() => {
    const fetchCats = async () => {
      const res = await axiosInstance.get("/api/categories");
      setCats(res.data);
    };
    fetchCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT US</span>
        <img
          src="https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>
          "VersaBlog Central" is a versatile platform designed to empower
          bloggers from all walks of life to share their insights, experiences,
          and perspectives on a wide range of topics. Whether you're passionate
          about urban life, technology, culture, health, or any other subject
          matter, "VersaBlog Central" offers a collaborative space to connect,
          engage, and inspire audiences with compelling content that resonates
          with diverse interests and audiences. Our platform embraces
          inclusivity, creativity, and community engagement, fostering dialogue,
          collaboration, and innovation among writers, readers, and enthusiasts
          worldwide. Join "VersaBlog Central" and explore endless possibilities
          to express, connect, and inspire through the power of blogging.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cat.map((item) => (
            <Link to={`/?cat=${item.name}`} className="link">
              <li className="sidebarListItem">{item.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
