import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, AlertCircle, Pill, Stethoscope, Tag, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ReminderCard({ reminder, toggleComplete }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case "medication":
        return <Pill className="w-5 h-5 text-green-600" />
      case "appointment":
        return <Calendar className="w-5 h-5 text-blue-600" />
      case "follow-up":
        return <Stethoscope className="w-5 h-5 text-purple-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-green-500 bg-green-50"
      default:
        return "border-gray-200 bg-white"
    }
  }

  const getPriorityText = (priority) => {
    switch (priority) {
      case "high":
        return "High Priority"
      case "medium":
        return "Medium Priority"
      case "low":
        return "Low Priority"
      default:
        return "Normal Priority"
    }
  }

  const getFrequencyText = (frequency) => {
    switch (frequency) {
      case "once":
        return "One-time"
      case "daily":
        return "Daily"
      case "weekly":
        return "Weekly"
      case "monthly":
        return "Monthly"
      default:
        return frequency
    }
  }

  return (
    <div className={`p-4 rounded-lg border-l-4 ${getPriorityColor(reminder.priority)} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={reminder.completed}
          onCheckedChange={() => toggleComplete(reminder.id)}
          className="mt-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              {getTypeIcon(reminder.type)}
              <h3 className={`text-base font-medium ${reminder.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {reminder.title}
              </h3>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {reminder.description && (
            <p className={`text-sm ${reminder.completed ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              {reminder.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(reminder.date).toLocaleDateString()}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Due Date</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{reminder.time}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Due Time</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs">
                  {getFrequencyText(reminder.frequency)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Frequency</TooltipContent>
            </Tooltip>
            {reminder.category && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {reminder.category}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Category</TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    reminder.priority === 'high'
                      ? 'text-red-600 border-red-200 bg-red-50'
                      : reminder.priority === 'medium'
                      ? 'text-yellow-600 border-yellow-200 bg-yellow-50'
                      : 'text-green-600 border-green-200 bg-green-50'
                  }`}
                >
                  {getPriorityText(reminder.priority)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Priority Level</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
} 