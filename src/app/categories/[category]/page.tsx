import { CategoryArtpieceGrid } from '@/components/artpieces/CategoryArtpieceGrid';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await params first
  const { category } = await params;
  
  // Normalize category name: replace dashes, trim, capitalize each word
  const raw = decodeURIComponent(category.replace(/-/g, ' ')).trim();
  const categoryName = raw
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return (
    <main className="min-h-screen bg-background-100 py-8">
      <CategoryArtpieceGrid categoryName={categoryName} />
    </main>
  );
}
