import React from "react";
import { NavLink } from "react-router-dom";

export function UserMenu({ user, onLogout }) {
  return (
    <div>
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{
            background: "#fff",
            color: "#007bff",
            borderRadius: "12px",
            padding: "0.25rem 0.75rem",
            fontWeight: "bold",
            fontSize: "0.95rem"
          }}>
            {user.email}
          </span>
          <button
            onClick={onLogout}
            style={{
              background: "#ffd700",
              color: "#0056b3",
              border: "none",
              borderRadius: "6px",
              padding: "0.5rem 1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s"
            }}
            onMouseEnter={e => e.target.style.background = "#ffe066"}
            onMouseLeave={e => e.target.style.background = "#ffd700"}
          >
            Logout
          </button>
        </div>
      ) : (
        <NavLink
          to="/login"
          style={{
            color: "#ffd700",
            background: "#0056b3",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "background 0.2s, color 0.2s"
          }}
          onMouseEnter={e => e.target.style.background = "#3399ff"}
          onMouseLeave={e => e.target.style.background = "#0056b3"}
        >
          Login
        </NavLink>
      )}
    </div>
  );
}