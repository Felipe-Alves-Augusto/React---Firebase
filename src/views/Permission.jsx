import React from "react";
import './permission.css';
import Button from '../component/Button'
import { Link } from "react-router-dom";

const Permission = () => {
    return (
        <div className="permission">
            <h1>Faça o login para acessar essa página</h1>
            <Button classButton="btn">
                <Link to='/'>Fazer Login</Link>
            </Button>
        </div>
    )
}

export default Permission;