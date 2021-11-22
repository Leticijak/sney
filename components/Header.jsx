import Link from "next/link"
import Image from "next/image"
import Logo from "../public/unsplash.webp"

const Header = ({ acc }) => {
  return (
    <div className='navbar'>
      <Link href='/' passHref>
        <Image src={Logo} alt='logo' width={50} height={50} />
      </Link>
      <div className='account-info'>
        <p>Welcome {acc.username}</p>
        <img src={acc.avatar.url} alt='' />
      </div>
    </div>
  )
}

export default Header
