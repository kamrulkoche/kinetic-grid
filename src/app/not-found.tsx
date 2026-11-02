import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="eyebrow">404 / Off the grid</p>
        <h1 className="display mt-4 text-5xl text-white sm:text-7xl">No current here.</h1>
        <Link href="/" className="btn-amber mt-8 inline-flex rounded-md px-6 py-3.5 text-[13px] font-bold">
          Back to the grid
        </Link>
      </div>
    </main>
  );
}
