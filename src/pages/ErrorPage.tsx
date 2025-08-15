import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError() as Error
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-white text-center text-gray-800">
      <h1 className="text-2xl font-bold text-red-600">Nastala neočekávaná chyba</h1>
      <p>{error.message}</p>
    </div>
  )
}

