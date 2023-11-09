/* eslint-disable react/prop-types */
import {useState, useEffect} from 'react'
import Error from './Error'

function Formulario({setPacientes,pacientes, paciente,setPaciente}) {

  const [nombre,setNombre]=useState('')
  const [propietario,setPropietario]=useState('')
  const [email,setEmail]=useState('')
  const [fecha,setFecha]=useState('')
  const [sintomas,setSintomas]=useState('')
  const [error,setError]=useState(false)

  useEffect(()=>{
    if(Object.keys(paciente).length>0){
      setNombre(paciente.nombre)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setPropietario(paciente.propietario)
      setSintomas(paciente.sintomas)
    }
  },[paciente])

  const generarId=()=>{
    const random=Math.random().toString(36).substring(2);
    const fecha=Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    //*validacion del formulario
    if([nombre,propietario,email,fecha, sintomas].includes('')){
      setError(true)
      return
    }

    setError(false)

    const objetoPaciente={
      nombre,
      propietario,
      email,
      fecha, 
      sintomas
    }

    
    if (paciente.id) {
      //*editando registro
      objetoPaciente.id=paciente.id
      const pacientesActualizados=pacientes.map(
        pacienteState=>pacienteState.id===paciente.id
          ?objetoPaciente
          :pacienteState
      )

      setPacientes(pacientesActualizados)
      setPaciente({})
    }else{
      //*nuevo registro
      objetoPaciente.id=generarId();
      setPacientes([...pacientes,objetoPaciente])
    }

    //*reiniciar el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold text-lg">Administralos</span>
      </p>
      <form 
      onSubmit={handleSubmit}  
      className="bg-white shadow-md rounded-lg px-5 py-10 mb-10">
        {
          error&& (
            <Error><p>Todos los campos son requeridos</p></Error>
          )
        }
        <div className="mb-5">
          <label 
              htmlFor="mascota"
              className="block text-gray-700 uppercase font-bold">Nombre Mascota
          </label>
          <input 
              id="mascota"
              type="text" 
              placeholder="Nombre de la Mascota"
              value={nombre}
              onChange={(e)=>setNombre(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label 
              htmlFor="propietario"
              className="block text-gray-700 uppercase font-bold">Nombre del Propietario
          </label>
          <input 
              id="propietario"
              type="text" 
              placeholder="Nombre del propietario"
              value={propietario}
              onChange={(e)=>setPropietario(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label 
              htmlFor="email"
              className="block text-gray-700 uppercase font-bold">Email
          </label>
          <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email del propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label 
              htmlFor="alta"
              className="block text-gray-700 uppercase font-bold">Alta
          </label>
          <input 
              id="alta"
              type="date" 
              value={fecha}
              onChange={(e)=>setFecha(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label 
              htmlFor="sintomas"
              className="block text-gray-700 uppercase font-bold">Sintomas
          </label>
          <textarea 
              value={sintomas}
              onChange={(e)=>setSintomas(e.target.value)}
              id="sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400"
          />
        </div>
        <input 
            type="submit"
            value={paciente.id?'Editar Paciente':'Agregar Paciente'}
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" 
        />
      </form>
    </div>
  )
}

export default Formulario
