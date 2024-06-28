import React from 'react'
import Link from 'next/link'


function Categorypage() {
    return (
        <div className='surface-0 p-lg-5 vh-100 '>
            <div className='text-center'>
                <h1>Category</h1>
                <div className="underline" style={{ width: '150px', height: '4px', background: '#d4a123', margin: 'auto auto 50px' }}></div>
            </div>
            <div className="container">
                <div id='row' className="row justify-content-center align-items-center gap-5 ">
                    <Link id='card' href={'/Dashboard/Menu/Food'} className='no-underline w-full sm:w-3'>
                        <div className="card justify-content-center align-items-center ">
                            <div className="rounded-circle bg-dark-subtle d-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px' }}>
                                <img src="https://img.icons8.com/ios-filled/100/000000/noodles.png" alt="Noodles" width="50px" />
                            </div>

                            <div className="card-body text-center">
                                <h3 className="card-title">Food</h3>
                                <p className="card-text">Godong resto menghadirkan berbagai jenis hidangan dari berbagai budaya dan masakan khas Indonesia.</p>
                            </div>
                        </div>
                    </Link>
                    <Link id='card' href={'/Dashboard/Menu/Drink'} className='no-underline w-full sm:w-3'>
                        <div className="card justify-content-center align-items-center">
                            <div className="rounded-circle bg-dark-subtle d-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px' }}>
                                <img src="https://img.icons8.com/ios-filled/100/000000/soda-cup.png" alt="Noodles" width="50px" />
                            </div>
                            <div className="card-body text-center">
                                <h3 className="card-title">Drink</h3>
                                <p className="card-text">Godong resto menghadirkan berbagai jenis hidangan dari berbagai budaya dan masakan khas Indonesia.</p>
                            </div>
                        </div>
                    </Link>
                    <Link id='card' href={'/Dashboard/Menu/Snack'} className='no-underline w-full sm:w-3'>
                        <div className="card justify-content-center align-items-center">
                            <div className="rounded-circle bg-dark-subtle d-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px' }}>
                                <img src="https://img.icons8.com/ios-filled/100/000000/french-fries.png" alt="Noodles" width="50px" />
                            </div>
                            <div className="card-body text-center">
                                <h3 className="card-title">Snack</h3>
                                <p className="card-text">Godong resto menghadirkan berbagai jenis hidangan dari berbagai budaya dan masakan khas Indonesia.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Categorypage