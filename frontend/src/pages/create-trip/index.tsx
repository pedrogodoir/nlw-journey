
import { FormEvent, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useNavigate } from 'react-router-dom'
import { ConfirmTripModal } from './confirm-trip-modal'
import { InviteGuestModal } from './invite-guest-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestStep } from './steps/invite-guest-step'
import { api } from '../../lib/axios'

export function CreateTrip() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [ eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  const [emailToInvite, setEmailToinvite] = useState([''])

  const navigate = useNavigate()

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

  function openConfirmModal() {
    setConfirmModalOpen(true)
  }
  function closeConfirmModal() {
    setConfirmModalOpen(false)
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

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log(destination)
    console.log(ownerEmail)
    console.log(ownerName)
    console.log(emailToInvite)
    console.log(eventStartAndEndDates?.from)
    console.log(eventStartAndEndDates?.to)

    if(!destination) {
      return
    }

    if(!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if(emailToInvite.length === 0) {
      return
    }

    if(!ownerName  || !ownerEmail) {
      return
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailToInvite,
      owner_name: ownerName,
      owner_mail: ownerEmail,
    })
    
    const { tripId } = response.data

    navigate(`/trips/${tripId}`)

  }

  return (
    <div className=" h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">

      <div className=" max-w-3xl w-full px-6 text-center space-y-10 gap-3">
        <div className=' flex flex-col items-center'>
          <img src="/logo.svg" alt="plann.er" />
        </div>

        <div className=' space-y-4'>

          <DestinationAndDateStep 
            closeGuestInput={closeGuestInput}
            isGuestInputOpen={isGuestInputOpen}
            openGuestInput={openGuestInput}
            setDestination={setDestination}
            setEventStartAndEndDates={setEventStartAndEndDates}
            eventStartAndEndDates={eventStartAndEndDates}
          />

          { isGuestInputOpen && (
            <InviteGuestStep
              openConfirmModal={openConfirmModal}
              openGuestModal={openGuestModal}
              emailToInvite={emailToInvite}
            />
          )}

        </div>

        <p className=" text-zinc-500 text-sm">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
        com nossos <a href="" className=" text-zinc-300 underline">termos de uso</a> e <a href="" className=" text-zinc-300 underline">políticas de privacidade
        </a>.</p>
      </div>

      {isGuestModalOpen && (
        <InviteGuestModal 
          emailToInvite={emailToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestModal={closeGuestModal}
          removeEmailFromInvite={removeEmailFromInvite}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmTripModal 
          closeConfirmModal={closeConfirmModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}

    </div>
  )
}