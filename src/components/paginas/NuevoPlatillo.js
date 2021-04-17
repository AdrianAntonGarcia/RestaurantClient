import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';

const NuevoPlatillo = () => {
  // Context con las operaciones de firebase
  const {
    firebase: { db, storage },
  } = useContext(FirebaseContext);
  //Hook para redireccionar
  const navigate = useNavigate();

  // validación y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
      descripcion: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, 'Los Platillos deben tener al menos 3 caracteres')
        .required('El nombre del platillo es obligatorio'),
      precio: Yup.number()
        .min(1, 'Debes agregar un número')
        .required('El precio es obligatorio'),
      categoria: Yup.string().required('La categoría es obligatoria'),
      descripcion: Yup.string()
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .required('La descripción del platillo es obligatoria'),
    }),
    onSubmit: (platillo) => {
      try {
        platillo.existencia = true;
        db.collection('productos').add(platillo);

        navigate('/menu');
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Agregar Platillo</h1>
      <div className="flex justify-center mt-10">
        <div className="max-w-3xl w-full">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                id="nombre"
                className="shadow appearance-none border rouded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                type="text"
                placeholder="Nombre Platillo"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                id="precio"
                className="shadow appearance-none border rouded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                type="number"
                placeholder="$20"
                min="0"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.precio && formik.errors.precio ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.precio}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Categoria
              </label>
              <select
                className="shadow appearance-none border rouded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                name="categoria"
                id="precio"
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">-- Seleccione --</option>
                <option value="desayuno">Desayuno</option>
                <option value="comida">Comida</option>
                <option value="cena">Cena</option>
                <option value="bebida">Bebidas</option>
                <option value="postre">Postre</option>
                <option value="ensalada">Ensaladas</option>
              </select>
            </div>
            {formik.touched.categoria && formik.errors.categoria ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.categoria}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imagen"
              >
                Imagen
              </label>
              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={storage.ref('productos')}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="descripcion"
              >
                Descripción
              </label>
              <textarea
                className="shadow appearance-none border rouded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none h-40"
                name="descripcion"
                id="descripcion"
                placeholder="Descripción del platillo"
                cols="30"
                rows="10"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.descripcion}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              value="Agregar Platillo"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoPlatillo;
