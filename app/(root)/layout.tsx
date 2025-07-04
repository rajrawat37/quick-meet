import React from 'react';

console.log("🌟 ROOT LAYOUT EXECUTING 🌟");
console.log("🔥 This is the layout file getting executed before the request is made 🔥");
console.log("📅 Layout timestamp:", new Date().toISOString());

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='Testing-Main'>
      {children}
    </main>
  )
}
export default RootLayout

