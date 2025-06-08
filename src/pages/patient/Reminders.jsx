"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { 
  RefreshCw, 
  Plus, 
  Calendar, 
  Pill, 
  Stethoscope, 
  AlertCircle,
  Search,
  HelpCircle,
  Filter,
  Clock,
  Star,
  CheckCircle2
} from "lucide-react"
import { ReminderForm } from "@/components/reminders/ReminderForm"
import { ReminderCard } from "@/components/reminders/ReminderCard"
import { ReminderCalendar } from "@/components/reminders/ReminderCalendar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

export default function Reminders() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAddForm, setShowAddForm] = useState(false)
  const [reminders, setReminders] = useState([])
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPriority, setFilterPriority] = useState("all")
  const [showHelp, setShowHelp] = useState(false)
  const { toast } = useToast()

  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    type: "medication",
    time: "",
    date: "",
    frequency: "once",
    priority: "medium",
  })

  // Add new state for statistics
  const [showStats, setShowStats] = useState(false)

  // Load reminders from localStorage on component mount
  useEffect(() => {
    const savedReminders = localStorage.getItem('medicalReminders')
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders))
    }
  }, [])

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('medicalReminders', JSON.stringify(reminders))
  }, [reminders])

  // Filter reminders based on search query and priority
  const filteredReminders = reminders.filter(reminder => {
    const matchesSearch = reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reminder.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = filterPriority === "all" || reminder.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  // Quick add reminder
  const quickAddReminder = (type) => {
    setNewReminder({
      ...newReminder,
      type,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5)
    })
    setShowAddForm(true)
  }

  // Handle Google Calendar sync
  const handleGoogleCalendarSync = async () => {
    setIsSyncing(true)
    setSyncStatus(null)
    
    try {
      const isAuthenticated = await checkGoogleAuth()
      
      if (!isAuthenticated) {
        await initiateGoogleAuth()
        return
      }

      const response = await syncWithGoogleCalendar(reminders)
      
      if (response.success) {
        setSyncStatus('success')
        toast({
          title: "Sync Successful",
          description: "Your reminders have been synced with Google Calendar",
        })
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      setSyncStatus('error')
      toast({
        title: "Sync Failed",
        description: error.message || "Failed to sync with Google Calendar",
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  // Add a new reminder
  const handleAddReminder = () => {
    const reminder = {
      id: Date.now(),
      ...newReminder,
      status: "active",
      completed: false,
      googleCalendarEventId: null,
    }
    setReminders([...reminders, reminder])
    setNewReminder({
      title: "",
      description: "",
      type: "medication",
      time: "",
      date: "",
      frequency: "once",
      priority: "medium",
    })
    setShowAddForm(false)

    toast({
      title: "Reminder Added",
      description: "Your reminder has been added successfully",
    })
  }

  // Toggle reminder completion
  const toggleComplete = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    )
  }

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + N to add new reminder
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        setShowAddForm(true)
      }
      // Ctrl/Cmd + F to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        document.querySelector('input[placeholder="Search reminders..."]')?.focus()
      }
      // Ctrl/Cmd + H to show help
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault()
        setShowHelp(true)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Calculate statistics
  const stats = {
    total: reminders.length,
    completed: reminders.filter(r => r.completed).length,
    upcoming: reminders.filter(r => !r.completed && new Date(r.date) > new Date()).length,
    overdue: reminders.filter(r => !r.completed && new Date(r.date) < new Date()).length,
    byType: {
      medication: reminders.filter(r => r.type === 'medication').length,
      appointment: reminders.filter(r => r.type === 'appointment').length,
      followUp: reminders.filter(r => r.type === 'follow-up').length,
    },
    byPriority: {
      high: reminders.filter(r => r.priority === 'high').length,
      medium: reminders.filter(r => r.priority === 'medium').length,
      low: reminders.filter(r => r.priority === 'low').length,
    }
  }

  // Mark all as complete
  const markAllAsComplete = () => {
    setReminders(reminders.map(reminder => ({ ...reminder, completed: true })))
    toast({
      title: "All Reminders Completed",
      description: "All reminders have been marked as complete",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-green-100">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Medical Reminders</h1>
            <p className="text-gray-600">Manage your medications, appointments, and follow-ups</p>
          </div>
          <div className="flex gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => setShowStats(true)} className="bg-white/80 hover:bg-white border-green-200">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  Stats
                </Button>
              </TooltipTrigger>
              <TooltipContent>View reminder statistics</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => setShowHelp(true)} className="bg-white/80 hover:bg-white border-green-200">
                  <HelpCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Help
                </Button>
              </TooltipTrigger>
              <TooltipContent>Get help using reminders</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleGoogleCalendarSync} disabled={isSyncing} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                  <RefreshCw className={cn("w-4 h-4 mr-2", isSyncing && "animate-spin")} />
                  Sync Calendar
                </Button>
              </TooltipTrigger>
              <TooltipContent>Sync with Google Calendar</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
            <Input
              placeholder="Search reminders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-green-200 focus:border-green-500 focus:ring-green-500 shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterPriority === "all" ? "default" : "outline"}
              onClick={() => setFilterPriority("all")}
              className={cn(
                filterPriority === "all" 
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700" 
                  : "bg-white/80 hover:bg-white border-green-200"
              )}
            >
              All
            </Button>
            <Button
              variant={filterPriority === "high" ? "default" : "outline"}
              onClick={() => setFilterPriority("high")}
              className={cn(
                filterPriority === "high" 
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700" 
                  : "bg-white/80 hover:bg-white border-green-200 text-red-600"
              )}
            >
              High
            </Button>
            <Button
              variant={filterPriority === "medium" ? "default" : "outline"}
              onClick={() => setFilterPriority("medium")}
              className={cn(
                filterPriority === "medium" 
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700" 
                  : "bg-white/80 hover:bg-white border-green-200 text-yellow-600"
              )}
            >
              Medium
            </Button>
            <Button
              variant={filterPriority === "low" ? "default" : "outline"}
              onClick={() => setFilterPriority("low")}
              className={cn(
                filterPriority === "low" 
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700" 
                  : "bg-white/80 hover:bg-white border-green-200 text-green-600"
              )}
            >
              Low
            </Button>
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            variant="outline"
            className="h-auto py-6 bg-white/80 backdrop-blur-sm hover:bg-white border-green-200 shadow-sm hover:shadow-md transition-all duration-200"
            onClick={() => quickAddReminder("medication")}
          >
            <div className="p-2 rounded-full bg-green-100 mr-3">
              <Pill className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Quick Add Medication</div>
              <div className="text-sm text-gray-500">Add a medication reminder</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 bg-white/80 backdrop-blur-sm hover:bg-white border-green-200 shadow-sm hover:shadow-md transition-all duration-200"
            onClick={() => quickAddReminder("appointment")}
          >
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Quick Add Appointment</div>
              <div className="text-sm text-gray-500">Schedule a medical appointment</div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 bg-white/80 backdrop-blur-sm hover:bg-white border-green-200 shadow-sm hover:shadow-md transition-all duration-200"
            onClick={() => quickAddReminder("follow-up")}
          >
            <div className="p-2 rounded-full bg-purple-100 mr-3">
              <Stethoscope className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Quick Add Follow-up</div>
              <div className="text-sm text-gray-500">Set a follow-up reminder</div>
            </div>
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-green-100 shadow-sm">
          <Tabs defaultValue="upcoming" className="p-4">
            <TabsList className="grid w-full grid-cols-3 bg-green-50/50 p-1 rounded-lg">
              <TabsTrigger 
                value="upcoming" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-600"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-600"
              >
                All Reminders
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-green-600"
              >
                Calendar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              {filteredReminders.length === 0 ? (
                <Alert className="bg-green-50/50 border-green-200">
                  <AlertCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-gray-900">No reminders found</AlertTitle>
                  <AlertDescription className="text-gray-600">
                    {searchQuery || filterPriority !== "all"
                      ? "Try adjusting your search or filters"
                      : "Click the + button to add your first reminder"}
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <div className="flex justify-end mb-4">
                    <Button
                      variant="outline"
                      onClick={markAllAsComplete}
                      className="text-sm bg-white/80 hover:bg-white border-green-200"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                      Mark All as Complete
                    </Button>
                  </div>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {filteredReminders.map((reminder) => (
                        <ReminderCard
                          key={reminder.id}
                          reminder={reminder}
                          toggleComplete={toggleComplete}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </>
              )}
            </TabsContent>

            <TabsContent value="all" className="mt-6">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {filteredReminders.map((reminder) => (
                    <ReminderCard
                      key={reminder.id}
                      reminder={reminder}
                      toggleComplete={toggleComplete}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <ReminderCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                reminders={reminders}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Reminder Form Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Reminder</DialogTitle>
          </DialogHeader>
          <ReminderForm
            reminder={newReminder}
            setReminder={setNewReminder}
            onSubmit={handleAddReminder}
            onCancel={() => setShowAddForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Help Dialog */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>How to Use Reminders</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Quick Add</h3>
              <p className="text-sm text-muted-foreground">
                Use the quick add buttons to quickly create common types of reminders.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Search & Filter</h3>
              <p className="text-sm text-muted-foreground">
                Use the search bar to find specific reminders and filters to sort by priority.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Calendar Sync</h3>
              <p className="text-sm text-muted-foreground">
                Sync your reminders with Google Calendar to never miss an important appointment.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Stats Dialog */}
      <Dialog open={showStats} onOpenChange={setShowStats}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Reminder Statistics</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <h3 className="text-sm font-medium text-gray-500">Total</h3>
              <p className="text-2xl font-bold">{stats.total}</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-gray-500">Upcoming</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-gray-500">Overdue</h3>
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">By Type</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Medication</span>
                  <span className="font-medium">{stats.byType.medication}</span>
                </div>
                <div className="flex justify-between">
                  <span>Appointment</span>
                  <span className="font-medium">{stats.byType.appointment}</span>
                </div>
                <div className="flex justify-between">
                  <span>Follow-up</span>
                  <span className="font-medium">{stats.byType.followUp}</span>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">By Priority</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>High</span>
                  <span className="font-medium text-red-600">{stats.byPriority.high}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium</span>
                  <span className="font-medium text-yellow-600">{stats.byPriority.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span>Low</span>
                  <span className="font-medium text-green-600">{stats.byPriority.low}</span>
                </div>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}