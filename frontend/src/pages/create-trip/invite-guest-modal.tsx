import { AtSign, Plus, X } from "lucide-react"
import { FormEvent } from "react"

interface InviteGuestModalProps {
    closeGuestModal: () => void
    emailToInvite: string[]
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
    removeEmailFromInvite: (email: string) => void
  }

export function InviteGuestModal({ 
        addNewEmailToInvite, 
        closeGuestModal, 
        emailToInvite, 
        removeEmailFromInvite 
    }: InviteGuestModalProps) {
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
                <button onClick={closeGuestModal}>
                  <X className='size-5 text-zinc-400'></X>
                </button>
              </div>
              <p className='text-sm text-zinc-400'>Convide seus amigos e planeje sua próxima viagem!</p>
            </div>

            <div className='flex flex-wrap gap-2'>
              {emailToInvite.map(email => {
                return (
                  <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                    <span className='text-zinc-300'>{email}</span>
                    <button onClick={() => removeEmailFromInvite(email)} type='button'>
                      <X className='size-4 text-zinc-400'></X>
                    </button>
                  </div>
                )
              })}
              
            </div>
            
            <div className='w-ful h-px bg-zinc-800'></div>

            <form onSubmit={addNewEmailToInvite} className='p-2.5 bg-zinc-950 border-zinc-800 rounded-lg items-center flex gap-2'>
              <div className='px-2 flex items-center flex-1 gap-2'>
                <AtSign className='text-zinc-400 size-5'></AtSign>
                <input 
                  type="email"
                  name='email' 
                  className='bg-transparent text-lg placeholder-zinc-400 outline-none flex-1' 
                  placeholder='Digite o email do convidado'/>
              </div>
              <button  type='submit' className=' bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400'>
                Convidar  
                <Plus className=' size-5'/>
              </button>

            </form>

          </div>
        </div>
    )
}