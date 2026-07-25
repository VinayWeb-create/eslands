import { Link } from 'react-router-dom';

export default function NotFound() {
  return <section className="grid min-h-[70vh] place-items-center px-6 py-32 text-center"><div><p className="text-sm font-bold tracking-[.25em] text-primary-300">404</p><h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">This page has moved.</h1><p className="mx-auto mt-5 max-w-md text-slate-400">The address does not point to an available Esland IT Solutions page.</p><Link to="/" className="mt-8 inline-flex rounded-xl bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-400">Return home</Link></div></section>;
}
