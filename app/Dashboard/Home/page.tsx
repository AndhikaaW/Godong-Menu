import React from 'react'

function Homepage() {
    return (
        <div className="surface-0 vh-100" >
            <div className="text-900 font-bold text-6xl mb-5 text-center pt-5">Welcome, Tian</div>
            <div className="container">
                <div className="row">
                    <div className="col-5 m-lg-5">
                        <div className="flex flex-col">
                            <img src="/img-1.jpg" alt="gambar" width="250px" className="p-2 mb-5" style={{borderRadius:'30px',marginTop:'-20px'}}/>
                            <div className="flex-1">
                                <img src="/img-2.jpg" alt="gambar" width="250px" className="p-2" style={{borderRadius:'30px'}}/>
                                <div>
                                    <img src="/img-2.jpg" alt="gambar" width="250px" className="p-2" style={{borderRadius:'30px'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5 m-lg-5">
                        <h1 className="text-4xl font-bold mb-4">Godong Menu</h1>
                        <p className="text-lg text-gray-700 w-100">
                            Selamat datang di Godong, restoran yang menyajikan cita rasa autentik Indonesia dalam suasana yang nyaman dan ramah.
                            Godong menghadirkan beragam hidangan khas Nusantara, mulai dari makanan utama yang mengenyangkan hingga camilan ringan dan minuman tradisional yang menyegarkan.
                            Kunjungi Godong dan rasakan sendiri kelezatan masakan Indonesia dalam setiap suapan!
                        </p>
                        <p><img src="/favicon.ico" alt="" width='20px' className='mr-2' />Delivery within 30 minutes</p>
                        <p><img src="/favicon.ico" alt="" width='20px' className='mr-2' />Best Offer & Prices</p>
                        <p><img src="/favicon.ico" alt="" width='20px' className='mr-2' />Online Services Available</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Homepage