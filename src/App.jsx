import EmojiCopy from './components/EmojiGenerator/EmojiCopy';
import FancyFontGenerator from './components/FanceyFont/FanceyFontGenerarot';
import HeroPage from './components/HeroPage';
import { ToastContainer, Zoom } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

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
         <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/emoji-generator" element={<EmojiCopy />} />
            <Route path="/font-generator" element={<FancyFontGenerator />} />
         </Routes>
      </>
   );
}

export default App;
