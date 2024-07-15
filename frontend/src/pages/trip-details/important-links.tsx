import { Link2, Plus } from "lucide-react";

export function ImportantLinks(){
    return (
        <div className="space-y-6 ">
            <h2 className="font-semibold text-">Links importantes</h2>

            <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                        <a href="a" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">https://www.airbnb.com.br/rooms/104700011</a>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                        <a href="a" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">https://www.airbnb.com.br/rooms/104700011</a>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
            </div>

            <button className=' bg-zinc-800 text-zinc-200 w-full justify-center rounded-lg px-5 h-11 font-medium flex items-center gap-22 hover:bg-zinc-700'>
                <Plus />
                Cadastrar novo link
            </button>
        </div>
    )
}