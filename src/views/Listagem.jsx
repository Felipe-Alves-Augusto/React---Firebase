import React, { useEffect, useState } from "react";
import './listagem.css'
import {getAuth, signOut} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import { getDatabase, ref, onValue} from "firebase/database";
import {Link} from 'react-router-dom'
import Loader from "../component/Loader";



const Listagem = () => {

    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const logout = () => {

        const auth = getAuth();
        
        signOut(auth)
            .then(result => {
                console.log(result);
                navigate('/', {replace: true});

            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {

        setLoading(true);

        getAuth().onAuthStateChanged(function(user){
            //console.log('usuário', user)
        })
       
        const db = getDatabase();
        
        const starCountRef = ref(db, 'users/');
        onValue(starCountRef, (snapshot) => {
            setLoading(false);
        const datas = snapshot.val();
            //console.log(data)
            let cartelas = [];
        

            for(let data in datas){
                cartelas.push({
                    id: data,
                    img: datas[data].img,
                    porcentagem: datas[data].porcentagem,
                    date: datas[data].date
                })
            }

            setList(cartelas);
        });

    }, [])


    function colorPorcentagem(percent){
        if(percent >= 67) return 'green';
        if(percent <= 32) return 'red';
        if(percent >= 33) return 'yellow';
    }

    return (
       <>

        {loading &&
            <Loader></Loader>
        }

        <div className="Listagem">
            <header>
                <h1>Listagem de apostas</h1>
                <div onClick={logout} className="logout">
                <svg width="50" height="50" viewBox="0 0 19 19" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#fff" d="M0.36 0.100054C0.24 0.160053 0.14 0.250063 0.09 0.360064L0 0.520073V7.54004C0 14.33 -5.96046e-09 14.5601 0.08 14.7301C0.13 14.8401 0.21 14.9301 0.34 15.0001C4.97 17.6101 5.97 18.17 6.08 18.19C6.27 18.23 6.55 18.1101 6.69 17.9301L6.8 17.79L6.81 16.4501L6.82 15.1101L9.54 15.1001C12.2 15.0901 12.27 15.0901 12.4 15.0001C12.48 14.9601 12.58 14.8601 12.63 14.7801L12.72 14.6501V12.4301V10.2101H12.09H11.46V12.0101V13.8001H9.13H6.8L6.79 8.67007L6.78 3.53008L6.68 3.40005C6.61 3.31005 6.09 2.99008 4.93 2.33008C4.02 1.81008 3.25 1.38005 3.22 1.35005C3.18 1.33005 4.79 1.31006 7.31 1.31006H11.46V3.61006V5.91006H12.09H12.72V3.18008V0.450052L12.63 0.320072C12.58 0.250072 12.48 0.140053 12.42 0.100054L12.31 0.0100632L6.43 5.34058e-05L0.54 0.0100632L0.36 0.100054Z" ></path>
                    <path fill="#fff" d="M14.2 5.21005L14.09 5.31005L14.08 6.23007L14.07 7.15004H12.35C11.33 7.15004 10.55 7.17003 10.44 7.19003C10.01 7.29003 9.72998 7.63005 9.72998 8.06005C9.72998 8.43005 9.89998 8.70006 10.22 8.87006C10.38 8.96006 10.43 8.96006 12.23 8.97006L14.07 8.98007L14.08 9.90004L14.09 10.8201L14.23 10.94C14.34 11.04 14.39 11.06 14.5 11.04C14.67 11.01 18.3 8.39007 18.39 8.23007C18.43 8.15007 18.44 8.09006 18.41 7.97006C18.37 7.83006 18.25 7.73005 16.5 6.46005C14.83 5.25005 14.61 5.10004 14.47 5.10004C14.36 5.11004 14.28 5.14005 14.2 5.21005Z" ></path>
                    </svg>
                    <span>Logout</span>
                </div>
            </header>

            <div class="list-items">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Nome da Cartela</th>
                    <th>Porcentagem Gerada</th>
                    <th>Data</th>
                </tr>
                {list.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <a href={item.img} target="_blank">
                                    <img width="100px" src={item.img}/>
                                </a>
                            </td>
                            <td className="wrapper-termometro">
                                <span>{item.porcentagem}%</span>
                                <span className={`termometro ${colorPorcentagem(item.porcentagem)}`}></span>
                            </td>
                            <td>{item.date}</td>
                        </tr>
                    )
                })}
                
                </table>
            </div>

            <Link className="btn btn-new-consult" to='/cadastro-cartela'>Nova consulta</Link>

        </div>
       
       </>
    )

}


export default Listagem;