import React from "react";
import { GLSLSample } from "../glsl/GLSLSample";

function Sobre() {
  return (
    <div style={{ padding: "2rem", lineHeight: "1.6" }}>
      <h1>Sobre o Projeto</h1>
          <GLSLSample />

      <p>
        Este projeto foi desenvolvido como parte de um trabalho acadêmico com o objetivo de demonstrar a aplicação de tecnologias modernas no desenvolvimento de aplicações web interativas. 
        Ele combina funcionalidades de manipulação de imagens, autenticação de usuários e gerenciamento de dados em tempo real utilizando o Firebase.
      </p>
      <p>
        A principal funcionalidade do programa é permitir a comparação de imagens antes e depois de alterações, como a aplicação de filtros visuais. Além disso, o sistema inclui uma interface administrativa que permite gerenciar filtros e usuários, demonstrando o uso de operações CRUD (Criar, Ler, Atualizar e Excluir) em um banco de dados.
      </p>
      <p>
        Este projeto foi projetado para ser simples, intuitivo e funcional, com foco em demonstrar conceitos como:
      </p>
      <ul>
        <li>Manipulação de imagens no frontend.</li>
        <li>Autenticação de usuários com Firebase Authentication.</li>
        <li>Gerenciamento de dados em tempo real com Firestore.</li>
        <li>Criação de interfaces responsivas e interativas.</li>
      </ul>
      <p>
        Esperamos que este projeto seja útil como referência para estudantes e desenvolvedores que desejam aprender mais sobre o desenvolvimento de aplicações web modernas.
      </p>
    </div>
  );
}

export default Sobre;