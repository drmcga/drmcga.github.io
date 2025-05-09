import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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
    <nav style={{   alignSelf: "top",
                    width:"100%", 
                    padding: "1rem", 
                    backgroundColor: "#007bff", 
                    color: "white", 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: "1rem" }}>

        <img src="https://www.svgrepo.com/show/340223/drag-vertical.svg" alt="" style={{maxWidth:"2rem",rotate:"90deg", filter:"invert(100%)"}} />
  

      <div>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          Home
        </Link>
      </div>

      <div>
        <Link to="/sobre" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          Sobre
        </Link>
      </div>

      <div>
        <Link to="/comousar" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          Como usar
        </Link>
      </div>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>LOGADO COMO: {user.email}</span>
            <button onClick={handleLogout} style={{ backgroundColor: "white", color: "#007bff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;