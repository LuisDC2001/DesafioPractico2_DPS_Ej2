import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,FlatList, TouchableHighlight, TouchableWithoutFeedback,Keyboard,Platform } from 'react-native';
import Empleado from './components/Empleados';
import Formulario from './components/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [empleados, setEmpleados]=useState([]);
  const [mostrarform, guardarMostrarForm]=useState(false);

  useEffect(()=>{
    const obtenerEmpleadosStorage=async()=>{
      try{
        const empleadosStorage=await AsyncStorage.getItem('empleados');
        if(empleadosStorage){
          setEmpleados(JSON.parse(empleadosStorage))
        }
      }catch(error){
        console.log(error);
      }
    }
    obtenerEmpleadosStorage();
  },[]);

  //Elimina los empleados del state
  const eliminarEmpleado=id=>{
    const empleadosFiltrados=empleados.filter(empleado=>empleado.id !== id);
    setEmpleados(empleadosFiltrados);
    guardarEmpleadosStorage(JSON.stringify(empleadosFiltrados));
  }

  //Muestra u oculta el formulario
  const mostrarFormulario=()=>{
    guardarMostrarForm(!mostrarform);
  }

  // Ocultar el teclado 
  const cerrarTeclado = () => { 
    Keyboard.dismiss(); 
  }

  // Almacenar las citas en storage 
  const guardarEmpleadosStorage = async (empleadosJSON) => { 
    try { 
      await AsyncStorage.setItem('empleados', empleadosJSON); 
    } 
    catch (error) { 
      console.log(error); 
    } 
  }
  return (
    <TouchableWithoutFeedback onPress={()=>cerrarTeclado()}>
      <View style={styles.contenedor}> 
        <Text style={styles.titulo}>Lista de empleados</Text>
        <View>
          <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}> {mostrarform ? 'Cancelar Ingresar Empleado' : 'Ingresar Nuevo Empleado'} </Text>
          </TouchableHighlight> 
        </View>
        <View style={styles.contenido}> 
          {mostrarform ? ( 
            <> 
              <Text style={styles.titulo}>Ingresar Nuevo Empleado</Text> 
              <Formulario 
              empleados={empleados} 
              setEmpleados={setEmpleados} 
              guardarMostrarForm={guardarMostrarForm} 
              guardarEmpleadosStorage={guardarEmpleadosStorage} 
              /> 
            </> 
            ) : ( 
            <>
              <Text style={styles.titulo}> {empleados.length > 0 ? 'Administrar empleados' : 'No hay registros, Agregue uno'} </Text> 
              <FlatList style={styles.listado} 
              data={empleados} 
              renderItem={({ item }) => <Empleado item={item} eliminarEmpleado={eliminarEmpleado} />} 
              keyExtractor={empleado => empleado.id} 
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: { 
    backgroundColor: '#66ABC1', 
    flex: 1 
  }, 
  titulo: { 
    color: '#FFF', 
    marginTop: Platform.OS === 'ios' ? 40 : 20, 
    marginBottom: 20, 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  }, 
  contenido: { 
    flex: 1, 
    marginHorizontal: '2.5%', 
  }, 
  listado: { 
    flex: 1, 
  }, 
  btnMostrarForm: { 
    padding: 10, 
    backgroundColor:'#E56156', 
    marginVertical: 10 
  },
  textoMostrarForm: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    textAlign: 'center'
   }
});

