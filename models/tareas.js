import Tarea from "./tarea.js";
import 'colors';

/*
    _listado: {

        'uuid-2323-3222-3344-34: { id: 12, desc: 'aaaa', completadoEn: '' }
    }
 */
class Tareas {
    
    _listado = {  };

    get listadoArr() {//Capitulo 53
        
        const listado = [];
        
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });
        
        return listado;
        
    };



    constructor() {

        this._listado = {  };

    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            
            this._listado[tarea.id] = tarea;

        });

    }

    crearTarea( desc = '' ) {
        //Capitulo 52
        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() { //Capitulo 57

        const tareasListar = this.listadoArr;

        tareasListar.forEach( ({ id, desc, completadoEn }, index) => {
            const estado = ( completadoEn ) ? 'Completado'.green : 'Pendiente'.red
            const i = `${ index + 1 }.`.green; 
            console.log( `${ i } ${ desc } :: ${ estado }` );
        })

    }

    listarPendientesCompletadas( completadas = true ){ //Capitulo 58

        const tareasListar = this.listadoArr.filter( ({ completadoEn }) => !completadoEn !== completadas);

        tareasListar.forEach( ({ desc, completadoEn }, index) => {
            const estado = ( completadas ) ? `${ completadoEn }`.green : 'Pendiente'.red;
            const i = `${ index + 1 }.`.green; 
            console.log( `${ i } ${ desc } :: ${ estado }` );
        })

    }

    toggleCompletadas( ids = [] ) { //Capitulo 62

        ids.forEach( id => {
    
            const tarea = this._listado[id]; //Al javascript entregar los valores por referencia, el valor original tambien sufre los cambios
            
            if ( tarea.completadoEn ) return;

            tarea.completadoEn = new Date().toISOString();
            
        } )

        this.listadoArr.forEach( ({ id }) => {

            if( ids.includes( id ) ) return;
            this._listado[id].completadoEn = null;
        })


    
    }

    borrarTarea( id = '' ){

        if (!this._listado[id]) return;

        delete this._listado[id];

    }
    

}

export default Tareas;