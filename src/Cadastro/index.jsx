import React, { useState } from "react";
import './cadastro.css'
import '../data/firebase';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import Button from "../component/Button";
import Input from "../component/Input";

// fazer a verificação de campos vazios
// fazer a verificação se o campo de confirmar senha e igual ao senha
// fazer a verificação

const Cadastro = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState([false, '']);


    const saveCadastro = () => {

        if(email !== '') {
            if(password !== '' && confirmPassword !== '') {
                if(password == confirmPassword) {

                    const auth = getAuth();
                    createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        
                        const user = userCredential.user;
                        console.log('user', user);

                        navigate('/cadastro/sucesso', {replace: true});
                      
                    })
                    .catch((error) => {
                        console.log(error);
                        setMessage([true, 'Não foi possível fazer o cadastro, por favor tente com outro e-mail'])
                    });

                } else {
                    setMessage([true, 'As senhas não conferem!'])
                }
            } else {
                setMessage([true, 'Campo de ser maior ou igual a 6 caracteres'])
            }
        } else {
            setMessage([true, 'Preencha o campo de email!']);
        }

        
    }

    return (

        <div className="cadastro">
            <div className="wrapper-cadastro">
                <h2>Cadastro</h2>
                {message[0] &&
                    <div class="message-error">
                        <p>{message[1]}</p>
                    </div>
                }
           
                <Input 
                value={email} 
                change={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="E-mail"

                ></Input>

                <Input 
                value={password} 
                change={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Senha"

                ></Input>

                <Input 
                value={confirmPassword} 
                change={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Digite sua senha novamento"

                ></Input>

                <Button click={saveCadastro} classButton="btn-cadastro">Cadastrar</Button>
            </div>
        </div>


    )
}

export default Cadastro