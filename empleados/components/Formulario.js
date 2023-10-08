import React, { useState } from 'react'; 
import { Text, StyleSheet, View, TextInput, TouchableHighlight, Alert, ScrollView } from 'react-native'; 
import shortid from "react-id-generator"; 

const Formulario = ({ empleados, setEmpleados, guardarMostrarForm, guardarEmpleadosStorage }) => {
//variables para el formulario 
const [nombre, guardarNombre] = useState(''); 
const [apellido, guardarApellido] = useState(''); 
const [sueldo, guardarSueldo] = useState(null);
let isr=null;

//Ingresar nuevo empleado
const crearNuevoEmpleado=()=>{
    //Validacion
    if(nombre.trim() === '' || apellido.trim() === '' || sueldo === 0){
        mostrarAlerta();
        return;
       }
    // Crear empleado
if(sueldo<1000){
    isr=sueldo*0.07;
}
else if(sueldo>=1000 && sueldo<=2500){
    isr=sueldo*0.18;
}
else if(sueldo>=2500){
    isr=sueldo*0.25;
}
    const empleado = { nombre, apellido, sueldo, isr}; 
    empleado.id = shortid(); 
     // Agregar al state
    const empleadosNuevo = [...empleados, empleado]; 
    setEmpleados(empleadosNuevo);

    // Pasar los empleados a storage 
    guardarEmpleadosStorage(JSON.stringify(empleadosNuevo)); 
    // Ocultar el formulario 
    guardarMostrarForm(false); 
    // Resetear el formulario 
    guardarNombre(''); 
    guardarApellido(''); 
    guardarSueldo(null); 
}

// Muestra la alerta si falla la validación 
const mostrarAlerta = () => { 
    Alert.alert( 'Error', // Titulo 
    'Todos los campos son obligatorios', // mensaje 
        [{ 
            text: 'OK' // Arreglo de botones 
        }]
        ) 
    }
return(
    <>
        <ScrollView style={styles.formulario}>
            <View> 
                <Text style={styles.label}>Nombre del Empleado:</Text> 
                <TextInput style={styles.input} onChangeText={texto => guardarNombre(texto)}/> 
            </View>
            <View> 
                <Text style={styles.label}>Apellido del Empleado:</Text> 
                <TextInput style={styles.input} onChangeText={texto => guardarApellido(texto)}/> 
            </View>
            <View> 
                <Text style={styles.label}>Sueldo del Empleado:</Text> 
                <TextInput style={styles.input} keyboardType="numeric" onChange={cant => guardarSueldo(cant.nativeEvent.text)}/> 
            </View>
            <View> 
                <TouchableHighlight onPress={() => crearNuevoEmpleado()} style={styles.btnSubmit}> 
                    <Text style={styles.textoSubmit}>Crear Nuevo Empleado</Text> 
                </TouchableHighlight> 
            </View>
        </ScrollView>
    </>
);
}
const styles = StyleSheet.create({ 
    formulario: { 
        backgroundColor: '#FFF', 
        paddingHorizontal: 20, 
        paddingVertical: 10, flex: 1 
    }, 
    label: { 
        fontWeight: 'bold', 
        fontSize: 18, 
        marginTop: 20
    }, 
    input: {
        marginTop: 10, 
        height: 50, 
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid' 
    }, btnSubmit: { 
        padding: 10, 
        backgroundColor: '#38D430', 
        marginVertical: 10 
    }, textoSubmit: { 
        color: '#FFF', 
        fontWeight: 'bold', 
        textAlign: 'center' 
    } }) 
    
export default Formulario;