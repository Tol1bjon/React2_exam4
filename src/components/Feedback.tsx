import { Link } from 'react-router-dom';

export default function Feedback() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-292.5 flex-col items-center justify-center px-4 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-[#DB4444] text-3xl text-white">
        ✓
      </div>
      <h1 className="text-2xl font-semibold text-black sm:text-3xl">Thank you for your feedback!</h1>
      <p className="mt-3 text-sm text-neutral-600">Your message has been sent successfully.</p>
      <Link to="/" className="mt-7 rounded-sm bg-[#DB4444] px-7 py-3 text-sm text-white hover:bg-[#c93b3b]">
        Back to Home
      </Link>
    </main>
  )
}
