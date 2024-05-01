import React, { useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";


function Places() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtrInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-2">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-sm text-gray-500">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(e) {

    e.preventDefault();
    const {data: filename} = await axios.post('/upload-by-link', {link: photoLink});
    setAddedPhotos(prev => {
      return [...prev, filename];
    })

    setPhotoLink('')

  }

  function uploadPhotoFromComp (ev) {
    const files = ev.target.files;
    const data = new FormData();
    for  (let i=0; i<files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload', data, {
      headers: {'Content-Type': 'multipart/form-data'}
    }).then(response => {
      const {data: filenames} = response;
      setAddedPhotos(prev => {
        return [...prev, ...filenames ];
      });
    })
  }

  const { action } = useParams();

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-primary text-white rounded-full py-2 px-4 inline-flex items-center justify-center gap-1"
            to={"/account/places/new"}
          >
            <GoPlus />
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form>
            {preInput(
              "Title",
              "Title for your place, should be short and catchy as in advertisement"
            )}
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              placeholder="Title, Example: My Lovely Appartment"
            />

            {preInput("Address", "Address to this place")}
            <input 
              value={address}
              onChange={(e)=> setAddress(e.target.value)}
              type="text" 
              placeholder="Address" 
            />

            {preInput("Photos", "Add Photos")}
            <div className="flex gap-2">
              <input
                value={photoLink}
                onChange={(e)=>setPhotoLink(e.target.value)} 
                type="text" 
                placeholder={"Add using a link ....jpg"} 
              />
              <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;photo
              </button>
            </div>
            <div className="mt-2 grid gap-x-1 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {
                addedPhotos.length > 0 && addedPhotos.map(link => {
                  return (
                    <div key = {link} className="h-32 flex" >
                    <img className="rounded-2xl  w-full object-cover" src={'http://localhost:4000/uploads/'+link} alt="Error loading image..." />
                  </div>
                )})
              }
              <label className="h-32 flex items-center justify-center gap-1 border rounded-2xl text-gray-600 bg-transparent text-xl cursor-pointer">
              <input type="file" multiple className="hidden" onChange={uploadPhotoFromComp} />
              <BiCloudUpload className="w-7 h-7" />
                Uplaod...
              </label>
            </div>

            {preInput("Description", "description of the place")}
            <textarea 
              value={description} 
              onChange={(e)=>setDescription(e.target.value)} 
            />

            {preInput("Perks", "Select all the perks of your place")}
            <Perks selected={perks} onChange={setPerks}/>

            {preInput(
              "Extra Info",
              "Provide some extra info like house rules, etc"
            )}
            <textarea 
              value={extraInfo} 
              onChange={(e)=>setExtrInfo(e.target.value)} 
            />

            {preInput("Checkin and Checkout time", "Add check in and out time")}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input  
                  value={checkIn} 
                  onChange={(e)=>setCheckIn(e.target.value)} 
                  type="text" 
                  placeholder="14:00" 
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input 
                  value={checkOut} 
                  onChange={(e)=>setCheckOut(e.target.value)} 
                  type="text" 
                  placeholder="14:00" 
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input 
                  type="number" 
                  value={maxGuests} 
                  onChange={(e)=>setMaxGuests(e.target.value)} 
                />
              </div>
            </div>
            <button className="btn my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Places;
