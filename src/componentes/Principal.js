import React, { useEffect, useState } from 'react'
import Axios from "axios";
//import '../estilos/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

function Principal() {

//FUNCION PARA OBTENER FECHA ACTUAL
let fechaactual = "";
let fecha = new Date();
let dia = fecha.getDate();
let mes = (fecha.getMonth())+1;
let anioactual = fecha.getFullYear();
fechaactual = anioactual + "-" + mes + "-" + dia;

    const [listaClientes, setListaClientes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [listaPagos, setListaPagos] = useState([]);

    //Datos para el Modal
    const [num_contrato, setNum_contrato] = useState();
    const [dnicli, setDnicli] = useState();
    const [nombrecli, setNombrecli] = useState();
    const [apellidocli, setApellidocli] = useState();
    const [direccioncli, setDireccioncli] = useState();
    const [distritocli, setDistritocli] = useState();
    const [telefonocli, setTelefonocli] = useState();
    const [nombreplan, setNombreplan] = useState();
    const [fechacontrato, setFechacontrato] = useState();
    const [precioplan, setPrecioplan] = useState();
    const [velocidadplan, setVelocidadplan] = useState();
    const [diapago, setDiapago] = useState();
    const [nombrecaja, setNombrecaja] = useState();
    const [localizacion, setLocalizacion] = useState();
    const [fecha_instalacion, setFecha_instalacion] = useState();
    const [ubicacioninstalacion, setUbicacioninstalacion] = useState();

    // const [idpago, setIdpago] = useState();
    // const [contrato, setContrato] = useState();
    const [montopago, setMontopago] = useState(0);
    const [fechapago, setFechapago] = useState(fechaactual);
    const [mespago, setMespago] = useState(mes);
    const [anio, setAnio] = useState(anioactual);
    const [mediopago, setMediopago] = useState();
    const [observacion, setObservacion] = useState();

    const [modalMostrar, setModalMostrar] = React.useState(false);
    const [modalPagos, setModalPagos] = React.useState(false);
    const [modalPagar, setModalPagar] = React.useState(false);

    //Datos para el modal de pagos
    const [verPagos, setVerPagos] = useState(false);
    const [results2, setResults2] = useState([]);
    
    let ipbackend = "http://192.168.18.8:9100/";
    let token = sessionStorage.getItem("token");

    const ventanaModal = () => setModalMostrar(!modalMostrar);
    const ventanaModal2 = () => setModalPagos(!modalPagos);
    const ventanaModal3 = () => setModalPagar(!modalPagar);

    function getPagos(){
        fetch(ipbackend+'pagos')
            .then(response => response.json())
            .then(data => setListaPagos(data))    
    }

    function getClientes(){
        fetch(ipbackend+'todolist')
            .then(response => response.json())
            .then(data => setListaClientes(data))
    }

    const mostrarCliente=()=>{
        ventanaModal();
    }
    const mostrarPagos=()=>{
        ventanaModal2();
    }
    const Registrarpago=()=>{
        ventanaModal3();
    }
    const addpagos = () => {
        Axios.post(ipbackend+"pago", {
            num_contrato: num_contrato,
            montopago: montopago,
            fechapago: fechapago,
            mespago: mespago,
            anio: anio,
            mediopago: mediopago,
            observacion: observacion,
        },{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(() => {
            limpiarcampos();
            getPagos();
            ventanaModal3();
            alert("Pago Registrado con exito");
            ventanaModal2();
        }).catch((error) => {
            console.log(error.response.status)
          if (401 === error.response.status){
            limpiarcampos();
          sessionStorage.removeItem("token");
          window.location.reload();
          alert("Sesión expirada, vuelva a iniciar sesión");
          }
          return error;
          });
      };
    const capturarID = (cliente) => {
        setNum_contrato(cliente.num_contrato);
        setDnicli(cliente.dnicliente);
        setNombrecli(cliente.nombrecli);
        setApellidocli(cliente.apellidocli);
        setDiapago(cliente.diapago);
        setDireccioncli(cliente.direccioncli);
        setDistritocli(cliente.distritocli);
        setLocalizacion(cliente.localizacion);
        setNombrecaja(cliente.nombrecaja);
        setNombreplan(cliente.nombreplan);
        setFechacontrato(cliente.fecha_contrato);
        setTelefonocli(cliente.telefonocli);
        setVelocidadplan(cliente.velocidadplan);
        setPrecioplan(cliente.precioplan);
        setFecha_instalacion(cliente.fecha_instalacion);
        setUbicacioninstalacion(cliente.ubicacioninstalacion);

        mostrarCliente();
    }
    const capturarIDpago = (cliente) =>{
        setNum_contrato(cliente.num_contrato);
        setDnicli(cliente.dnicliente);
        setNombrecli(cliente.nombrecli);
        setApellidocli(cliente.apellidocli);
        setDiapago(cliente.diapago);
        setNombreplan(cliente.nombreplan);
        setVerPagos(false);
        mostrarPagos();   
    }
    const Verpagos = ()=> {
        console.log("contrato seleccionado es: "+num_contrato)
        let results3 = listaPagos.filter(function(cli) {
            return cli.num_contrato == num_contrato;
          });
        setResults2(results3);
        setVerPagos(true);
        }

        const limpiarcampos = ()=>{
            setMontopago(0);
            setFechapago(fechaactual);
            setMespago(mes);
            setAnio(anioactual);
            setMediopago("");
            setObservacion("");
          }
       
    //Funcion de Busqueda
    const searcher = (e) =>{
        setBusqueda(e.target.value);
        }
    //Funcion de Filtrado
     const newfilter = listaClientes.filter(dato => {
        return (
    dato.dnicliente.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||
    dato.apellidocli.toLowerCase().includes(busqueda.toLocaleLowerCase())
    )
    });

    let results = [];
    
    if (busqueda === "") {
        results = listaClientes;
    } else {
        results = newfilter;
    }

    useEffect(() =>{
        getClientes()
        getPagos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="App">
            <input value={busqueda} onChange={searcher} type='text' placeholder='Busqueda por DNI o por Apellidos' className='form-control'/>
              <table className='table table-striped table-hover mt-5 shadow-lg'>
                    <thead>
                        <tr className='bg-curso text-white'>
                            <th>DNI</th>
                            <th>N° Contrato</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Direccion</th>
                            <th>Distrito</th>
                            <th>Instalacion</th>
                            <th>Plan</th>
                            
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {results.map((cliente, key)=>(
                            <tr key={cliente.num_contrato} value={num_contrato}>
                                <td>{cliente.dnicliente}</td>
                                <td>{cliente.num_contrato}</td>
                                <td>{cliente.nombrecli}</td>
                                <td>{cliente.apellidocli}</td>
                                <td>{cliente.direccioncli}</td>
                                <td>{cliente.distritocli}</td>
                                <td>{cliente.instalacion}</td>
                                <td>{cliente.nombreplan}</td>
                                <td><button type="button" className="btn btn-outline-success" 
                                onClick={()=>{capturarID(cliente);
                                }}>Detalles</button></td>
                                <td><button type='button' className='btn btn-outline-success'
                                onClick={()=>{capturarIDpago(cliente);
                                }}>Pagos</button></td>
                            </tr>
                    ))}
                    </tbody>
            </table>

            <Modal isOpen={modalMostrar} toggle={ventanaModal}>
                <ModalBody>
                <div className='container'>
                    <h3 className=''>Detalle del Contrato</h3>
                    <div className='row mb-2'>
                        <div className='col-4'>DNI Cliente:</div>
                        <div className='col-6'>{dnicli}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Nombre Cliente:</div>
                        <div className="col-6">{nombrecli}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Apellido Cliente:</div>
                        <div className="col-6">{apellidocli}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Telefono Cliente:</div>
                        <div className="col-6">{telefonocli}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Direccion Cliente:</div>
                        <div className="col-6">{direccioncli}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Distrito:</div>
                        <div className="col-6">{distritocli}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Plan:</div>
                        <div className="col-6">{nombreplan}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Fecha Contrato:</div>
                        <div className="col-6">{fechacontrato}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Dia Pago:</div>
                        <div className="col-6">{diapago}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Precio Plan:</div>
                        <div className="col-6">{precioplan}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Velocidad Plan:</div>
                        <div className="col-6">{velocidadplan}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Nombre Caja:</div>
                        <div className="col-6">{nombrecaja}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Ubicacion Caja:</div>
                        <div className="col-6"><Link to={localizacion} target='_blank'>{localizacion}</Link></div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Ubicacion Vivienda:</div>
                        <div className="col-6"><Link to={ubicacioninstalacion} target='_blank'>{ubicacioninstalacion}</Link></div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Fecha Instalacion:</div>
                        <div className="col-6">{fecha_instalacion}</div>
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-danger' onClick={ventanaModal}>Cerrar</button>
                </ModalFooter>
            </Modal>

            {/* MODAL PARA MOSTRAR LOS PAGOS DEL CLIENTE
                         */}
            <Modal isOpen={modalPagos} toggle={ventanaModal2}>
                <ModalBody>
                <div className='container'>
                    <h3 className=''>Detalle de Pagos del Cliente</h3>
                    <div className='row mb-2'>
                        <div className='col-4'>DNI Cliente:</div>
                        <div className='col-6'>{dnicli}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Contrato:</div>
                        <div className='col-6'>{num_contrato}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Cliente:</div>
                        <div className="col-6">{nombrecli+" "+apellidocli}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Dia pago:</div>
                        <div className='col-6'>{diapago}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-4'>Nombre Plan:</div>
                        <div className='col-6'>{nombreplan}</div>
                    </div>

                    <button onClick={Verpagos} className='btn btn-outline-success'>Ver Pagos</button>
                    <button onClick={Registrarpago} className='btn btn-outline-success'>Registrar Pago</button>
                    <div>
                    {
                        verPagos ? 
                            <table className='table table-hover mt-5 shadow-lg'>
                                <thead>
                                    <tr className='bg-curso text-white'>
                                        <th>Fecha_Pago</th>
                                        <th>Monto Pagado</th>
                                        <th>Medio pago</th>
                                        <th>Mes Facturado</th>
                                        <th>Obs</th>    
                                    </tr>
                                </thead>
                                <tbody>
                                {results2.map((pagos, key)=>(
                                        <tr key={pagos.idpago}>
                                            <td>{pagos.fechapago}</td>
                                            <td>{pagos.montopago}</td>
                                            <td>{pagos.mediopago}</td>
                                            <td>{pagos.mespago}</td>
                                            <td>{pagos.observacionpago}</td>
                                        </tr>
                                ))}
                                </tbody>
                            </table>
                        :null
                    }
                    
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-danger' onClick={ventanaModal2}>Cerrar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalPagar} toggle={ventanaModal3}>
                <ModalBody>
                <div className='from-group'>
                <h4 className=''>Registrar pago:</h4>
                <div className='mb-3'>
                        <label for='contrato' className="form-label">DNI Cliente:</label>
                        <span className='form-control'>{dnicli}</span>
                        <label for='contrato' className="form-label">Número de contrato:</label>
                        <span className='form-control'>{num_contrato}</span>
                        <label for='contrato' className="form-label">Nombres y Apellidos:</label>
                        <span className='form-control'>{nombrecli+" "+apellidocli}</span>
                </div>
                <div className="mb-3">
                        <label for='descplan' className="form-label">
                          Monto Pagado:
                        </label>
                        <input type="text" value={montopago}
                          onChange={(event) => { setMontopago(event.target.value); }}
                          className="form-control" id="descplan" placeholder="Ingrese monto pagado" aria-describedby="basic-addon1"
                        ></input>
                </div>
                <div className="mb-3">
                        <label for='fechapago' className="form-label">
                          Fecha Pago:
                        </label>
                        <input type="text" value={fechapago}
                          onChange={(event) => { setFechapago(event.target.value); }}
                          className="form-control" id="fechapago" aria-describedby="basic-addon1"
                        ></input>
                </div>
                <div className="mb-3">
                        <label for='mesfacturado' className="form-label">
                          Mes Facturado:
                        </label>
                        <select value={mespago}
                            onChange={(event) => { setMespago(event.target.value); }}
                            className="form-select" aria-describedby="basic-addon1"
                            >
                            <option>1</option><option>2</option><option>3</option>
                            <option>4</option><option>5</option><option>6</option>
                            <option>7</option><option>8</option><option>9</option>
                            <option>10</option><option>11</option><option>12</option>
                        </select>
                </div>
                <div className="mb-3">
                          <label for='estado' className="form-label">
                            Año:
                          </label>
                          <input type="text" value={anio}
                          onChange={(event) => { setAnio(event.target.value); }}
                          className="form-control" id="año facturado" placeholder="Ingrese mes facturado" aria-describedby="basic-addon1"
                        ></input>
                </div>
                <div className="mb-3">
                          <label for='mediopago' className="form-label">
                            Medio Pago:
                          </label>
                          <input type="text" value={mediopago}
                          onChange={(event) => { setMediopago(event.target.value); }}
                          className="form-control" id="Medio de pago" placeholder="Ingrese medio de pago" aria-describedby="basic-addon1"
                        ></input>
                </div>
                <div className="mb-3">
                          <label for='observaciones' className="form-label">
                            Obervaciones:
                          </label>
                          <input type="text" value={observacion}
                          onChange={(event) => { setObservacion(event.target.value); }}
                          className="form-control" id="observaciones" placeholder="Observaciones" aria-describedby="basic-addon1"
                        ></input>
                </div>
                </div>
                </ModalBody>
                <ModalFooter>
                        <button className="btn btn-success" onClick={addpagos}>Registrar</button>
                        <button className='btn btn-danger' onClick={ventanaModal3}>Cerrar</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default Principal;