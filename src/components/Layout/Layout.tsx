import React from 'react';
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

//Gives the structure to the whole website. children refers 
//to all the inherited components that the website will display.
const Layout: React.FC = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}
export default Layout;