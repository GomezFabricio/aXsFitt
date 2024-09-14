import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarClientes.css';

const NavbarClientes = () => {
    return (
        <div className="navbar-clientes">
            <nav>
                <ul>
                    <li>
                        <Link to="/clientes">Clientes</Link>
                    </li>
                    <li>
                        <Link to="/clientes/create">Registrar nuevo cliente</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavbarClientes;
