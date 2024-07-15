import { AtSign, Plus, User, X } from "lucide-react"
import { FormEvent } from "react"


interface ConfirmTripModalProps {
  closeConfirmModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
}

export function ConfirmTripModal({
    closeConfirmModal,
    createTrip,
    setOwnerEmail,
    setOwnerName
  }: ConfirmTripModalProps) {
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>

              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Confirmar criação de viagem</h2>
                <button onClick={closeConfirmModal}>
                  <X className='size-5 text-zinc-400'></X>
                </button>
              </div>
              <p className='text-sm text-zinc-400'>Para concluir a criação da viagem para<span className='font-semibold text-zinc-100'> Florianópolis, Brasil</span> nas datas de <span className='font-semibold text-zinc-100'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>

          
            <form onSubmit={createTrip} className='space-y-3'>
              <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg items-center flex gap-2'>
                <User className='text-zinc-400 size-5'/>
                <input 
                  onChange={event => setOwnerName(event.target.value)}
                  type="text"
                  name='name' 
                  className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1' 
                  placeholder='Seu nome completo'/>
              </div>
              <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg items-center flex gap-2'>
                <AtSign className='text-zinc-400 size-5'></AtSign>
                <input 
                  onChange={event => setOwnerEmail(event.target.value)}
                  type="email"
                  name='email' 
                  className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1' 
                  placeholder='Seu email pessoal'/>
              </div>
              <button  type='submit' className='w-full justify-center bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400'>
                Confirmar criação da viagem
                <Plus className=' size-5'/>
              </button>

            </form>

          </div>
        </div>
    )
}