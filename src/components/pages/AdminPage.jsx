import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

function AdminPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cssValue, setCssValue] = useState("");
  const [exampleImage, setExampleImage] = useState("");
  const [filters, setFilters] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth();

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        alert("Acesso negado. Faça login para acessar.");
        navigate("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  // Busca os filtros do Firestore
  useEffect(() => {
    const fetchFilters = async () => {
      const filtersCollection = collection(db, "filters");
      const filtersSnapshot = await getDocs(filtersCollection);
      const filtersList = filtersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFilters(filtersList);
    };

    fetchFilters();
  }, []);

  // Adiciona um novo filtro
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFilter = {
        name,
        description,
        cssValue,
        example_image: exampleImage,
      };
      await addDoc(collection(db, "filters"), newFilter);
      alert("Filtro adicionado com sucesso!");
      setFilters((prev) => [...prev, newFilter]);
      setName("");
      setDescription("");
      setCssValue("");
      setExampleImage("");
    } catch (error) {
      console.error("Erro ao adicionar filtro:", error);
      alert("Erro ao adicionar filtro.");
    }
  };

  // Exclui um filtro
  const handleDeleteFilter = async (id) => {
    try {
      await deleteDoc(doc(db, "filters", id));
      setFilters((prev) => prev.filter((filter) => filter.id !== id));
      alert("Filtro excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir filtro:", error);
      alert("Erro ao excluir filtro.");
    }
  };

  const handleEditFilter = async (id, updatedFilter) => {
    try {
      await updateDoc(doc(db, "filters", id), updatedFilter);
      setFilters((prev) =>
        prev.map((filter) => (filter.id === id ? { ...filter, ...updatedFilter } : filter))
      );
      alert("Filtro atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar filtro:", error);
      alert("Erro ao atualizar filtro.");
    }
  };

  // Busca os usuários do Firebase Authentication
  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = []; // Aqui você precisará de uma função de backend para listar usuários
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Página de Administração</h1>

      {/* Formulário para adicionar filtros */}
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", maxWidth: "400px", marginBottom: "2rem" }}>
        <h2>Adicionar Novo Filtro</h2>
        <div>
          <label>Nome do Filtro:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Valor CSS:</label>
          <input
            type="text"
            value={cssValue}
            onChange={(e) => setCssValue(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL da Imagem de Exemplo:</label>
          <input
            type="text"
            value={exampleImage}
            onChange={(e) => setExampleImage(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar Filtro</button>
      </form>

      {/* Tabela de filtros */}
      <h2>Filtros</h2>
      <table border="1" style={{ width: "100%", marginBottom: "2rem" }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor CSS</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
  {filters.map((filter) => (
    <tr key={filter.id}>
      <td>
        <input
          type="text"
          value={filter.name}
          onChange={(e) =>
            setFilters((prev) =>
              prev.map((f) =>
                f.id === filter.id ? { ...f, name: e.target.value } : f
              )
            )
          }
        />
      </td>
      <td>
        <textarea
          value={filter.description}
          onChange={(e) =>
            setFilters((prev) =>
              prev.map((f) =>
                f.id === filter.id ? { ...f, description: e.target.value } : f
              )
            )
          }
        />
      </td>
      <td>
        <input
          type="text"
          value={filter.cssValue}
          onChange={(e) =>
            setFilters((prev) =>
              prev.map((f) =>
                f.id === filter.id ? { ...f, cssValue: e.target.value } : f
              )
            )
          }
        />
      </td>
      <td>
        <button onClick={() => handleEditFilter(filter.id, filter)}>Salvar</button>
        <button onClick={() => handleDeleteFilter(filter.id)}>Excluir</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>

      {/* Tabela de usuários */}
      <h2>Usuários</h2>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;