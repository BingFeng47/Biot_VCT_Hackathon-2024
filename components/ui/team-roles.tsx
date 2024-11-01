import Image from 'next/image';
import React from 'react'

function TeamRoles({roles}:any ) {

    const roleCounts = roles.reduce((acc: any, role: string) => {
        acc[role] = (acc[role] || 0) + 1;
        return acc;
    }, {});

    const duelistCount = roleCounts['Duelist'] || 0;
    const controllerCount = roleCounts['Controller'] || 0;
    const initiatorCount = roleCounts['Initiator'] || 0;
    const sentinelCount = roleCounts['Sentinel'] || 0;
  return (
    <div className='flex flex-row w-full pb-10 pt-4'>
        <div className="flex flex-col justify-center items-center w-1/2">
            <Image src="/avatar/duelist.png" width={70} height={70}  alt="duelist" className=' bg-destructive rounded-full p-3'/>
            <div className="text-center text-lg font-bold pt-3">Duelist</div>
            <div className="text-center text-lg">{duelistCount}</div>
        </div>
        <div className="flex flex-col justify-center items-center w-1/2">
            <Image src="/avatar/controller.png" width={70} height={70}  alt="controller" className=' bg-destructive rounded-full p-3'/>
            <div className="text-center text-lg font-bold pt-3">Controller</div>
            <div className="text-center text-lg ">{controllerCount}</div>
        </div>
        <div className="flex flex-col justify-center items-center w-1/2">
            <Image src="/avatar/initiator.png" width={70} height={70}  alt="initiator" className=' bg-destructive rounded-full p-3'/>
            <div className="text-center text-lg font-bold pt-3">Initiator</div>
            <div className="text-center text-lg">{initiatorCount}</div>
        </div>
        <div className="flex flex-col justify-center items-center w-1/2">
            <Image src="/avatar/sentinel.png" width={70} height={70}  alt="sentinel" className=' bg-destructive rounded-full p-3'/>
            <div className="text-center text-lg font-bold pt-3">Sentinel</div>
            <div className="text-center text-lg">{sentinelCount}</div>
        </div>
    </div>
  )
}

export default TeamRoles