import ReactDOM from "react-dom"

const ScrollTracker = () => {
  return ReactDOM.createPortal((
    <div className="h-2 z-[9999] top-0 w-full fixed bg-green-600"></div>
  )
  ,document.body)
}

export default ScrollTracker