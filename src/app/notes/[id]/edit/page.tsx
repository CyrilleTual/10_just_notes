import Edit from '@/components/Edit'

function Page({ params }: { params: { id: string } }) {
  return <Edit id={params.id}/>;
}

export default Page