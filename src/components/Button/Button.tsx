import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button' | 'a';
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      as = 'button',
      href,
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      className = '',
      onClick,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      isDisabled ? styles.disabled : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (as === 'a') {
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classNames}
          href={isDisabled ? undefined : href}
          aria-disabled={isDisabled}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              return;
            }
            if (onClick) onClick(e as any);
          }}
          {...(rest as any)}
        >
          {loading ? <Spinner /> : null}
          <span className={styles.content}>{children}</span>
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classNames}
        type={(rest as any).type || 'button'}
        disabled={isDisabled}
        aria-busy={loading}
        onClick={onClick}
        {...(rest as any)}
      >
        {loading ? <Spinner /> : null}
        <span className={styles.content}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

function Spinner() {
  return (
    <svg
      className={styles.spinner}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        className={styles.path}
        cx="12"
        cy="12"
        r="10"
        fill="none"
        strokeWidth="4"
      />
    </svg>
  );
}

export default Button;
