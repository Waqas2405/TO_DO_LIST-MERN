import React, { useEffect } from 'react'
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { MyList } from './enquires/Table';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2/dist/sweetalert2.js'

function Enqurieslist() {

  let [enquiryview, setEnquiryView] = useState([])
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });


  let enquires = (e) => {

    e.preventDefault()

    if (formData._id) {

      axios.put(`https://to-do-list-mern-rho.vercel.app/api/website/updaterow/${formData._id}`, formData)
        .then((res) => {
          toast.success("Data Is Update");
          setFormData({ name: "", email: "", phone: "", message: "", });
          getinquire();
        })
        .catch((err) => toast.error(err.message));

    } else {
      axios.post(`https://to-do-list-mern-rho.vercel.app/api/website/insert`, formData).then((res) => {
        console.log(res.data);

        toast.success("Data Is Saved");
        getinquire();
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      })
    }

  };

  let getvlaue = (e) => {

    let inputname = e.target.name
    let inputvalue = e.target.value

    let oldData = { ...formData }

    oldData[inputname] = inputvalue;
    setFormData(oldData);
  };


  let getinquire = () => {
    axios.get(`https://to-do-list-mern-rho.vercel.app/api/website/veiw`)
      .then((res) => {
        return res.data
      }).then((finalData) => {
        if (finalData.status) {
          setEnquiryView(finalData.enquireList);
        }
      }).catch((err) => {
        console.log("Fetch error:", err.message);
      });

  }
  useEffect(() => {
    getinquire();
  }, [])


  return (
    <div className='min-h-screen bg-gray-100 pb-10'>
      <ToastContainer />

      {/* Header */}
      <div className='bg-gray-800 shadow-md'>
        <h1 className='text-[34px] text-center py-6 font-semibold tracking-wide text-gray-100'>
          Enquiries
        </h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[30%_auto] gap-6 px-4 lg:px-6 mt-8'>

        {/* Form card */}
        <div className='bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden h-fit'>
          <div className='bg-gray-700 py-3'>
            <h1 className='text-[18px] font-semibold text-center text-gray-100'>
              {formData._id ? 'Edit Enquiry' : 'Enquiries Form'}
            </h1>
          </div>

          <form className="flex flex-col gap-4 p-5" onSubmit={enquires}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your Name" className='text-gray-700 font-medium'>Name</Label>
              </div>
              <TextInput name="name" value={formData.name} onChange={getvlaue} type="text" placeholder="Enter yours name" required />
            </div>
            <div>
              <div className="mb-2 block" >
                <Label htmlFor="email" value="Your Email" className='text-gray-700 font-medium'>Your Email</Label>
              </div>
              <TextInput name="email" value={formData.email} onChange={getvlaue} type="text" placeholder="Enter yours email" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Phone Number" className='text-gray-700 font-medium'>Your phone number</Label>
              </div>
              <TextInput name="phone" value={formData.phone} onChange={getvlaue} type="text" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="message" value="Write Your Message" className='text-gray-700 font-medium'>Message</Label>
              </div>
              <Textarea name="message" value={formData.message} onChange={getvlaue} type="text" rows={4} required />
            </div>
            <Button
              type="submit"
              color="gray"
              className='!bg-gray-700 hover:!bg-gray-800 !text-white shadow-sm transition-colors'
            >
              {formData._id ? 'Update' : 'Save'}
            </Button>
          </form>
        </div>

        {/* List card */}
        <div className='bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden'>
          <div className='bg-gray-700 py-3'>
            <h1 className='text-[18px] font-semibold text-center text-gray-100'>Enquiries List</h1>
          </div>

          <div className='p-4 overflow-x-auto'>
            <MyList data={enquiryview} enq={getinquire} Swal={Swal} setFormData={setFormData} />
          </div>
        </div>

      </div>
    </div>

  )
}

export default Enqurieslist
