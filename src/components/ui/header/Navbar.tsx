import NavDropDownItem from "../../stralla/header/NavDropDownItem"
import NavWrapper from "../../stralla/header/NavWrapper"
import { HeaderShifingVariants, HeaderVariations } from "./Header"

type NavigationProps = {
    active: boolean,
    animationVariant?: HeaderShifingVariants | HeaderVariations,
    closeFn?: any,
    navRef: React.RefObject<HTMLElement>
}

const NavBar = ({active, closeFn, animationVariant, navRef}: NavigationProps) => {
    return(
        <NavWrapper navRef={navRef} active={active} closeFn={() => closeFn(false)} animationVariant={animationVariant}>
            {/* <SvgHamburgerMenu size={'xl'} className='ml-auto mr-2'
                    active={true} onClick={() => setHamburgerMenuActive(false)}/> */}
            <ul className='flex-col gap-12 mt-24'>
                <NavDropDownItem dropDownArr={[{title: 'Blog'}, {title: 'FAQ'}, {title: 'Community'}, {title: 'Benchmarks'}]}>
                    <span className="group-hover:text-yellow-500 transition-colors">Docs</span>
                </NavDropDownItem>
                <li>Community</li>
                <li>Versions</li>
            </ul>
        </NavWrapper>
    )
}

NavBar.displayName = 'Navman';
export default NavBar