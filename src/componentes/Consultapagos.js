import React, { useEffect } from 'react'
//import '../estilos/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Consultapagos() {
    const [listaPagos, setListaPagos] = React.useState([]);
    const [busqueda, setBusqueda] = React.useState("");

    let ipbackend = "http://10.0.28.60:9100/";

        function getPagos(){
            fetch(ipbackend+'pagos2')
                .then(response => response.json())
                .then(data => setListaPagos(data))
                console.log(listaPagos[0]);
        }
    //Funcion de Busqueda
    const searcher = (e) =>{
        setBusqueda(e.target.value);
    }
    
    //Funcion de Filtrado
     //const results = !busqueda ? listaPagos : listaPagos.filter((dato)=> dato.cliente_dnicliente.toLowerCase().includes(busqueda.toLocaleLowerCase()))

     const newfilter = listaPagos.filter(dato => {
        return (
    dato.cliente_dnicliente.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||
    dato.apellidocli.toLowerCase().includes(busqueda.toLocaleLowerCase())
    )
    });
    let results = [];
    if (busqueda === "") {
        results = listaPagos;
    } else {
        results = newfilter;
    }


     useEffect(() =>{   
        getPagos()
    }, []) 

    
    

    return(
        <div className='App'>
            <input value={busqueda} onChange={searcher} type='text' placeholder='Busqueda por DNI o Apellidos' className='form-control'/>
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                    <thead>
                        <tr className='bg-curso text-white'>
                            <th>DNI</th>
                            <th>Apellidos</th>
                            <th>Nombres</th>
                            <th>Fecha_pago</th>
                            <th>Monto</th>
                            <th>Mes_Facturado</th>
                            <th>Año</th>
                        </tr>
                    </thead>
                    <tbody>
                    {results.map((pagos, key)=>(
                            <tr>
                                <td>{pagos.cliente_dnicliente}</td>
                                <td>{pagos.apellidocli}</td>
                                <td>{pagos.nombrecli}</td>
                                <td>{pagos.fechapago}</td>
                                <td>{pagos.montopago}</td>
                                <td>{pagos.mespago}</td>
                                <td>{pagos.anio}</td>
                            </tr>
                    ))}
                    </tbody>
            </table>
        </div>
    )

}
export default Consultapagos;
