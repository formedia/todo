import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { CustomerTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data';
import Search from '@/app/ui/search';

export default async function Page(props: {
    searchParams?: Promise<{ query?: string; page?: number }>;
}) {
  console.log('customer page');
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = searchParams?.page || 1;
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <Suspense key={query + currentPage} fallback={<CustomerTableSkeleton />}>
        <Table customers={customers} />
      </Suspense>
    </div>
  );
}