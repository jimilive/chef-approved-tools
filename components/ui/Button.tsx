'use client'

import Link from 'next/link'
import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children: React.ReactNode
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: 'button'
  href?: never
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}

interface ButtonAsLink extends ButtonBaseProps {
  as: 'a'
  href: string
  external?: boolean
  sponsored?: boolean
  onClick?: () => void
}

interface ButtonAsNextLink extends ButtonBaseProps {
  as: 'link'
  href: string
  onClick?: () => void
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsNextLink

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-800 hover:to-red-800 text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-orange-900 hover:bg-orange-950 text-white shadow-md hover:shadow-lg',
  outline: 'border-2 border-orange-800 text-orange-800 hover:bg-orange-800 hover:text-white',
  ghost: 'text-orange-700 hover:text-orange-800 hover:bg-orange-50'
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-lg',
  lg: 'px-8 py-4 text-lg rounded-xl'
}

const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'

/**
 * Unified Button Component
 *
 * Variants:
 * - primary: Gradient orange-to-red (main CTAs)
 * - secondary: Solid orange (secondary actions)
 * - outline: Orange border with hover fill
 * - ghost: Text only with subtle hover
 *
 * Sizes:
 * - sm: Compact buttons
 * - md: Default size
 * - lg: Hero/prominent CTAs
 *
 * Usage:
 * ```tsx
 * // As button
 * <Button onClick={handleClick}>Click Me</Button>
 *
 * // As external link (affiliate)
 * <Button as="a" href="https://amazon.com/..." external sponsored>
 *   Check Price on Amazon
 * </Button>
 *
 * // As internal Next.js link
 * <Button as="link" href="/reviews">View Reviews</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className = '',
      children,
      ...rest
    } = props

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`.trim()

    // External link
    if (props.as === 'a') {
      const { href, external, sponsored, onClick } = props as ButtonAsLink
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedStyles}
          onClick={onClick}
          {...(external && { target: '_blank', rel: `noopener${sponsored ? ' nofollow sponsored' : ''}` })}
        >
          {children}
        </a>
      )
    }

    // Next.js Link
    if (props.as === 'link') {
      const { href, onClick } = props as ButtonAsNextLink
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedStyles}
          onClick={onClick}
        >
          {children}
        </Link>
      )
    }

    // Regular button
    const { type = 'button', disabled, onClick } = props as ButtonAsButton
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={combinedStyles}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
export { type ButtonProps, type ButtonVariant, type ButtonSize }
