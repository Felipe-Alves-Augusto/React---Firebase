import React from "react";
import './cadastro.css';
import {Link} from 'react-router-dom'


const CadastroSucesso = () => {
    return (
        <div className="wrapper-cadastro-sucesso">
            {/* <svg width="400" height="225" viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="225" rx="8" fill="#F5F5F5"/>
                <rect x="218" y="94" width="36" height="36" rx="0.5" transform="rotate(90 218 94)" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M182 116L189.646 108.354C189.842 108.158 190.158 108.158 190.354 108.354L212 130" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M203 108C205.761 108 208 105.761 208 103C208 100.239 205.761 98 203 98C200.239 98 198 100.239 198 103C198 105.761 200.239 108 203 108Z" stroke="black" stroke-width="1.5"/>
                <path d="M203 121L218 106" stroke="black" stroke-width="1.5"/>
            </svg> */}

            <h1>Cadatro efetuado<br /> com sucesso</h1>
            <svg fill="#fff" width="85" height="75" viewBox="0 0 85 75" xmlns="http://www.w3.org/2000/svg">
                <path fill="#222" d="M0.833252 41.125L26.4818 73.75C26.682 74.0046 27.0678 74.0047 27.268 73.75L84.1666 1.375" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
            </svg>

            <Link to="/cadastro-cartela" className="btn">Cadastrar Cartela</Link>

        </div>
    )
}

export default CadastroSucesso