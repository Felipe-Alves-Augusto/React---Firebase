import React, { useState, useEffect } from "react";
import './cadastro.css';
import {getDatabase, push, ref} from 'firebase/database'
import { getAuth } from "firebase/auth";
import {getStorage, ref as ref2, getDownloadURL, uploadBytes} from 'firebase/storage'
import Loader from "../component/Loader";
import {Link} from 'react-router-dom'
import Button from "../component/Button";


const CadastroCartela = () => {

    const [number, setNumber] = useState(0);
    const [fileName, setFilename] = useState("");
    const [messageVisible, setMessageVisible] = useState(false);
    const [messageSucess, setMessageSucess] = useState(false);
    const [uidUser, setUidUser] = useState("");
    const [preview, setPreview] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
  
        getAuth().onAuthStateChanged(function(user){
            if(user){
                setUidUser(user.uid);
            }
        });

        if (!fileName) {
            setPreview(undefined);
            return
        }

        const objectUrl = URL.createObjectURL(fileName)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)

    }, [fileName])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setFilename(undefined)
            return
        }

        setFilename(e.target.files[0]);
    }

    const save =  async (e) => {
        setLoading(true);
        const db = getDatabase(); 
        const storage = getStorage();
        const forestRef = ref2(storage, `cartelas-${fileName.name}`);
        let id = 0;

        const snapshot = await uploadBytes(forestRef, fileName);
        console.log(snapshot);

          getDownloadURL(forestRef).then( img => {
            console.log('imagem', img)
            
            push(ref(db, 'users'), 
            {
                img: img,
                porcentagem: number,
                date: new Date().toLocaleDateString()
            }
            )
            .then((result) => {
                setMessageSucess(true);

                setTimeout(() => {
                    setMessageSucess(false);
                }, 2000)

                setMessageVisible(false);
                setPreview(undefined);
                setNumber(0);
                setLoading(false);
                //console.log('resultado', result)

        
            })
            .catch(error => {
                console.log(error);
            })
        
        });

    }

    return (
        <>
            {loading &&
                <Loader></Loader>
            }
            
            
            <div className="cadastro-cartelas">
            
            <div className="back-page">
                <Link to={'/listagem'}>
                <svg width='30' height='30' fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                
                </Link>
            </div>

            <h1>Tire foto da sua cartela para escanear</h1>
            {messageVisible &&
                <div className="message-error">
                    Por favor, selecione uma imagem e gere um número
                </div>
            }

            { messageSucess &&
                <div className="message-sucess">
                    Dados enviados com sucesso
                </div>
            }
            <div class="icon-img">
            
            <svg width="47" height="44" viewBox="0 0 47 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M41.125 31.9815C41.125 32.7379 40.7874 33.4632 40.1864 33.9981C39.5854 34.5329 38.7704 34.8334 37.9205 34.8334H9.07955C8.22965 34.8334 7.41456 34.5329 6.81359 33.9981C6.21262 33.4632 5.875 32.7379 5.875 31.9815V16.2963C5.875 15.54 6.21262 14.8146 6.81359 14.2798C7.41456 13.7449 8.22965 13.4445 9.07955 13.4445H15.4886L18.6932 9.16669H28.3068L31.5114 13.4445H37.9205C38.7704 13.4445 39.5854 13.7449 40.1864 14.2798C40.7874 14.8146 41.125 15.54 41.125 16.2963V31.9815Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M23.5 29.3333C26.7447 29.3333 29.375 26.8709 29.375 23.8333C29.375 20.7957 26.7447 18.3333 23.5 18.3333C20.2553 18.3333 17.625 20.7957 17.625 23.8333C17.625 26.8709 20.2553 29.3333 23.5 29.3333Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            </div>
            <div className="input-file">
               
                <label className="btn" htmlFor="cartela">Inserir Cartela</label>
                <input onChange={onSelectFile}  type="file" name="cartela" id="cartela" />
            </div>
            
            <div className="img-choice">
            {preview !== undefined ?
                <img id="preview" src={preview}/>
                :
                <svg width="220" height="250" viewBox="0 0 220 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="220" height="250" rx="8" fill="#F5F5F5"/>
                    <rect x="128" y="106" width="36" height="36" rx="0.5" transform="rotate(90 128 106)" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M92 128L99.6464 120.354C99.8417 120.158 100.158 120.158 100.354 120.354L122 142" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M113 120C115.761 120 118 117.761 118 115C118 112.239 115.761 110 113 110C110.239 110 108 112.239 108 115C108 117.761 110.239 120 113 120Z" stroke="black" stroke-width="1.5"/>
                    <path d="M113 133L128 118" stroke="black" stroke-width="1.5"/>
                </svg>
            }
            

            </div>

            <div className="probability">
                {number !== 0 && 
                    <p>Porcentagem Gerada: {number}%</p>
                }
                <Button click={() => setNumber(Math.floor(Math.random() * (100 - 1 + 1)) + 1)} classButton="btn">Gerar Probalidade</Button>
            </div>

            {fileName !== '' && number !== 0 ?
            
                <Button click={save} classButton="btn btn-send">Enviar</Button>
                :
                <Button click={() => setMessageVisible(true)} classButton="btn btn-error">Enviar</Button>
            }

        </div>
        
        </>
        
    )
}


export default CadastroCartela;