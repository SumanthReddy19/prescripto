import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import axios from 'axios'
import {toast} from 'react-toastify'

const AddDoctor = () => {

  const [docImg,setDocImg] = useState(false)
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [experience,setExperience] = useState("1 Year")
  const [fees,setFees] = useState("")
  const [about,setAbout] = useState("")
  const [speciality,setSpeciality] = useState("General physician")
  const [degree,setDegree] = useState("")
  const [address1,setAddress1] = useState("")
  const [address2,setAddress2] = useState("")

  const {backendUrl,aToken} = useContext(AdminContext)

  const onSubmitHandler = async(e)=>{
    e.preventDefault()

    try {
      if(!docImg){
        return toast.error('Image not selected')
      }
      const formData = new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))
     
      //console log form data
      formData.forEach((value,key)=>console.log(`${key}: ${value}`))

      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})
      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setFees('')
        setDegree('')
        setAbout('')
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form className="m-5 w-full" onSubmit={onSubmitHandler}>
    <p className="mb-3 text-lg font-medium">Add Doctor</p>
    <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
      <div className="flex items-center gap-4 mb-8 text-gray-500">
        <label htmlFor="doc-img">
          <img
            className="w-16 bg-gray-100 rounded-full cursor-pointer"
            src={docImg? URL.createObjectURL(docImg) : assets.upload_area}
            alt=""
          />
        </label>
        <input type="file" name="" id="doc-img" hidden="" onChange={(e)=>setDocImg(e.target.files[0])} />
        <p>
          Upload doctor <br /> picture
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
        <div className="w-full lg:flex-1 flex flex-col gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <p>Your name</p>
            <input
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Name"
              required=""
              onChange={(e)=>setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p>Doctor Email</p>
            <input
              className="border rounded px-3 py-2"
              type="email"
              placeholder="Email"
              required=""
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p>Set Password</p>
            <input
              className="border rounded px-3 py-2"
              type="password"
              placeholder="Password"
              required=""
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p>Experience</p>
            <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="border rounded px-2 py-2">
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Years</option>
              <option value="3 Year">3 Years</option>
              <option value="4 Year">4 Years</option>
              <option value="5 Year">5 Years</option>
              <option value="6 Year">6 Years</option>
              <option value="8 Year">8 Years</option>
              <option value="9 Year">9 Years</option>
              <option value="10 Year">10 Years</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p>Fees</p>
            <input
              className="border rounded px-3 py-2"
              type="number"
              placeholder="Doctor fees"
              required=""
              onChange={(e)=>setFees(e.target.value)}
              value={fees}
            />
          </div>
        </div>
        <div className="w-full lg:flex-1 flex flex-col gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <p>Speciality</p>
            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="border rounded px-2 py-2">
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p>Degree</p>
            <input
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Degree"
              required=""
              onChange={(e)=>setDegree(e.target.value)} 
              value={degree}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p>Address</p>
            <input
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Address 1"
              required=""
              onChange={(e)=>setAddress1(e.target.value)} 
              value={address1}
            />
            <input
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Address 2"
              required=""
              onChange={(e)=>setAddress2(e.target.value)} 
              value={address2}
            />
          </div>
        </div>
      </div>
      
      <div>
        <p className="mt-4 mb-2">About Doctor</p>
        <textarea
          className="w-full px-4 pt-2 border rounded"
          rows="5"
          placeholder="write about doctor"
          onChange={(e)=>setAbout(e.target.value)} 
          value={about}
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
      >
        Add doctor
      </button>
    </div>
  </form>
  );
};

export default AddDoctor;
