import inquirer from 'inquirer';
import 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [ 
            {
                value: '1',
                name: `${ '1.'.yellow } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.yellow } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.yellow } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.yellow } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.yellow } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.yellow } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.yellow } Salir`
            },
        ]
    }
];

const inquirerMenu = async() => {
    
    console.clear();
    console.log('==============================='.green)
    console.log('   Seleccione una opción  '.white)
    console.log('===============================\n'.green)

    const { opcion } = await inquirer.prompt( preguntas );

    return opcion;

}

const pausa = async() => {

    const pause = [
        {
            type: 'input',
            name: 'continuar',
            message: `Presione ${ 'enter'.green } para continuar.`  
    
        }
    ];

    console.log('\n')
    await inquirer.prompt(pause);
    
}

const leerInput = async( message ) => {
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if ( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt( question );

    return desc

}

const listadoTareasBorrar = async( tareas = [] ) => { //Capitulo 60

    const choices = tareas.map( (tarea, index) => {
        
        const i = `${index + 1}.`.green;
         
        return {
            value: tarea.id,
            name: `${ i } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: `${ '0.'.green } ${ 'Cancelar'.grey }`
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt( preguntas );

    return id;
}

const listadoTareasCompletar = async( tareas = [] ) => { //Capitulo 61

    const choices = tareas.map( (tarea, index) => {
        
        const i = `${index + 1}.`.green;
         
        return {
            value: tarea.id,
            name: `${ i } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    }); 

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const { ids } = await inquirer.prompt( preguntas );

    return ids;
}


const confirmar = async( message ) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( pregunta );

    return ok;

}



export {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    listadoTareasCompletar,
    confirmar,
};
