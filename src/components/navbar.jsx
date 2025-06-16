import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { UserMenu } from "./buttons/UserMenu";


const navItems = [
  { label: "Home", path: "/" },
  { label: "Sobre", path: "/sobre" },
  { label: "Como usar", path: "/comousar" }
];

function NavItem({ label, path }) {
  return (
    <NavLink
      to={path}
      style={({ isActive }) => ({
        color: isActive ? "#ffd700" : "white",
        textDecoration: "none",
        fontWeight: "bold",
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        background: isActive ? "#0056b3" : "transparent",
        transition: "background 0.2s, color 0.2s"
      })}
      onMouseEnter={e => e.target.style.background = "#3399ff"}
      onMouseLeave={e => e.target.style.background = ""}
    >
      {label}
    </NavLink>
  );
}

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Você saiu com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
      alert("Erro ao sair.");
    }
  };

  return (
    <nav style={{
      alignSelf: "top",
      width: "100%",
      padding: ".5rem",
      backgroundColor: "#0056b3",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem"
    }}>
      <img src="https://www.svgrepo.com/show/340223/drag-vertical.svg" alt="" style={{ maxWidth: "2rem", rotate: "90deg", filter: "invert(100%)" }} />

      

      <div style={{ display: "flex", gap: "8rem" }}>
      {navItems.map((item) => (
        <NavItem key={item.path} label={item.label} path={item.path} />
      ))}
    </div>
    <UserMenu user={user} onLogout={handleLogout} />

      
    </nav>
  );
}

export default Navbar;