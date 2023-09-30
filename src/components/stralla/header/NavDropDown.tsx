type DropDownItem = {
    title: string
    onclick?: () => void
}

type Props = {
    dropDownArr: DropDownItem[],
    active?: string
}

const NavDropDown = ({dropDownArr, active}: Props) => {
  return (
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
  )
}

export default NavDropDown