import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";

function Profilepage() {
    return (

        <div className="flex align-items-center justify-content-center vh-100">
            <div className="surface-card p-5 shadow-2 border-round w-full lg:w-5 bg-light">
                <div className="row justify-content-center align-items-center g-2 mb-3">
                    <div className="col-3 position-relative d-inline-block">
                        <FaCircleUser size={70} className="position-relative" />
                        <LuPencilLine className="position-absolute shadow" style={{fontSize: '25px',color: '#000',top: '75%',left: '55%',background:'#F5F7F8',transform: 'translate(-50%, -50%)',borderRadius:'50%',padding:'3px'}}/>
                    </div>
                    <div className="col-8">
                        <p>Your Name</p>
                        <p className='text-black-50'>YourName123@gmail.com</p>
                    </div>
                </div>

                <div>
                    <hr />
                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <label htmlFor="Nama">Nama</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-black-50 text-right cursor-pointer">Your Name</a>
                    </div>
                    <hr />

                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <label htmlFor="EmailAccount">Email Account</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-black-50 text-right cursor-pointer">YourEmail123@gmail.com</a>
                    </div>
                    <hr />

                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <label htmlFor="DateofBirth">Date Of Birth</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-black-50 text-right cursor-pointer">DD/MM/YYYY</a>
                    </div>
                    <hr />

                    <div className="flex align-items-center justify-content-between mb-4">
                        <div className="flex align-items-center">
                            <label htmlFor="NumberPhone">No.Handphone</label>
                        </div>
                        <a className="font-medium no-underline ml-2 text-black-50 text-right cursor-pointer">08XXXXXXXXXX</a>
                    </div>
                    <hr />
                    <div className='flex align-items-center justify-content-center'>
                        <p>copyright@byGodongMenu</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profilepage