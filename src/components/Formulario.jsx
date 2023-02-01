//Importación de liberías requeridas
import { useState } from "react"
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

//Importación de base de colaboradores
import { BaseColaboradores } from "../BaseColaboradores"

const Formulario = () => {

    //Definición de constantes de títulos 

    const titulo ="Buscador de Colaboradores";
    
    //Definición de estados (hooks)
    const [buscarTarea, setBuscarTarea] = useState("")
    const [nombreTarea, setNombreTarea] = useState("")
    const [emailTarea, setEmailTarea] = useState("")
    let [listaTareas, setListaTareas] = useState(BaseColaboradores)
    const [mostrar, setMostrar] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");

    // Función al enviar el formulario
    const enviarFormulario = (e) => {
        e.preventDefault()

        //En caso de que el nombre y el email estén vacíos no almacenar
        if (nombreTarea === "" || emailTarea === "") {
            //console.log(nombreTarea, emailTarea);
            setMostrar(true)
            setAlertType("danger");
            setAlertMessage("No dejar espacios en blanco.");
            //Limpiar los input de datos ya procesados.
            setNombreTarea(""); 
            setEmailTarea("");
            return false;
        }

        //Si la base está vacía, agregar datos como primer objeto con id 1
        if (listaTareas.length === 0) {
            setListaTareas([...listaTareas, {
                id: "1",
                nombre: nombreTarea,
                correo: emailTarea
            }])
            //console.log(listaTareas);
            setMostrar(true)
            setAlertType("primary");
            setAlertMessage("Datos ingresados correctamente.");
            //Limpiar los input de datos ya procesados.
            setNombreTarea(""); 
            setEmailTarea("");
            return true;
        }
        else {

            //Ordenar por id y obtener el último id, para generar el nuevo objeto con id+1  
            setBuscarTarea("");
            listaTareas = listaTareas.sort((a, b) => a.id - b.id);
            let ultimo = listaTareas[listaTareas.length - 1]
            let id_ultimo = Number(ultimo.id) + 1;
            let id_str = id_ultimo.toString();
            //console.log(id_str);
            setListaTareas([...listaTareas, {
                id: id_str,
                nombre: nombreTarea,
                correo: emailTarea
            }])
            //console.log(listaTareas);
            setMostrar(true)
            setAlertType("primary");
            setAlertMessage("Datos ingresados correctamente.");
            //Limpiar los input de datos ya procesados.
            setNombreTarea(""); 
            setEmailTarea("");
            return true;
        }
    }
    //Función para capturar los datos desde el input de nombre
    const capturaNombre = (e) => {
        setNombreTarea(e.target.value)
    }
    //Función para capturar los datos desde el input de email
    const capturaEmail = (e) => {
        setEmailTarea(e.target.value)
    }
    //Función para capturar los datos desde el input de buscador
    const capturaBuscar = (e) => {
        setBuscarTarea(e.target.value)
        setMostrar(false)
        setAlertType("");
        setAlertMessage("");
    }
    //Función para eliminar objeto de la lista de datos por id
    const eliminarTarea = (el) => {
        const listaFiltrada = listaTareas.filter((tarea) => el.id !== tarea.id)
        setListaTareas(listaFiltrada)
        setMostrar(true)
        setAlertType("warning");
        setAlertMessage("Datos borrados correctamente. ");
        //Limpiar los input de datos ya procesados.
        setNombreTarea(""); 
        setEmailTarea("");

    }
    //Función para obtener listado de datos filtrados desde el input llamado buscador. 
    const filtrados = listaTareas.filter((tarea) => {

        //Transforma los strings a mayúsculas para realizar la búsqueda (para evitar errores)
        if (tarea.nombre.toUpperCase().includes(buscarTarea.toUpperCase())) {
            return true;
        }
        return false;
    });

    //Función que se utiliza para activar el botón de submit en caso de que el nombre y el email no sean vacíos
    const activarBoton = () => {
        if (nombreTarea !== "" && emailTarea !== "") {
            return (
                <div className="d-flex align-items-center">
                <button className="btn btn-primary m-3">Agregar colaborador</button><p className="muteado text-muted  mt-3">Botón activado</p>
                </div>
            )
        }
        else{
            return (
                <div className="d-flex align-items-center">
                <button className="btn btn-danger m-3" disabled>Desactivado</button><p className="muteado text-muted  mt-3">Ingresar datos para activar</p>
                </div>
            )
            
        }
    }
    //Función que imprime filas de datos en una tabla
    const ImprimirListado=(lista) => {
        const listado=lista.map((tarea, index) =>
            <tr key={index}>
                <td>{tarea.nombre} </td>
                <td> {tarea.correo} </td>
                <td><button className="btn btn-danger" onClick={() => eliminarTarea(tarea)}> Borrar</button></td>
            </tr>
            )
        return listado;   
    }
    
    return (
        <div className="w-100">
            <div className="w-100 bg-dark d-flex justify-content-between p-2">
                <p className="textoHeader text-light">{titulo}</p>
                <form onSubmit={enviarFormulario}>
                    <input className="buscador" id="buscador" name="buscador" value={buscarTarea} onChange={capturaBuscar} placeholder="Buscar colaboradores"/>
                </form>

            </div>
            <Alert className='m-2' show={mostrar} variant={alertType}>
                {alertMessage}
            </Alert>

            <form onSubmit={enviarFormulario}>
                <label htmlFor="nombre" className="labelColaborador form-control-lg">Nombre del colaborador:</label>
                <input name="nombre" id="nombre" className="form-control" value={nombreTarea} onChange={capturaNombre} placeholder="Ingrese el nombre del colaborador"/>
                <label htmlFor="email" className="labelColaborador form-control-lg">Correo del colaborador:</label>
                <input name="email" id="email" className="form-control" value={emailTarea} onChange={capturaEmail} placeholder="Ingrese correo del colaborador"/>
                {activarBoton()}
            </form>
            <hr />
            <h1>Listado de colaboradores</h1>
            <table className="table table-striped table-bordered table-hover">
                <tbody>
                    <tr className="bg-dark"><th className="text-light" scope="col">Nombre</th ><th className="text-light" scope="col">Email</th><th className="text-light" scope="col">Borrar</th></tr>
                    {(buscarTarea === "") ? ImprimirListado(listaTareas) : ImprimirListado(filtrados)}
                </tbody>
            </table>
            <div className='p-2 text-center'>
                    <a href><Badge bg="secondary p-2"></Badge></a>
            </div>
        </div>
    )
}
export default Formulario;