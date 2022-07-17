import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SocketModal from '../components/modal/SocketModal';
import Loading from '../components/loading/Loading';
import MyPagination from '../components/pagination/MyPagination';
import {useGetProfilesQuery} from '../profiles/profilesApiSlice';
import {useSelector} from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { Navigate, Link } from 'react-router-dom';

const InvitationScreen = () =>{
    const [wordId, setWordId] = useState(() => localStorage.getItem("word_id") ? 
        JSON.parse(localStorage.getItem("word_id")) : null);
    const user = useSelector(selectCurrentUser);

    const {
        data: profiles,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProfilesQuery();

    console.log(wordId);

//Falta poner un los botones para solo mostrar de a diez usuarios
    return (<>
        {isLoading &&
            <Loading/>}  
        
        {isSuccess &&
        <section className="users">
            <Row>
                <Col sm={1} md={2}></Col>
                <Col className="text-center">
                    <h4>Desafia a tus compañeros</h4>
                    <Table striped responsive="sm" variant="info">
                        <thead>
                            <tr>
                            <th>Nombre de usuario</th>
                            <th>Victorias</th>
                            <th>Derrotas</th>
                            <th>Invitar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            profiles.map((profile, i) => {
                            if(profile.user.id !== user.id){ 
                                return <tr key={i}>
                                    <td>{profile.user.username}{' '}</td>
                                    <td>{profile.victories}</td>
                                    <td>{profile.defeats}</td>
                                    <td>{wordId == null ?
                                        (<Navigate to="/app/online/savescreen"/>)
                                        :
                                        (<SocketModal id={profile.user.id} wordId={wordId}/>)
                                        }
                                    </td>
                                </tr>
                            }
                        })}
                        </tbody>
                    </Table>
                </Col>
                <Col sm={1} md={2}></Col>
            </Row>
        </section>}
        </>

    )

}

export default InvitationScreen;