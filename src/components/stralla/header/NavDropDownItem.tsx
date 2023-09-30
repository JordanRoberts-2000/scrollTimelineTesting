type DropDownItem = {
    title: string
    onclick?: () => void
}

type Props = {
    children: React.ReactNode,
    dropDownArr: DropDownItem[],
    active?: string
}

const NavDropDownItem = ({dropDownArr, active, children}: Props) => {
  return (
    <li className="flex items-center gap-1 cursor-pointer group relative">
        <span className="group-hover:text-yellow-500 transition-colors">{children}</span>
        <svg className="h-4 group-hover:fill-yellow-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
        <div className="absolute left-[-16px] translate-y-[-16px] top-full flex flex-col opacity-0 pointer-events-none 
        group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition duration-200"> 
            <div className="h-2 w-full opacity-0"></div>
            <ul className="bg-white customShadow py-3 px-2 text-sm flex flex-col gap-3 rounded-lg">
                {dropDownArr.map(({title, onclick}, i) => (
                    <li key={i} onClick={onclick} className={`${title === active ? "bg-gray-200 text-yellow-500" : "hover:bg-gray-200"} transition w-full p-1 pr-12 rounded-sm`}>
                        {title}
                    </li>
                ))}
            </ul>
        </div>
    </li>
  )
}

export default NavDropDownItem