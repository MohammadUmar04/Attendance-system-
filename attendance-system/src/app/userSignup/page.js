// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../Firebase/auth';
// import { useRouter } from 'next/navigation';

// const UserSignup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match.');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setErrorMessage('Invalid email format.');
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       console.log('User registered:', user);
//       alert('Signup successful! You can now log in.');
//       router.push('/Usersurface'); // Redirect to another page after successful signup
//     } catch (error) {
//       console.error('Error signing up:', error);
//       setErrorMessage('Error creating account. Please try again.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-950">
//       <motion.div
//         className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full transition-transform transform hover:scale-105"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 font-serif">Signup</h2>
//         {errorMessage && (
//           <div className="mb-4 text-red-600 text-center">
//             {errorMessage}
//           </div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-black">Email</label>
//             <input
//               type="email"
//               className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-black">Password</label>
//             <input
//               type="password"
//               className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-black">Confirm Password</label>
//             <input
//               type="password"
//               className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
//           >
//             Signup
//           </button>
//         </form>
//         <p className="mt-4 text-center text-black">
//           Already have an account?{' '}
//           <Link href="/userLogin" className="text-blue-600 hover:underline">Login Here</Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default UserSignup;


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/auth';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User registered:', user);

      Swal.fire({
        icon: 'success',
        title: 'Signup Successful',
        text: 'You can now log in.',
      }).then(() => {
        router.push('/Usersurface'); // Redirect to another page after successful signup
      });
    } catch (error) {
      console.error('Error signing up:', error);
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: 'Error creating account. Please try again.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full transition-transform transform hover:scale-105"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 font-serif">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black">Email</label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Password</label>
            <input
              type="password"
              className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Confirm Password</label>
            <input
              type="password"
              className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-center text-black">
          Already have an account?{' '}
          <Link href="/userLogin" className="text-blue-600 hover:underline">Login Here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default UserSignup;
