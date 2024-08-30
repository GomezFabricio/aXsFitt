import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Módulo Vendedores</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Vendedores</Link>
                    </li>
                    <li>
                        <Link to="/create-vendedor">Registrar nuevo vendedor</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
