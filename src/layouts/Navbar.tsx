import { useNavbarLogic } from './navbar/useNavbarLogic'
import { NavbarLogo } from './navbar/NavbarLogo'
import { DesktopNav } from './navbar/DesktopNav'
import { ThemeToggle } from './navbar/ThemeToggle'
import { UserActions } from './navbar/UserActions'
import { MobileMenuToggle } from './navbar/MobileMenuToggle'
import { MobileMenu } from './navbar/MobileMenu'

export default function Navbar() {
  const {
    pathname,
    theme,
    isLoggedIn,
    isMobileMenuOpen,
    toggleTheme,
    closeMobileMenu,
    handleLogout,
    toggleMobileMenu,
  } = useNavbarLogic()

  return (
    <nav className='sticky top-0 w-full z-50 transition-all duration-300 ease-out bg-background/80 backdrop-blur-lg border-b border-border/60 shadow-2xs'>
      <div className='mx-auto relative'>
        <div className='flex items-center justify-between h-16 sm:h-20 px-4 max-w-7xl mx-auto'>
          {/* Logo */}
          <NavbarLogo />

          {/* Desktop Navigation */}
          <DesktopNav pathname={pathname} />

          {/* Actions */}
          <div className='flex items-center gap-3'>
            {/* Theme Toggle */}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* User Actions */}
            <UserActions isLoggedIn={isLoggedIn} onLogout={handleLogout} />

            {/* Mobile Menu Toggle */}
            <MobileMenuToggle
              isMobileMenuOpen={isMobileMenuOpen}
              onToggle={toggleMobileMenu}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          pathname={pathname}
          theme={theme}
          isLoggedIn={isLoggedIn}
          onClose={closeMobileMenu}
          onToggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
      </div>
    </nav>
  )
}
