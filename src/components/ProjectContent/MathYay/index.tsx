
import ImageComponent from "@/components/ImageComponent"
import LinkPill from "@/components/LinkPill"
import { GithubLogo } from "@phosphor-icons/react"
import DesktopScreenshot from './assets/desktop-screenshot.png'
import Logo from './assets/logo.svg'
import MobileScreenshot from './assets/mobile-screenshot.png'
function MathYay() {
  return (
    <div className="overflow-auto">
      <div className="flex flex-col gap-5 relative">
        <div className="flex sm:flex-col items-center flex-wrap justify-between sm:items-start gap-y-2">
          <h1 className="text-5xl font-bold font-poppins">Math! Yay!</h1>
          <div className="flex gap-2 h-min">
            <LinkPill href="https://math-yay.vercel.app" >Find it here</LinkPill>
            <LinkPill href="https://github.com/bruno-borges-2001/math-yay" hideExternalIcon><GithubLogo height="100%" width="16px" /></LinkPill>
          </div>
        </div>

        <div className="static sm:absolute top-0 right-0 grid place-items-center">
          <ImageComponent src={Logo} alt="Math! Yay! Logo" />
        </div>

        <p className="w-full sm:w-[calc(100%-133px)]">
          Trying to improve my Next.JS skills and discover new libraries, I started this project to create an web application where the user could test their abilities with simple math problems
        </p>

        <p>
          The game was a fully responsive web application with a simple UI where the user could access and start playing in seconds
        </p>

        <div className="grid place-items-center grid-cols-1 sm:grid-cols-[0.35fr_0.65fr] gap-4 sm:h-[270px]">
          <ImageComponent src={MobileScreenshot} alt="Mobile Landing Page" className="h-full max-h-[270px]" />
          <ImageComponent src={DesktopScreenshot} alt="Desktop Landing Page" className="h-full max-h-[270px]" />
        </div>
      </div>
    </div>
  )
}

export default MathYay
