import Link from 'next/link'
import Container from '@/components/Container'

export default function Home() {
  return (
    <div className="animate-fade-in flex flex-1 items-center">
      <Container size="small">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-serif text-5xl font-bold mb-6">Color Cauldron</h1>
          <p className="text-xl text-zinc-600 mb-8 max-w-[600px]">
            Brew beautiful color palettes with AI. Describe your theme, vibes, or use case 
            and get perfectly matched colors.
          </p>
          <Link 
            href="/brew"
            className="bg-[#3FF381] hover:bg-[#6dffa2] active:bg-green-300 text-black font-medium px-8 py-4 rounded-[13px] transition-colors"
          >
            Start Brewing
          </Link>
        </div>
      </Container>
    </div>
  )
}