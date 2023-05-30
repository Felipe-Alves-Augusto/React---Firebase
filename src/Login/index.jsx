import React, { useEffect, useState } from "react";
import './login.css'
import '../data/firebase';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom'
import Button from "../component/Button";
import Input from "../component/Input";

// fazer a verificação de campos vazios
// fazer a verificação se o email e senha existe

const Login = () => {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const signIn = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('login', user);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(true);
                console.log('errorCode', errorCode);
                console.log('errorMessage', errorMessage);
            });
    }


    useEffect(() => {
        getAuth().onAuthStateChanged(function(user){
            if(user){
               navigate('/cadastro-cartela', {replace: true});
            }
        });
    }, [])

    return (

        <div className="login">
            <div className="wrapper-login">
                <h2>Login</h2>
                {error &&
                    <div className="message-error">
                        <p>Por favor, digite um e-mail e senha validos</p>
                    </div>
                }
                
                <Input value={email} change={(e) => setEmail(e.target.value)} type="email" placeholder="E-mail"></Input>
                <Input value={password} change={(e) => setPassword(e.target.value)} type="password" placeholder="Senha"></Input>
                <Button click={signIn} classButton="btn-login">Login</Button>

                <Link to='/cadastro' className="not-account">Não possui conta? Cadastre-se!</Link>
            </div>
        </div>

    )

}



export default Login;