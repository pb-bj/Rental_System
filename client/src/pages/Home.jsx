import bannerImage from '../assets/car-banner-bg.jpg';
// import { CarSearchBox } from '../components';

const Home = () => {
  return (
    <section style={{ marginTop: '55px' }}>
      <div className="postion-relative">
        <img
          className='img-fluid w-100 mw-100 object-fit-cover'
          style={{ height: '500px', filter: 'brightness(35%)' }}
          src={bannerImage}
          alt="Man inside vehicle"
        />
        <div className='position-absolute w-50 text-white' style={{ top: '30%', left: '25%' }}>
          <h1 className="text-center">BOOK ANY CAR WITH <br /><span className="fw-bold" style={{ color: "#BF40BF" }}>LOW PRICE</span></h1>
        </div>
      </div>
      <div className='position-absolute w-50 text-white' style={{ top: '50%', left: '25%' }}>
        {/* <CarSearchBox /> */}
      </div>
    </section >
  )
}

export default Home