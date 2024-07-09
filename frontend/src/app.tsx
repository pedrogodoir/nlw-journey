import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus } from 'lucide-react'
import { FormEvent, useState } from 'react'

export function App() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)

  const [emailToInvite, setEmailToinvite] = useState([
    'pedro@gmail.com'
  ])

  function openGuestInput() {
    setIsGuestInputOpen(true)
  }
  function closeGuestInput() {
    setIsGuestInputOpen(false)
  }
  
  function openGuestModal() {
    setIsGuestModalOpen(true)
  }
  function closeGuestModal() {
    setIsGuestModalOpen(false)
  }
  
  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if(!email) {
      return
    }

    if(emailToInvite.includes(email)) {
      return
    }

    setEmailToinvite([
      ...emailToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvite(emailToRemove: string) {
    const newEmailList = emailToInvite.filter(email => email !== emailToRemove)
    setEmailToinvite(newEmailList)
  }

  return (
    <div className=" h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">

      <div className=" max-w-3xl w-full px-6 text-center space-y-10 gap-3">
        <div className=' flex flex-col items-center'>
          <img src="/logo.svg" alt="plann.er" />
        </div>

        <div className=' space-y-4'>

          <div className=" h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape">

            <div className=" flex items-center gap-2 flex-1">
              <MapPin className=" size-5 text-zinc-400"></MapPin>
              <input disabled={isGuestInputOpen} type="text" placeholder="Para onde você vai?"className=" bg-transparent text-lg placeholder-zinc-400 outline-none"/>
            </div>

            <div className=" flex items-center gap-2 flex-1">
              <Calendar className="size-5 text-zinc-400"></Calendar>
              <input disabled={isGuestInputOpen} type="text" placeholder="Quando?"className=" bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"/>
            </div>

            <div className=' w-px h-6 bg-zinc-800'></div>
            
            { isGuestInputOpen ? 
              (<button onClick={closeGuestInput} className=' bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-22 hover:bg-zinc-700'>
                Alterar Local/Data
                <Settings2></Settings2>
              </button>)
              :
              (<button className=' bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-22 hover:bg-lime-400'
              onClick={openGuestInput}
              >
                Confirmar
                <ArrowRight className=' size-5'></ArrowRight>
              </button>)
            }

          </div>

          { isGuestInputOpen && (
            <div className=" h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape">

            <button onClick={openGuestModal} className=" flex items-center gap-2 flex-1">
              <UserRoundPlus className=" size-5 text-zinc-400"></UserRoundPlus>
              <span className='text-zinc-400 text-lg flex-1 text-left'>Quem estará na viagem?</span>
            </button>

            <div className=' w-px h-6 bg-zinc-800'></div>
            
            <button className=' bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-22 hover:bg-lime-400'>
              Confirmar Viagem  
              <ArrowRight className=' size-5'></ArrowRight>
            </button>

          </div>
          )}
        </div>

        <p className=" text-zinc-500 text-sm">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
        com nossos <a href="" className=" text-zinc-300 underline">termos de uso</a> e <a href="" className=" text-zinc-300 underline">políticas de privacidade
        </a>.</p>
      </div>

      {isGuestModalOpen && (
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
      )}

    </div>
  )
}