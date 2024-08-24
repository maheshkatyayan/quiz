import React, { useState, useEffect } from 'react';
import Nav from './Nav.js';
import Footer from './footer.js'


const images = [
  'https://tse2.mm.bing.net/th?id=OIP.5GJy56Q2QqCRHp-zjC-2NAHaFj&pid=Api&P=0&h=180',
  'https://tse1.mm.bing.net/th?id=OIP.S2KMMdeWejny18e8ZujPIgHaGK&pid=Api&P=0&h=180',
  'https://tse2.mm.bing.net/th?id=OIP.p7zv9rbBiVUaj_BQQX8C6gHaFx&pid=Api&P=0&h=180',
  'https://assets.vogue.in/photos/646c6fe48f85812e8d889001/2:3/w_2560%2Cc_limit/SUNNY2.jpg',
  'https://tse3.mm.bing.net/th?id=OIP.CJeJjqEKLIsbfEc8qxa9YQHaHa&pid=Api&P=0&h=180',
  'https://tse3.mm.bing.net/th?id=OIP.Olb2BN-K-ilp1hd5JNW87QHaI4&pid=Api&P=0&h=180',
];

const RandomGridComponent = () => {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    setShuffledImages(images); // No need to shuffle for this specific layout
  }, []);

  return (
    <div className='bg-black'>
      <Nav />
      <h1>welcome to Event room</h1>
      <div className=" flex flex-wrap justify-center gap-6 p-4">
        {/* Image 1 */}
        <div
  className="relative bg-gray-100 rounded-2xl shadow-lg overflow-hidden group"
  style={{ width: '450px', height: '500px', marginTop: '190px', borderRadius: '40px' }}
>
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${shuffledImages[3]})` }}
  />
  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-500 flex flex-col justify-center items-center">
    <h2 className="text-3xl font-semibold text-white mb-2">CREAM</h2>
    <p className="text-lg text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      [PRO] SMART OBJECT LAYERS PHOTOSHOP
    </p>
    <p className="text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      LINE
    </p>
  </div>
</div>


        {/* Image 2 */}
        <div
          className="relative bg-gray-100 rounded-3xl shadow-lg overflow-hidden group"
          style={{ width: '450px', height: '500px',borderRadius: '40px' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${shuffledImages[3]})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-500 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-semibold text-white mb-2">CREAM</h2>
            <p className="text-lg text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              [PRO] SMART OBJECT LAYERS PHOTOSHOP
            </p>
            <p className="text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              LINE
            </p>
          </div>
        </div>

        {/* Image 3 */}
        <div
          className="relative bg-gray-100 rounded-2xl shadow-lg overflow-hidden group"
          style={{ width: '450px', height: '500px', marginTop: '100px',borderRadius: '40px' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${shuffledImages[3]})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-500 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-semibold text-white mb-2">CREAM</h2>
            <p className="text-lg text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              [PRO] SMART OBJECT LAYERS PHOTOSHOP
            </p>
            <p className="text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              LINE
            </p>
          </div>
        </div>


       
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {/* Image 4 */}
        <div
          className="relative bg-gray-100 rounded-2xl shadow-lg overflow-hidden group"
          style={{ width: '450px', height: '500px', marginTop: '-6px',borderRadius: '40px' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${shuffledImages[3]})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-500 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-semibold text-white mb-2">CREAM</h2>
            <p className="text-lg text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              [PRO] SMART OBJECT LAYERS PHOTOSHOP
            </p>
            <p className="text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              LINE
            </p>
          </div>
        </div>

        {/* Image 5 */}
        <div
          className="relative bg-gray-100 rounded-3xl shadow-lg overflow-hidden group"
          style={{ width: '450px', height: '500px', marginTop: '-200px',borderRadius: '40px' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${shuffledImages[3]})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-500 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-semibold text-white mb-2">CREAM</h2>
            <p className="text-lg text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              [PRO] SMART OBJECT LAYERS PHOTOSHOP
            </p>
            <p className="text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              LINE
            </p>
          </div>
        </div>

        {/* Image 6 */}
        <div
          className="relative bg-gray-100 rounded-2xl shadow-lg overflow-hidden group"
          style={{ width: '450px', height: '500px', marginTop: '-100px',borderRadius: '40px' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${shuffledImages[3]})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-500 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-semibold text-white mb-2">CREAM</h2>
            <p className="text-lg text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              [PRO] SMART OBJECT LAYERS PHOTOSHOP
            </p>
            <p className="text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              LINE
            </p>
          </div>
        </div>


       
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {/* Image 7 */}
        <div
  className="relative bg-gray-100 shadow-lg overflow-hidden group"
  style={{ 
    width: '450px', 
    height: '305px', 
    marginTop: '-6px', 
    borderTopRightRadius: '35px',
    borderTopLeftRadius: '35px',
    overflow: 'hidden' // Ensure the content stays within the rounded corners
  }}
>
  <div 
    style={{ 
      width: '100%', 
      height: '100%', 
      backgroundImage: `url(${shuffledImages[3]})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center' 
    }} 
  />

  <div 
    style={{ 
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      height: '100%', 
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), black)' 
    }} 
  />

  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-500 flex flex-col justify-center items-center">
    <h2 className="text-3xl font-semibold text-white mb-2">CREAM</h2>
    <p className="text-lg text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      [PRO] SMART OBJECT LAYERS PHOTOSHOP
    </p>
    <p className="text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      LINE
    </p>
  </div>
</div>


        {/* Image 8 */}
        <div
  className="relative bg-gray-100 shadow-lg overflow-hidden group"
  style={{ 
    width: '450px', 
    height: '500px', 
    marginTop: '-200px', 
    borderTopRightRadius: '35px',
    borderTopLeftRadius: '35px',
    overflow: 'hidden' // Ensure the content stays within the rounded corners
  }}
>
  <div 
    style={{ 
      width: '100%', 
      height: '100%', 
      backgroundImage: `url(${shuffledImages[3]})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center' 
    }} 
  />

  <div 
    style={{ 
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      height: '100%', 
      background: 'linear-gradient(to bottom,transparent, black)' 
    }} 
  />

  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-500 flex flex-col justify-center items-center">
    <h2 className="text-3xl font-semibold text-white mb-2">CREAM</h2>
    <p className="text-lg text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      [PRO] SMART OBJECT LAYERS PHOTOSHOP
    </p>
    <p className="text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      LINE
    </p>
  </div>
</div>


        {/* Image 9 */}
        <div
  className="relative bg-gray-100 shadow-lg overflow-hidden group"
  style={{ 
        width: '450px', 
        height: '400px', 
        marginTop: '-100px', 
        borderTopRightRadius: '35px',
        borderTopLeftRadius: '35px',
        overflow: 'hidden' // Ensure the content stays within the rounded corners
      }}
>
  <div 
    style={{ 
      width: '100%', 
      height: '100%', 
      backgroundImage: `url(${shuffledImages[3]})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center' 
    }} 
  />

  <div 
    style={{ 
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      height: '100%', 
      background: 'linear-gradient(to bottom,transparent, black)' 
    }} 
  />

  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-500 flex flex-col justify-center items-center">
    <h2 className="text-3xl font-semibold text-white mb-2">CREAM</h2>
    <p className="text-lg text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      [PRO] SMART OBJECT LAYERS PHOTOSHOP
    </p>
    <p className="text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      LINE
    </p>
  </div>
</div>
       
      </div>
      <h1 className='text-white text-center text-6xl my-20'>Winners</h1>
      <div className='flex flex-row'>
  <div className='flex flex-col'>  
     <div
  className="relative bg-gray-100 rounded-2xl mt-20 mx-20 shadow-lg overflow-hidden group"
  style={{ width: '800px', height: '500px', borderRadius: '40px' }}
>
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${shuffledImages[3]})` }}
  />
  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-500 flex flex-col justify-center items-center">
    <h2 className="text-3xl font-semibold text-white mb-2">CREAM</h2>
    <p className="text-lg text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      [PRO] SMART OBJECT LAYERS PHOTOSHOP
    </p>
    <p className="text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      LINE
    </p>
  </div>
  
  </div>
  <div
  className="relative bg-gray-100 rounded-2xl  ml-20 mt-10 mb-10 shadow-lg overflow-hidden group"
  style={{ width: '800px', height: '500px', borderRadius: '40px' }}
>
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${shuffledImages[3]})` }}
  />
  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-500 flex flex-col justify-center items-center">
    <h2 className="text-3xl font-semibold text-white mb-2">CREAM</h2>
    <p className="text-lg text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      [PRO] SMART OBJECT LAYERS PHOTOSHOP
    </p>
    <p className="text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      LINE
    </p>
  </div>
  
  </div></div>
  <div
          className="relative bg-gray-100 rounded-2xl shadow-lg overflow-hidden group"
          style={{ width: '514px', height: '1020px', marginTop: '100px',borderRadius: '40px' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${shuffledImages[3]})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-500 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-semibold text-white mb-2">CREAM</h2>
            <p className="text-lg text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              [PRO] SMART OBJECT LAYERS PHOTOSHOP
            </p>
            <p className="text-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              LINE
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default RandomGridComponent;
