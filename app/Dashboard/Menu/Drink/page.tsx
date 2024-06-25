import React from 'react'
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

function Drinkpage() {
  return (
    <div className="row w-100">
      <div className="col-3 ms-5 me-3">
        <div className="card" style={{borderRadius:'25px'}}>
          <div className="card-body p-0">
            <img src="/img-3.jpg" alt="" className='mb-4 shadow' style={{ width: '100%', borderRadius: '20px' }} />
            <h3 className="card-title">Es Teh</h3>
            <p className="card-text">Es Teh yang segar terbuat dari teh berkualitas, dan disajikan dengan es batu. Nikmati rasa teh yang menyegarkan di setiap tegukan.</p>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-6 d-flex align-items-center justify-content-around fw-bold">
                <p className="mb-0">Rp 15.000</p>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-around">
                <CiCircleMinus size={'40px'} />
                <p className="mb-0 ms-2 me-2">1</p>
                <CiCirclePlus size={'40px'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drinkpage