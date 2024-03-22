import Link from 'next/link'

export default function Navbar() {
  return (
    <div>
        <ul className='flex m-10 gap-10'>
            <Link href="/">
                <li>Home</li>
            </Link>
            <Link href="/login">
                <li>Login</li>
            </Link>
            <Link href="/signup">
                <li>Signup</li>
            </Link>
        </ul>
    </div>
  )

}
