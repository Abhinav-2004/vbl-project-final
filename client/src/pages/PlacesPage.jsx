import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";
export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedphotos, setAddedphotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extrainfo, setExtrainfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxguests, setMaxguests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-xl mt-4">{text}</h2>;
  }
  function preInput(header) {
    return <>{inputHeader(header)}</>;
  }
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: fileName } = await axios.post("/upload_by_link", {
      link: photoLink,
    });
    setAddedphotos((prev) => {
      return [...prev, fileName];
    });
    setPhotoLink("");
  }
  function uploadPhoto(ev){
    const files = ev.target.files;
    const data = new FormData();
    for(let i=0;i<files.length;i++){
      data.append('photos', files[i]); 
    }
    axios.post('/upload', data,{
      headers:{"Content-Type":"multipart/form-data"}
    }).then(response=>{
      const {data:fileNames}=response;
      setAddedphotos((prev) => {
        return [...prev, ...fileNames];
      });
    })

  }
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <div>
            <Link
              className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full"
              to={"/account/place/new"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add new Place
            </Link>
          </div>
        </div>
      )}
      {action === "new" && (
        <div className="">
          <form>
            {preInput("Title")}
            <input
              type="text"
              title="for example: My lovely appartment"
              placeholder="title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            {preInput("Address")}
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />
            {preInput("Photos")}

            <div className="flex gap-2">
              <input
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                type="text"
                placeholder={"Add using Link..."}
              />
              <button
                onClick={addPhotoByLink}
                className="bg-gray-200 grow px-4 gap-2 rounded-2xl"
              >
                Add Photo
              </button>
            </div>

            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedphotos.length > 0 &&
                addedphotos.map((link) => (
                  <div className="h-32 flex">
                    <img
                      className="rounded-2xl w-full object-cover"
                      src={"http://localhost:4000/uploads/" + link}
                    />
                  </div>
                ))}
              <label className="h-32 cursor-pointer flex gap-4 items-center justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-500">
                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
                UPLOAD
              </label>
            </div>
            {preInput("Description")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            {preInput("Perks")}
            <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            <h2 className="text-xl mt-4">Extra Info</h2>
            <textarea
              value={extrainfo}
              onChange={(ev) => setExtrainfo(ev.target.value)}
            />
            {preInput("Check In & Check Out, Max Guests")}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-2">Check In Time</h3>
                <input
                  type="text"
                  placeholder="14"
                  value={checkin}
                  onChange={(ev) => setCheckin(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-2">Check Out Time</h3>
                <input
                  type="text"
                  placeholder="11"
                  value={checkout}
                  onChange={(ev) => setCheckout(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-2">Max Guests</h3>
                <input
                  type="number"
                  value={maxguests}
                  onChange={(ev) => setMaxguests(ev.target.value)}
                />
              </div>
            </div>
            <div className=" my-4">
              <button className="primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
