import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SocketModal from '../components/modal/SocketModal';
import Loading from '../components/loading/Loading';
import {useGetProfilesQuery} from '../profiles/profilesApiSlice';
import {useSelector} from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { Navigate, Link } from 'react-router-dom';

const InvitationScreen = () =>{
    const [wordId, setWordId] = useState(() => localStorage.getItem("word_id") ? 
        JSON.parse(localStorage.getItem("word_id")) : null);
    const user = useSelector(selectCurrentUser);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');
    const pageLimits = 2;

    const {
        data: profiles,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProfilesQuery();

    console.log(wordId);

    const profilesFilter = () => {
        return profiles.filter(profile => profile.user.username.includes(search));
    }

    const filteredProfiles = () => {
        if(search.length === 0){
            //si la caja de busqueda esta vacia guiarte por la paginacion
            return profiles.slice(currentPage, currentPage + pageLimits);
        }

        //si no esta vacia paginar las coincidencias
        const filtered = profilesFilter();
        return filtered.slice(currentPage, currentPage + pageLimits);
    }

    const nextPage = () => {
        if(profilesFilter().length > currentPage + pageLimits) {
            return setCurrentPage(currentPage + pageLimits);
        } 
    }

    const prevPage = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage - pageLimits);
        }
    }

    const onSearchChange = (e) => {
        setCurrentPage(0)    
        setSearch(e.target.value);
    }

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
                    <Row className="users__search">
                        <Col>
                            <Form.Control
                                type="search"
                                placeholder="Buscar usuario"
                                className="me-1"
                                aria-label="Search"
                                value={search}
                                onChange={onSearchChange}
                            />
                        </Col>
                        <Col></Col>
                    </Row>
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
                            filteredProfiles().map((profile, i) => {
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
                    {currentPage > 0 &&
                    <Button variant="primary" onClick={prevPage}>Anterior</Button>}
                    &nbsp;
                    {profilesFilter().length > currentPage + pageLimits &&
                        <Button variant="primary" onClick={nextPage}>Siguiente</Button>
                    }
                </Col>
                <Col sm={1} md={2}></Col>
            </Row>
        </section>}
        </>

    )

}

export default InvitationScreen;