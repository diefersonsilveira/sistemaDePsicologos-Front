import React from "react";
import { NavLink } from "react-router-dom";
import "./SidebarAdmin.css";

const SidebarAdmin = () => {
  return (
    <aside className="sidebar-admin">
      <h2 className="sidebar-titulo">Painel</h2>
      <nav className="sidebar-nav">
        <NavLink to="/admin" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/pacientes" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          Pacientes
        </NavLink>
        <NavLink to="/admin/psicologos" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          Psicólogos
        </NavLink>
        <NavLink to="/admin/consultas" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          Consultas
        </NavLink>
        <NavLink to="/admin/agenda" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          Agenda
        </NavLink>
        <NavLink to="/admin/graficos" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          Gráficos
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
