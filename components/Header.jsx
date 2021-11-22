import Link from "next/link"
import Image from "next/image"
import Logo from "../public/unsplash.webp"

const Header = ({ acc }) => {
  return (
    <div className='navbar'>
      <div className='logo-wrapper'>
        <Link href='/' passHref>
          <Image src={Logo} alt='logo' width={50} height={50} />
        </Link>
      </div>

      <div className='account-info'>
        <p>Welcome {acc.username}</p>
        <img src={acc.avatar.url} alt='' className='avatar' />
      </div>
    </div>
  )
}

export default Header
