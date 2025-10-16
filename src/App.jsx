import EmojiCopy from './components/EmojiGenerator/EmojiCopy';
import FancyFontGenerator from './components/FanceyFont/FanceyFontGenerarot';
import HeroPage from './components/HeroPage';
import { ToastContainer, Zoom } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import CoolSymbol from './components/CoolSymbol/CoolSymbol';
import HashtagGenerator from './components/Hashtag/HashtagGenerator';

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
            <Route path="/emojigenerator" element={<EmojiCopy />} />
            <Route path="/fontgenerator" element={<FancyFontGenerator />} />
            <Route path="/symbol" element={<CoolSymbol />} />
            <Route path="/hashtaggenerator" element={<HashtagGenerator />} />
         </Routes>
      </>
   );
}

export default App;
