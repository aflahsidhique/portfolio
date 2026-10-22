export default function DecorativeStar({ variant = 'asterisk' }) {
  return (
    <svg className="decorative-star" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">
      {variant === 'sparkle' ? (
        <path d="M12 0 15.5 8.5 24 12 15.5 15.5 12 24 8.5 15.5 0 12 8.5 8.5Z" fill="currentColor" />
      ) : (
        <path d="M12 0v24M0 12h24M3.5 3.5l17 17M3.5 20.5l17-17" fill="none" stroke="currentColor" strokeWidth="1.25" />
      )}
    </svg>
  );
}
