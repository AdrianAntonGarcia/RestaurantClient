import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Platillo from '../ui/Platillo';

const Menu = () => {
  const [platillos, setPlatillos] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const obtenerPlatillos = () => {
      firebase.db.collection('productos').onSnapshot(handleSnapshot);
    };
    obtenerPlatillos();
  }, [firebase]);
  // Snapshot nos permite usar la base de datos en tiempo real de firestore
  function handleSnapshot(snapshot) {
    const platillos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Almacenar los resultados en el state
    setPlatillos(platillos);
  }
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to="/nuevo-platillo"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Agregar Platillo
      </Link>
      {platillos.map((platillo) => (
        <Platillo key={platillo.id} platillo={platillo} />
      ))}
    </>
  );
};

export default Menu;
