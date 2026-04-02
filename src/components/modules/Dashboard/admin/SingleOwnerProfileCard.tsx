"use client"

import { getAllOwnersById } from "@/app/(dashboardLayout)/dashboard/admin/owners/_actions"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../Loader/loader"
import ErrorState from "../../Error/Error"


const SingleOwnerProfileCard = ({id}: {id: string}) => {
const {data:singleOwner, isPending, isError}= useQuery({
    queryKey: ['owner', ],
    queryFn:async()=> await getAllOwnersById(id)
});

if(isPending) return <Loader length={1}/>
if(isError) return <ErrorState message="Failed to load owner details." />
  return (
    <div>
        <h1>{singleOwner?.name}</h1>
        <p>{singleOwner?.email}</p>
        <p>{singleOwner?.status?.ACTIVE}</p>
    </div>
  )
}

export default SingleOwnerProfileCard