import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuEnInventario = () => {
    const location = useLocation();

    return (
        <div className="menu-en-inventario p-4">
            <ul className="menu-tabs flex flex-col md:flex-row md:space-x-4 list-none p-0">
                <li className={`py-2 px-4 border border-gray-300 rounded-md ${location.pathname === '/inventario' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <Link to="/inventario" className="block no-underline rounded-md">
                        Inventario
                    </Link>
                </li>
                <li className={`py-2 px-4 border border-gray-300 rounded-md ${location.pathname === '/productos' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <Link to="/productos" className="block no-underline rounded-md">
                        Productos
                    </Link>
                </li>
                <li className={`py-2 px-4 border border-gray-300 rounded-md ${location.pathname === '/tipos-productos' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <Link to="/tipos-productos" className="block no-underline rounded-md">
                        Tipos de Productos
                    </Link>
                </li>
                <li className={`py-2 px-4 border border-gray-300 rounded-md ${location.pathname === '/marcas-productos' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <Link to="/marcas-productos" className="block no-underline rounded-md">
                        Marcas de Productos
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MenuEnInventario;