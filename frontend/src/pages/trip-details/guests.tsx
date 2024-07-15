import { CheckCircle2, CircleDashed, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participant {
    id: string,
    name: string | null,
    email: string,
    is_confirmed: boolean,
}

export function Guests() {
    const { tripId } = useParams()
    const [ participants, setParticipants ] = useState<Participant[]>([])

    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    },[tripId])

    return ( 
        <div className="space-y-6 ">
            <h2 className="font-semibold text-">Convidados</h2>

            <div className="space-y-5">
            {participants.map((participant, index) => (
                <div key={participant.id} className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                        <span className="block text-sm text-zinc-400 truncate ">{participant.email}</span>
                    </div>
                    {participant.is_confirmed ? (
                    <CheckCircle2 className="text-green-400 size-5 shrink-0" />
                    ) : (
                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                    )}
                </div>    
            ))}
            </div>

            <button className=' bg-zinc-800 text-zinc-200 w-full justify-center rounded-lg px-5 h-11 font-medium flex items-center gap-22 hover:bg-zinc-700'>
                <Plus />
                Gerenciar convidados
            </button>
        </div>
    )
}