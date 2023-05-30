import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "../Login";
import Cadastro from "../Cadastro";
import CadastroCartela from "../views/CadastroCartela";
import CadastroSucesso from "../views/CadastroSucesso";
import Listagem from "../views/Listagem";
import {getAuth} from 'firebase/auth'
import Permission from "../views/Permission";

export const AppRoutes = () => {

    const [verifyLogin, setVerifyLogin] = useState('');

    useEffect(() => {
        getAuth().onAuthStateChanged((user) => {
            if(user){
                setVerifyLogin(user.email)
            }
        });
    });
    
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/cadastro" element={<Cadastro></Cadastro>}></Route>
                <Route path="/cadastro-cartela" element={verifyLogin !== '' ? <CadastroCartela></CadastroCartela> : <Permission></Permission>}></Route>
                <Route path="/cadastro/sucesso" element={<CadastroSucesso></CadastroSucesso>}></Route>
                <Route path="/listagem" element={verifyLogin !== '' ? <Listagem></Listagem> : <Permission></Permission>}></Route>
            </Routes>
        </BrowserRouter>
    )
}