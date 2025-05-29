import React, { useMemo } from "react";
import SidebarAdmin from "../../../components/SidebarAdmin/SidebarAdmin";
import { useAppContext } from "../../../context/AppContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import "./Graficos.css";

const Graficos = () => {
  const { consultas} = useAppContext();

  const dadosMensais = useMemo(() => {
    const agrupados = {};
    consultas.forEach((c) => {
      const mes = c.data.slice(0, 7);
      agrupados[mes] = (agrupados[mes] || 0) + 1;
    });
    return Object.entries(agrupados).map(([mes, consultas]) => ({ mes, consultas }));
  }, [consultas]);

  const dadosPsicologos = useMemo(() => {
    const agrupados = {};
    consultas.forEach((c) => {
      const nome = c.psicologo || "Desconhecido";
      agrupados[nome] = (agrupados[nome] || 0) + 1;
    });
    return Object.entries(agrupados).map(([nome, valor]) => ({ nome, valor }));
  }, [consultas]);

  const cores = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4"];

  return (
    <div className="admin-pagina">
      <SidebarAdmin />
      <div className="admin-conteudo">
        <h1 className="graficos-titulo">Relatórios Visuais</h1>

        <div className="grafico-sessao">
          <h2>Consultas por Mês</h2>
          <div className="grafico-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosMensais}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="consultas" fill="#8884d8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grafico-sessao">
          <h2>Consultas por Psicólogo</h2>
          <div className="grafico-legenda-container">
            <div className="grafico-legenda">
              {dadosPsicologos.map((entry, index) => (
                <div key={index} className="legenda-item">
                  <span className="legenda-cor" style={{ backgroundColor: cores[index % cores.length] }}></span>
                  <span className="legenda-nome">{entry.nome}</span>
                </div>
              ))}
            </div>
            <div className="grafico-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dadosPsicologos}
                    dataKey="valor"
                    nameKey="nome"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {dadosPsicologos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graficos;
