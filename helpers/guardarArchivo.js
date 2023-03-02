import fs from 'fs'

const nombreArchivo = './db/data.json';

const guardarDB = ( data ) => {

    fs.writeFileSync( nombreArchivo, JSON.stringify(data) );

}

const leerDB = () => { //Capitulo 55

    if ( !fs.existsSync( nombreArchivo ) ) return null;

    const info = fs.readFileSync( nombreArchivo, { encoding: 'utf-8' } );

    const data = JSON.parse( info );

    return data;

}

export {
    guardarDB,
    leerDB
};