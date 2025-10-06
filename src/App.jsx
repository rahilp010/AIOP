import FancyFontGenerator from './components/FanceyFont/FanceyFontGenerarot';
import Navbar from './components/Navbar';
import { ToastContainer, Zoom } from 'react-toastify';

function App() {
   return (
      <>
         <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Zoom}
         />
         {/* <Navbar /> */}
         <FancyFontGenerator />
      </>
   );
}

export default App;
