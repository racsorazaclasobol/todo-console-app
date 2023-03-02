import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoTareasCompletar } from './helpers/inquirer.js';
import Tareas from './models/tareas.js';

const main = async() => {

    let opt = '';

    const tareas = new Tareas();
    const tareasDB = leerDB();

    if ( tareasDB ) tareas.cargarTareasFromArray( tareasDB ); //Cargar tareas de la DB

    do {
        //* Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //Crear tarea
                const desc = await leerInput('Ingrese su tarea:');
                tareas.crearTarea( desc )
                break;

            case '2':
                //Listar tareas
                tareas.listadoCompleto();
                break;
            case '3':
                //Listar completadas
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                //Listar Pendientes
                tareas.listarPendientesCompletadas( false );
                break;            
            case '5':
                //Listar tareas a completar
                const ids = await listadoTareasCompletar( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                
                break;
            case '6':
                //Listar a borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id === '0' ) break;
                const ok = await confirmar('¿Está seguro?');
                if( !ok ) break;
                tareas.borrarTarea( id );
                console.log("Tarea borrada.")
                break;
            
        }

        guardarDB( tareas.listadoArr );

        if ( opt !== '0' ) await pausa();
            
    } while ( opt !== '0' );

}

main();












/* MANERA MANUAL DE HACERLA */
/*
const { mostrarMenu, pausa } = require('./helpers/mensajes');

let opt = '';

const main = async() => {

    do {
    
        opt = await mostrarMenu();
    
        if( opt !== '0' ) await pausa();
        
    } while ( opt !== '0' );
    

}




*/