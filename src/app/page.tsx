// 'use client';
// import Image from "next/image";
// import styles from "./page.module.css";
// import Dashboard from "./pages/Dashboard";
// import Data from "./pages/DataTable";
// // import DataTable from "./pages/Table"9;
// import Settings from "./pagesApp/Settings";
// import ProductForm from "./pages/AddProduct/ProductForm";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AllProducts from "./pages/AllProducts/AllProducts";
// import Navigation from "./pages/Naigation";
// export default function Home() {
//   return (
//     <div>
//       {/* <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="https://nextjs.org/icons/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol>
//           <li>
//             Get started by editing <code>src/app/page.tsx</code>.
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="https://nextjs.org/icons/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.secondary}
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer> */}
//       {/* <Dashboard/> */}
//       {/* <Data /> */}
//       {/* <DataTable/> */}
//       {/* <Settings/> */}
//       {/* <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<ProductForm />} />
//           <Route path='/all' element={<AllProducts/>}/>

//         </Routes>
//       </BrowserRouter> */}
//       {/* <Navigation /> */}
//       {/* <AllProducts /> */}

//     </div>
//   );
// }
'use client'
import Navigation from "./pages/Navigation"

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Product Management App</h1>
      <Navigation />
      <p>Use the navigation to manage your products.</p>
    </div>
  );
}

