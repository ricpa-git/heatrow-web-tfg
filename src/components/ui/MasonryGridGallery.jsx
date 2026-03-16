// import React, { useState } from "react";

// const images = [
//   "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
//   "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
//   "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
//   "https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//   "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
//   "https://docs.material-tailwind.com/img/team-3.jpg"
// ];

// export function MasonryGridGallery() {
//   const [selectedImg, setSelectedImg] = useState(null);

//   return (
//     <>
//       <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//         {images.map((src, idx) => (
//           <div className="grid gap-4" key={idx}>
//             <img
//               className="h-auto max-w-full object-cover object-center cursor-pointer"
//               src={src}
//               alt="gallery-photo"
//               onClick={() => setSelectedImg(src)}
//             />
//           </div>
//         ))}
//       </div>
//       {selectedImg && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={() => setSelectedImg(null)}>
//           <img
//             src={selectedImg}
//             alt="gallery-large"
//             className="max-h-[90vh] max-w-[90vw] object-contain"
//             onClick={e => e.stopPropagation()}
//           />
//           <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setSelectedImg(null)}>&times;</button>
//         </div>
//       )}
//     </>
//   );
// }
