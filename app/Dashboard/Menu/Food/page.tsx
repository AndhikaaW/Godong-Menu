import React from 'react'
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


function Foodpage() {
  return (
    <div className='row gap-3'>
      <Card className=' h-full rounded mt-3 sm:w-4 text-sm'>
        <CardHeader>
          <img src="/img-4.jpg" alt="" className='shadow' style={{ width: '100%', borderRadius: '20px' }} />
        </CardHeader>
        <CardContent>
          <CardTitle>Nasi Pecel</CardTitle>
          <CardDescription className='text-sm'>Nasi Pecel khas Madiun yang memadukan nasi putih dengan aneka sayuran segar yang disiram dengan bumbu kacang khas. Dalam setiap porsinya, Anda akan menemukan kombinasi lezat dari sayuran. </CardDescription>
        </CardContent>
        <CardFooter>
          <div className="col-7 d-flex align-items-center justify-content-around fw-bold">
            <p className="mb-0 text-sm">Rp 15.000</p>
          </div>
          <div className="col-7 d-flex align-items-center justify-content-around">
            <CiCircleMinus size={'40px'} />
            <p className="mb-0 ms-2 me-2">1</p>
            <CiCirclePlus size={'40px'} />
          </div>
        </CardFooter>
      </Card>
    </div>


    // <Card className='w-full h-full rounded mt-3 sm:w-4 '>
    //   <CardHeader>
    //     <img src="/img-4.jpg" alt="" className='shadow' style={{ width: '100%', borderRadius: '20px' }} />
    //   </CardHeader>
    //   <CardContent>
    //     <CardTitle><h3 className="card-title">Nasi Pecel</h3></CardTitle>
    //     <p className="card-text">
    //       Nasi Pecel khas Madiun yang memadukan nasi putih dengan aneka sayuran segar yang disiram dengan bumbu kacang khas. Dalam setiap porsinya, Anda akan menemukan kombinasi lezat dari sayuran. </p>
    //   </CardContent>
    //   <CardFooter>
    //     <div className="col-6 d-flex align-items-center justify-content-around fw-bold">
    //       <p className="mb-0">Rp 15.000</p>
    //     </div>
    //     <div className="col-5 d-flex align-items-center justify-content-around">
    //       <CiCircleMinus size={'40px'} />
    //       <p className="mb-0 ms-2 me-2">1</p>
    //       <CiCirclePlus size={'40px'} />
    //     </div>
    //   </CardFooter>
    // </Card>


    // <div className="row">
    //   <div className='w-full'>
    //     <div className="card w-3" style={{ borderRadius: '25px' }}>
    //       <div className="card-body p-0">
    //         <img src="/img-4.jpg" alt="" className='mb-4 shadow' style={{ width: '100%', borderRadius: '20px' }} />
    //         <h3 className="card-title">Nasi Pecel</h3>
    //         <p className="card-text">Nasi Pecel khas Madiun yang memadukan nasi putih dengan aneka sayuran segar yang disiram dengan bumbu kacang khas. Dalam setiap porsinya, Anda akan menemukan kombinasi lezat dari sayuran. </p>
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
    //   <div className="col-3">
    //     <div className="card">
    //       <div className="card-body">
    //         <img src="/img-2.jpg" alt="" className='mb-4 shadow' style={{width:'100%',borderRadius:'20px'}}/>
    //         <h3 className="card-title">Nasi Rawon</h3>
    //         <p className="card-text">Nasi Rawon khas Jawa Timur yang terdiri dari nasi putih dan sup daging sapi berwarna hitam pekat, hasil dari penggunaan kluwek. Rawon ini kaya akan rempah dan memiliki potongan daging sapi yang empuk.</p>
    //       </div>

    //       <div className="container">
    //         <div className="row">
    //           <div className="col-6 d-flex align-items-center justify-content-around fw-bold">
    //             <p className="mb-0">Rp 15.000</p>
    //           </div>
    //           <div className="col-5 d-flex align-items-center justify-content-around">
    //             <CiCircleMinus size={'40px'} />
    //             <p className="mb-0 ms-2 me-2">1</p>
    //             <CiCirclePlus size={'40px'} />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div >

  )
}

export default Foodpage