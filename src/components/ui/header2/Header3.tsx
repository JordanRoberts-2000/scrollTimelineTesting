import NavBar2 from './Navbar2'
import HeaderWrapper2 from '../../stralla/header2/HeaderWrapper2'
import SvgHamburgerMenu2 from '../../stralla/header2/SvgHamburgerMenu2'

const Header3 = () => {
    return (
            <HeaderWrapper2 animationVariant={'coverRight'}>
                <SvgHamburgerMenu2 size={'xl'} className={`ml-2 transition-all duration-500`} stayInPlace hideBehindNav/>
                <div className='ml-auto mr-8 font-medium flex gap-16'>
                    <NavBar2/>
                    <div className='text-xl flex items-center'>sign in</div>
                </div>
            </HeaderWrapper2>
    )
}

export default Header3