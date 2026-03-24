import { getDesignById } from '@/lib/designStore';
import { notFound } from 'next/navigation';
import DesignStudio from './DesignStudio';

export const dynamic = 'force-dynamic';

export default async function DesignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const design = getDesignById(id);
  if (!design) notFound();
  return <DesignStudio design={design} />;
}
