import React from 'react'

function Categorypage() {
    return (
        <div className='p-lg-5 vh-100'>
            <h1 className='text-center mb-5'>Category</h1>
            <div className="row justify-content-center align-items-center gap-5">
                <div className="col-3">
                    <div className="card justify-content-center align-items-center">
                        <div className="rounded-circle bg-dark-subtle d-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px' }}>
                            <img src="https://img.icons8.com/ios-filled/100/000000/noodles.png" alt="Noodles" width="50px" />
                        </div>
                        <div className="card-body text-center">
                            <h3 className="card-title">Food</h3>
                            <p className="card-text">Godong resto menghadirkan berbagai jenis hidangan dari berbagai budaya dan masakan khas Indonesia.</p>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card justify-content-center align-items-center">
                        <div className="rounded-circle bg-dark-subtle d-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px' }}>
                            <img src="https://img.icons8.com/ios-filled/100/000000/soda-cup.png" alt="Noodles" width="50px" />
                        </div>
                        <div className="card-body text-center">
                            <h3 className="card-title">Drink</h3>
                            <p className="card-text">Godong resto menghadirkan berbagai jenis hidangan dari berbagai budaya dan masakan khas Indonesia.</p>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card justify-content-center align-items-center">
                        <div className="rounded-circle bg-dark-subtle d-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px' }}>
                            <img src="https://img.icons8.com/ios-filled/100/000000/french-fries.png" alt="Noodles" width="50px" />
                        </div>
                        <div className="card-body text-center">
                            <h3 className="card-title">Snack</h3>
                            <p className="card-text">Godong resto menghadirkan berbagai jenis hidangan dari berbagai budaya dan masakan khas Indonesia.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Categorypage