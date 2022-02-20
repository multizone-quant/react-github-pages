import React, {Component} from 'react';
import {Button, Container, Row, Col, Alert, Table, Tooltip, Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { createPopper, OverlayTrigger } from '@popperjs/core';

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

const ReactstrapBottons1 = () => {
const saveAlert = (flag, positionflag, e) =>{
    Swal.fire({
        position: positionflag,
        icon: 'success',
        title: flag + '되었습니다',
        showConfirmButton: false, 
        timer: 1500
    })
}
const [isLoading, setLoading] = useState(false);

useEffect(() => {
  if (isLoading) {
    simulateNetworkRequest().then(() => {
      setLoading(false);
    });
  }
}, [isLoading]);

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
  
const handleClick = () => setLoading(true);

const[isShow, setIsShow] = useState(false);
const[isDone, setIsDone] = useState(false);

function toggleShow() {
    setIsShow(!isShow);
}

function toggleDone() { 
    setIsDone(!isDone);
}

  return (
    <div style={{padding:"10px"}}>
        <Button color="primary">blue</Button>
        <Button variant="outline-primary" size="lg">blue</Button>

        <Button color="info"  disabled>teal disabled</Button>
        <Button color="success">green</Button>
        <Button color="warning">yellow</Button>
        <Button color="danger">red</Button>
        <Button color="dark">dark gray</Button>
        <Button color="secondary">gray</Button>
        <Button color="light" variant="outline-secondary">white</Button>
        <Button onClick={(e)=>saveAlert('저장', 'center')}>저장</Button>

        <Button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
        >
        {isLoading ? 'Loading…' : 'Click to load'}
        </Button>

        
        <Alert >
            This is a {'primary'} alert—check it out!
        </Alert>
        
        <Table striped bordered hover size="sm" >
            <thead variant='dark'>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td><Input type="checkbox" checked={isDone} onChange={toggleDone} /></td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>

        </Table>
        <Table>
        <tr className={isDone ? 'off' : ''}>
            <td><Input type="checkbox" checked={isDone} onChange={toggleDone} /></td>
            <td>testtt</td>
            <td>{isShow }</td>
            <td><button onClick={toggleShow}>뜻{isShow ? '숨기기' : '보기' }</button></td>
            <td><button className="del">삭제</button></td>
        </tr>   
        </Table>

    </div>
  )
}


export default ReactstrapBottons1;