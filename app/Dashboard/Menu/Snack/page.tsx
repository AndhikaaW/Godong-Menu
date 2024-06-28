import React from 'react'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Snackpage() {
  return (
    <div className='row gap-4'>
      <Card className='w-full h-full rounded mt-3 sm:w-4 '>
        <CardHeader>
          <img src="/img-5.jpg" alt="" className='mb-4 shadow' style={{ width: '100%', borderRadius: '20px' }} />
        </CardHeader>
        <CardContent>
          <CardTitle><h3 className="card-title">Risoles</h3></CardTitle>
          <p className="card-text">Risoles camilan lezat terbuat dari kulit dadar yang diisi dengan ayam suwir pedasyang digoreng hingga renyah.</p>
        </CardContent>
        <CardFooter>
          <div className="col-6 d-flex align-items-center justify-content-around fw-bold">
            <p className="mb-0">Rp 15.000</p>
          </div>
          <div className="col-5 d-flex align-items-center justify-content-around">
            <CiCircleMinus size={'40px'} />
            <p className="mb-0 ms-2 me-2">1</p>
            <CiCirclePlus size={'40px'} />
          </div>
        </CardFooter>
      </Card>
    </div>
    // <div className="row w-100">
    //   <div className="col-3 ms-5 me-3">
    //     <div className="card" style={{borderRadius:'25px'}}>
    //       <div className="card-body p-0">
    //         <img src="/img-5.jpg" alt="" className='mb-4 shadow' style={{ width: '100%', borderRadius: '20px' }} />
    //         <h3 className="card-title">Risoles</h3>
    //         <p className="card-text">Risoles camilan lezat terbuat dari kulit dadar yang diisi dengan ayam suwir pedasyang digoreng hingga renyah.</p>
    //       </div>

    //       <div className="container">
    //         <div className="row">
    //           <div className="col-6 d-flex align-items-center justify-content-around fw-bold">
    //             <p className="mb-0">Rp 15.000</p>
    //           </div>
    //           <div className="col-6 d-flex align-items-center justify-content-around">
    //             <CiCircleMinus size={'40px'} />
    //             <p className="mb-0 ms-2 me-2">1</p>
    //             <CiCirclePlus size={'40px'} />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Snackpage