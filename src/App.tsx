// import HeaderAndShiftingMain2 from "./components/stralla/header2/Header&ShiftingMain2"
// import Dialog from "./components/stralla/model/Dialog"
// import Model from "./components/stralla/model/Model"
// import Header2 from "./components/ui/header2/Header2"
// import libraryImage from './assets/images/library.jpg'
// import homeImage from './assets/images/home.jpg'
// import AdvancedImage from "./components/stralla/image/advancedImage"
// import React from "react"
// import ScrollTracker from "./components/stralla/misc/scrolling/ScrollTracker"
// import { useAtom } from 'jotai'
// import { setModelAtom } from "./store/store"

const App = () => {
    // const [,setOpen] = useAtom(setModelAtom)
    return (
        <>
            {/* <div className="card">hell0</div>
            <HeaderAndShiftingMain2 headerElement={<Header2 />} animationVariant={"revealLeftTakeHeader"}>
                <ScrollTracker/>
                <div id="mainImage" className="mb-8 card">
                    <AdvancedImage src={homeImage} className="w-[100%] aspect-video object-cover mx-auto"/>
                </div>
                <div className="flex-col gap-2 p-2 grid grid-cols-4 auto-rows-[100px]">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime alias labore ipsa, repudiandae, est vel quam et modi expedita aspernatur illo error nam velit ab ducimus dolore ullam sapiente debitis!
                </p>
                {[...Array(120)].map((_item, i) => (
                        <React.Fragment key={i}>
                               <img src={libraryImage} className="card w-[100%] h-full row-span-2 object-cover"/>
                            <img src={libraryImage} className="card w-[100%] h-full col-span-2 row-span-2 object-cover"/>
                            <img src={libraryImage} className="card w-[100%] h-full object-cover"/>
                            <img src={libraryImage} className="card w-[100%] h-full object-cover"/>
                            <img src={libraryImage} className="card w-[100%] h-full col-span-2 row-span-2 object-cover"/>
                            <img src={libraryImage} className="card w-[100%] h-full object-cover"/>
                            <img src={libraryImage} className="card w-[100%] h-full object-cover"/>
                            <img src={libraryImage} className="card w-[100%] h-full object-cover"/>
                            <img src={libraryImage} className="card w-[100%] h-full object-cover"/>
                            <img src={libraryImage} className="card w-[100%] h-full object-cover"/>
                            <img src={libraryImage} className="card w-[100%] h-full object-cover"/>
                            <img src={libraryImage} className="card w-[100%] h-full col-span-2 object-cover"/>
                         
                        </React.Fragment>
                    ))}
                </div>
            </HeaderAndShiftingMain2>
            <Dialog>
                <Model/>
            </Dialog> */}
            {/* <HeaderAndShiftingMain2 headerElement={<Header2 />} animationVariant={"revealLeftTakeHeader"}> */}
                <div className="gap-2 py-[2000px]">
                    <div className="back2 card2 w-full aspect-square"></div>
                    <div className="back card2 w-full aspect-square"></div>
                </div>
            {/* </HeaderAndShiftingMain2> */}
        </>
    )
}

export default App