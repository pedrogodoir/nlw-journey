import { format } from "date-fns";
import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";


interface DestinationAndDateStepProps {
    isGuestInputOpen: boolean
    closeGuestInput: () => void
    openGuestInput: () => void
    setDestination: (destination: string) => void
    setEventStartAndEndDates: (date: DateRange | undefined) => void
    eventStartAndEndDates: DateRange | undefined
    
}

export function DestinationAndDateStep ({
        isGuestInputOpen,
        closeGuestInput,
        openGuestInput,
        setDestination,
        setEventStartAndEndDates,
        eventStartAndEndDates
    }: DestinationAndDateStepProps) {
      const [ isDatePickerOpen, setIsDatePickerOpen ] = useState(false)

      function openDatePicker() {
        return setIsDatePickerOpen(true)
      }
      function closeDatePicker() {
        return setIsDatePickerOpen(false)
      }

      const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to ? 
      format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null

    return (
        <div className=" h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape">

            <div className=" flex items-center gap-2 flex-1">
              <MapPin className=" size-5 text-zinc-400"></MapPin>
              <input 
              disabled={isGuestInputOpen} 
              onChange={event => setDestination(event.target.value)}
              type="text" 
              placeholder="Para onde você vai?"
              className=" bg-transparent text-lg placeholder-zinc-400 outline-none"/>
            </div>

            <button onClick={openDatePicker} disabled={isGuestInputOpen} className=" flex items-center gap-2 flex-1 outline-none text-left">
              <Calendar className="size-5 text-zinc-400"></Calendar>
              <span className=" text-lg text-zinc-400 w-40 flex-1">
                {displayedDate || "Quando?"}
              </span>
            </button>

            {isDatePickerOpen && (
              <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                <div className=' rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <h2 className='text-lg font-semibold'>Selecione a data</h2>
                      <button onClick={closeDatePicker}>
                        <X className='size-5 text-zinc-400'></X>
                      </button>
                    </div>
                  </div>

                  <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates}/>

                  </div>
                  
                  <div className='w-ful h-px bg-zinc-800'></div>

              </div>
            )}

            <div className=' w-px h-6 bg-zinc-800'></div>
            
            { isGuestInputOpen ? 
              (<button onClick={closeGuestInput} className=' bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-22 hover:bg-zinc-700'>
                Alterar Local/Data
                <Settings2></Settings2>
              </button>
               )
              :
              (<button className=' bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-22 hover:bg-lime-400'
              onClick={openGuestInput}
              >
                Continuar
                <ArrowRight className=' size-5'></ArrowRight>
              </button>)
            }

          </div>
    )
}