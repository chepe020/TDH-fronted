import { useState } from "react";
import { useViewRequest } from "../../shared/hooks/category/useViewRequest";
import { useAddCategory } from "../../shared/hooks/category/useAddCategory";

export const CategoryForms = () => {
  const [formData, setFormData] = useState({
    nameSubject: "",
    descriptionSubject: "",
  });

  const { handleAddCategory, loading: addLoading } = useAddCategory();
  const { requests, loading: requestLoading } = useViewRequest();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nameSubject || !formData.descriptionSubject) {
      return alert("Por favor, completa todos los campos.");
    }

    await handleAddCategory(formData);

    setFormData({
      nameSubject: "",
      descriptionSubject: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Categoría</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Nombre de la materia</label>
          <input
            type="text"
            name="nameSubject"
            value={formData.nameSubject}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Ej. Matemáticas"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="descriptionSubject"
            value={formData.descriptionSubject}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Escribe una descripción breve"
          />
        </div>

        <button
          type="submit"
          disabled={addLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {addLoading ? "Agregando..." : "Agregar Categoría"}
        </button>
      </form>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-center">Solicitudes de Categoría Pendientes</h2>

        {requestLoading ? (
          <p className="text-center text-gray-500">Cargando solicitudes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.map((req) => (
              <div key={req._id} className="p-4 bg-white shadow rounded-lg">
                <h3 className="text-lg font-semibold">{req.nameSubject}</h3>
                <p className="text-gray-600 mb-2">{req.descriptionSubject}</p>
                <p className="text-sm text-gray-500">
                  Solicitado por: <strong>{req.keeperUser?.name}</strong> - {req.keeperUser?.email}
                </p>
                <p className="text-sm text-gray-400">Estado: {req.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
