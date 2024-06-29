import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { CiInstagram } from 'react-icons/ci'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaCircle, FaPhoneVolume } from 'react-icons/fa6'
import { MdOutlineMail } from 'react-icons/md'

function Contactpage() {
    return (
        <div className='surface-0'>
            <div className='container'>
                <div className=" flex h-screen sm:flex-row flex-col sm:">
                 <div className=" h-70 p-5" style={{ background: '#C4C4C4' }}>
                     <div className='mt-4 ms-4'>
                         <h3 className='text-white'>Contact Information</h3>
                     </div>
                     <div className='mt-8 ms-1 text-white'>
                         <div className='mt-5'>
                             <label htmlFor="phone" className='flex align-items-center gap-2'><FaPhoneVolume />08XXXXXXXXXX</label>
                         </div>
                         <div className='mt-5'>
                             <label htmlFor="email" className='flex align-items-center gap-2'><MdOutlineMail />godongmenu@gmail.com</label>
                         </div>
                         <div className='mt-5'>
                             <label htmlFor="address" className='flex align-items-center gap-2'><FaMapMarkerAlt />Address</label>
                         </div>
                         <div className='mt-5'>
                             <label htmlFor="instagram" className='flex align-items-center gap-2'><CiInstagram />Instagram</label>
                         </div>

                     </div>

                 </div>
                 <div className="col-7 p-6">
                     <div className='flex justify-content-text-center align-items-center h-full'>
                         <div className='w-full flex-row'>
                             <label htmlFor="messages" className='mb-2' style={{ color: '#8D8D8D' }}>Messages</label>
                             <InputText id="email" type="text" placeholder="Write Your Messages" className="w-full mb-3 border-b" />
                             <div className='flex justify-content-end '>
                                 <Button label="Send Message" icon="pi pi-send" className=" bg-black text-white border-dark-subtle" style={{ borderRadius: '10px', padding: '10px' }} />
                             </div>
                         </div>

                     </div>

                 </div>
             </div>
            </div>
        </div>
        //  <div className="container">
        //    
        // </div>

    )
}

export default Contactpage