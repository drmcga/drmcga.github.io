import React from "react";

function ComoUsar() {
  return (
    <div style={{ padding: "2rem", lineHeight: "1.6" }}>
      <h1>Como Usar</h1>
      <p>
        Este programa foi projetado para ser simples e intuitivo. Siga as instruções abaixo para aproveitar todas as funcionalidades disponíveis:
      </p>
      <h2>1. Comparação de Imagens</h2>
      <p>
        Na página inicial, você pode comparar duas imagens lado a lado. Para isso:
      </p>
      <ul>
        <li>Faça upload de uma imagem clicando no botão "Inserir uma imagem".</li>
        <li>Use o controle deslizante para ajustar a visualização entre a imagem original e a imagem com filtros aplicados.</li>
        <li>Escolha um filtro no menu suspenso para aplicar efeitos visuais à imagem.</li>
      </ul>
      <h2>2. Acesso Administrativo</h2>
      <p>
        Usuários autenticados com permissões administrativas podem acessar a página de administração. Nesta página, você pode:
      </p>
      <ul>
        <li>Adicionar novos filtros preenchendo o formulário e clicando em "Adicionar Filtro".</li>
        <li>Visualizar, editar ou excluir filtros existentes na tabela de filtros.</li>
        <li>Gerenciar usuários cadastrados, incluindo a exclusão de contas.</li>
      </ul>
      <h2>3. Login e Logout</h2>
      <p>
        Para acessar a página de administração, você deve fazer login:
      </p>
      <ul>
        <li>Na barra de navegação, clique em "Login".</li>
        <li>Insira suas credenciais e clique em "Entrar".</li>
        <li>Após o login, você verá seu email exibido na barra de navegação.</li>
        <li>Para sair, clique no botão "Logout".</li>
      </ul>
      <p>
        Caso tenha dúvidas ou encontre problemas, entre em contato com o administrador do sistema.
      </p>
    </div>
  );
}

export default ComoUsar;