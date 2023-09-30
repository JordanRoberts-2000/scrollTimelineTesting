import NavDropDownItem from "../../stralla/header/NavDropDownItem"
import NavWrapper2 from "../../stralla/header2/NavWrapper2"

const NavBar2 = () => {
    return(
        <NavWrapper2>
            {/* <SvgHamburgerMenu size={'xl'} className='ml-auto mr-2'
                    active={true} onClick={() => setHamburgerMenuActive(false)}/> */}
            <ul className='flex-col gap-12 mt-24 mr-[100px]'>
                <NavDropDownItem dropDownArr={[{title: 'Blog'}, {title: 'FAQ'}, {title: 'Community'}, {title: 'Benchmarks'}]}>
                    <span className="group-hover:text-yellow-500 transition-colors">Docs</span>
                </NavDropDownItem>
                <li>Community</li>
                <li>Versions</li>
            </ul>
        </NavWrapper2>
    )
}

export default NavBar2