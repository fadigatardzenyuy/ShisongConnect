"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  FileText,
  Download,
  Eye,
  Calendar,
  User,
  Building2,
  Pill,
  TestTube,
  Heart,
  Activity,
  Filter,
  Plus,
  Share,
  Lock,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const medicalRecords = [
  {
    id: 1,
    type: "Lab Results",
    title: "Complete Blood Count",
    hospital: "Central Hospital Yaoundé",
    doctor: "Dr. Marie Fotso",
    date: "2024-03-15",
    status: "Normal",
    category: "laboratory",
    description: "Routine blood work showing normal values across all parameters",
    fileSize: "2.4 MB",
    urgent: false,
  },
  {
    id: 2,
    type: "Prescription",
    title: "Hypertension Medication",
    hospital: "Pasteur Clinic Douala",
    doctor: "Dr. Paul Mbarga",
    date: "2024-03-10",
    status: "Active",
    category: "prescription",
    description: "Lisinopril 10mg daily for blood pressure management",
    fileSize: "1.2 MB",
    urgent: false,
  },
  {
    id: 3,
    type: "Consultation Report",
    title: "Cardiology Consultation",
    hospital: "Central Hospital Yaoundé",
    doctor: "Dr. Marie Fotso",
    date: "2024-03-08",
    status: "Completed",
    category: "consultation",
    description: "Follow-up consultation for hypertension management",
    fileSize: "3.1 MB",
    urgent: false,
  },
  {
    id: 4,
    type: "X-Ray",
    title: "Chest X-Ray",
    hospital: "Laquintinie Hospital",
    doctor: "Dr. Jean Kamga",
    date: "2024-02-28",
    status: "Normal",
    category: "imaging",
    description: "Chest X-ray showing clear lungs, no abnormalities detected",
    fileSize: "5.8 MB",
    urgent: false,
  },
  {
    id: 5,
    type: "Vaccination Record",
    title: "COVID-19 Booster",
    hospital: "District Health Center",
    doctor: "Nurse Sarah Biya",
    date: "2024-02-20",
    status: "Completed",
    category: "vaccination",
    description: "COVID-19 booster vaccination administered",
    fileSize: "0.8 MB",
    urgent: false,
  },
]

const vitalSigns = [
  { label: "Blood Pressure", value: "120/80 mmHg", status: "Normal", date: "2024-03-15", icon: Heart },
  { label: "Heart Rate", value: "72 bpm", status: "Normal", date: "2024-03-15", icon: Activity },
  { label: "Temperature", value: "36.8°C", status: "Normal", date: "2024-03-15", icon: TestTube },
  { label: "Weight", value: "70.2 kg", status: "Stable", date: "2024-03-15", icon: User },
]

const prescriptions = [
  {
    id: 1,
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    prescribedBy: "Dr. Marie Fotso",
    date: "2024-03-10",
    status: "Active",
    refillsLeft: 2,
  },
  {
    id: 2,
    medication: "Paracetamol",
    dosage: "500mg",
    frequency: "As needed",
    duration: "7 days",
    prescribedBy: "Dr. Paul Mbarga",
    date: "2024-03-05",
    status: "Completed",
    refillsLeft: 0,
  },
]

export function MedicalRecords() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTimeframe, setSelectedTimeframe] = useState("all")

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.hospital.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || record.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "normal":
      case "completed":
        return "bg-green-100 text-green-700 border-green-200"
      case "active":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "urgent":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "laboratory":
        return TestTube
      case "prescription":
        return Pill
      case "consultation":
        return User
      case "imaging":
        return FileText
      case "vaccination":
        return Heart
      default:
        return FileText
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Medical Records
            </h1>
            <p className="text-green-700">Access and manage your complete health history</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-green-200 hover:bg-green-50">
              <Share className="h-4 w-4 mr-2 text-green-600" />
              Share Records
            </Button>
            <Button className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Upload Record
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                <Input
                  placeholder="Search records, doctors, or hospitals..."
                  className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px] border-green-200">
                  <Filter className="h-4 w-4 mr-2 text-green-600" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="laboratory">Lab Results</SelectItem>
                  <SelectItem value="prescription">Prescriptions</SelectItem>
                  <SelectItem value="consultation">Consultations</SelectItem>
                  <SelectItem value="imaging">Imaging</SelectItem>
                  <SelectItem value="vaccination">Vaccinations</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-[200px] border-green-200">
                  <Calendar className="h-4 w-4 mr-2 text-green-600" />
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-green-50 p-1 rounded-lg">
            <TabsTrigger value="records" className="data-[state=active]:bg-white data-[state=active]:text-green-600">
              All Records
            </TabsTrigger>
            <TabsTrigger value="vitals" className="data-[state=active]:bg-white data-[state=active]:text-green-600">
              Vital Signs
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="data-[state=active]:bg-white data-[state=active]:text-green-600">
              Prescriptions
            </TabsTrigger>
            <TabsTrigger value="summary" className="data-[state=active]:bg-white data-[state=active]:text-green-600">
              Health Summary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            <div className="grid gap-4">
              {filteredRecords.map((record) => {
                const CategoryIcon = getCategoryIcon(record.category)
                return (
                  <Card key={record.id} className="medical-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-green-900">{record.title}</h3>
                              <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                            </div>
                            <p className="text-sm text-green-700 mb-2">{record.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-green-600">
                              <div className="flex items-center">
                                <Building2 className="h-4 w-4 mr-1" />
                                {record.hospital}
                              </div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {record.doctor}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {record.date}
                              </div>
                              <span>{record.fileSize}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50">
                            <Eye className="h-4 w-4 mr-2 text-green-600" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50">
                            <Download className="h-4 w-4 mr-2 text-green-600" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {vitalSigns.map((vital, index) => (
                <Card key={index} className="medical-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                          <vital.icon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-green-900">{vital.label}</h3>
                          <p className="text-sm text-green-600">Last updated: {vital.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-900">{vital.value}</p>
                        <Badge className={getStatusColor(vital.status)}>{vital.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            <div className="grid gap-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="medical-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                          <Pill className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-green-900 mb-1">{prescription.medication}</h3>
                          <p className="text-sm text-green-700 mb-2">
                            {prescription.dosage} - {prescription.frequency}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-green-600">
                            <span>Duration: {prescription.duration}</span>
                            <span>Prescribed by: {prescription.prescribedBy}</span>
                            <span>Date: {prescription.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={getStatusColor(prescription.status)}>{prescription.status}</Badge>
                        {prescription.status === "Active" && (
                          <div className="text-sm text-green-700">
                            <p>Refills left: {prescription.refillsLeft}</p>
                            <Button size="sm" variant="outline" className="mt-2 border-green-200 hover:bg-green-50">
                              Request Refill
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-900">
                    <Lock className="h-5 w-5 mr-2 text-green-600" />
                    Health Summary
                  </CardTitle>
                  <CardDescription className="text-green-700">Overview of your health status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="medical-alert">
                    <h4 className="font-medium text-green-900 mb-2">Current Health Status</h4>
                    <p className="text-sm text-green-700">
                      Overall health is good. Blood pressure is well controlled with current medication. Continue
                      regular follow-ups.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Active Conditions</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Hypertension (controlled)</li>
                      <li>• No other active conditions</li>
                    </ul>
                  </div>
                  <div className="medical-alert">
                    <h4 className="font-medium text-green-900 mb-2">Upcoming Care</h4>
                    <p className="text-sm text-green-700">
                      Next cardiology follow-up scheduled for April 15, 2024. Annual physical exam due in June 2024.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-green-900">Recent Activity</CardTitle>
                  <CardDescription className="text-green-700">Your latest medical interactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium text-green-900">Lab Results Received</p>
                        <p className="text-xs text-green-600">Complete Blood Count - March 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium text-green-900">Prescription Updated</p>
                        <p className="text-xs text-green-600">Lisinopril dosage - March 10, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium text-green-900">Consultation Completed</p>
                        <p className="text-xs text-green-600">Cardiology follow-up - March 8, 2024</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 