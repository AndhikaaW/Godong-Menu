import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { CiInstagram } from 'react-icons/ci'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaCircle, FaPhoneVolume } from 'react-icons/fa6'
import { MdOutlineMail } from 'react-icons/md'

function Contactpage() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-4 vh-100" style={{ background: '#C4C4C4' }}>
                    <div className='mt-4 ms-4'>
                        <h3 className='text-white'>Contact Information</h3>
                    </div>
                    <div className='mt-8 ms-4 text-white'>
                        <div className='mt-5'>
                            <FaPhoneVolume />
                            <label htmlFor="phone" className='ms-3'>08XXXXXXXXXX</label>
                        </div>
                        <div className='mt-5'>
                            <MdOutlineMail />
                            <label htmlFor="phone" className='ms-3'>godongmenu@gmail.com</label>
                        </div>
                        <div className='mt-5'>
                            <FaMapMarkerAlt />
                            <label htmlFor="phone" className='ms-3'>Address</label>
                        </div>
                        <div className='mt-5'>
                            <CiInstagram />
                            <label htmlFor="phone" className='ms-3'>Instagram</label>
                        </div>

                    </div>
                    <div className="d-flex justify-content-end align-items-end" style={{ width: '100%' }}>
                        <FaCircle className="responsive-circle" size={'100px'} style={{ color: '#484848', opacity: '50%' }} />
                    </div>
                </div>
                <div className="col-4">
                    <div>
                    <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3 border-0" />
                    </div>
                    <Button label="Send" icon="pi pi-send" className=" bg-dark-subtle border-dark-subtle" style={{borderRadius:'10px'}}/>
                </div>
            </div>
        </div>

    )
}

export default Contactpage