import { useState, useEffect, useRef } from 'react'
import { 
  Calendar, 
  Clock, 
  FileText, 
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'

const CalendarPage = () => {
  const [visibleElements, setVisibleElements] = useState(new Set())
  const elementsRef = useRef({})
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(elementsRef.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      Object.values(elementsRef.current).forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  const events = [
    {
      id: 1,
      title: 'Contract Review Meeting',
      time: '10:00 AM',
      date: '2024-01-25',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Agreement Deadline',
      time: '5:00 PM',
      date: '2024-01-26',
      type: 'deadline'
    },
    {
      id: 3,
      title: 'Client Call',
      time: '2:00 PM',
      date: '2024-01-27',
      type: 'call'
    }
  ]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-sealia-forest mb-2">Calendar</h1>
            <p className="text-gray-600">Track your agreements and important dates.</p>
          </div>
          <button className="px-4 py-2 bg-sealia-mint text-sealia-forest font-semibold rounded-lg hover:bg-sealia-mint/80 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div 
            ref={el => elementsRef.current['calendar'] = el}
            className={`bg-white rounded-3xl p-8 border border-sealia-mint/20 shadow-lg transition-all duration-700 ${
              visibleElements.has('calendar') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-sealia-forest">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 hover:bg-sealia-mint/20 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-sealia-forest" />
                </button>
                <button 
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 hover:bg-sealia-mint/20 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-sealia-forest" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <div 
                  key={index}
                  className={`p-2 h-12 flex items-center justify-center text-sm rounded-lg ${
                    day 
                      ? 'hover:bg-sealia-mint/20 cursor-pointer' 
                      : ''
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div 
            ref={el => elementsRef.current['events'] = el}
            className={`bg-white rounded-3xl p-8 border border-sealia-mint/20 shadow-lg transition-all duration-700 ${
              visibleElements.has('events') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-xl font-bold text-sealia-forest mb-6">Upcoming Events</h3>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-4 border border-sealia-mint/20 rounded-xl hover:bg-sealia-mint/5 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      event.type === 'meeting' ? 'bg-blue-100' :
                      event.type === 'deadline' ? 'bg-red-100' :
                      'bg-green-100'
                    }`}>
                      <Calendar className={`h-5 w-5 ${
                        event.type === 'meeting' ? 'text-blue-600' :
                        event.type === 'deadline' ? 'text-red-600' :
                        'text-green-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sealia-forest">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.date}</p>
                      <p className="text-sm text-gray-500 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CalendarPage

