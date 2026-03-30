import OrderDetailsClient from "./OrderDetailsClient";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function OrderDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return <OrderDetailsClient id={id} />;
}
