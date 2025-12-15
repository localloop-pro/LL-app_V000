"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  User,
  Phone,
  MapPin,
  ShoppingCart,
  Gift,
  Home,
  Percent,
  Coffee,
  Info,
  Globe,
  Heart,
  Star,
  Share2,
  Users,
  Plus,
  Handshake,
  Pencil,
  Check,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EmailInviteForm } from "../email-invite-form"
import { ReviewForm } from "../review-form"
import { ReviewsList } from "../reviews-list"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BusinessData {
  name: string
  category: string
  owner: string
  phone: string
  address: {
    street: string
    postcode: string
    city: string
    country: string
  }
}

export default function BusinessCard() {
  const { toast } = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [rating, setRating] = useState(0)
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [showReviews, setShowReviews] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [viewCount, setViewCount] = useState(0)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [hasJobOffers] = useState(true)
  const [vipCount, setVipCount] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showSellerCode, setShowSellerCode] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<BusinessData | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  const currentUser = {
    id: "current",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setViewCount((prev) => prev + 1)
  }, [])

  const calculateAverageRating = () => {
    const reviews = [{ rating: 5 }, { rating: 4 }]
    const total = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (total / reviews.length).toFixed(1)
  }

  const handleReviewSubmit = (review: { rating: number; text: string }) => {
    console.log("Review submitted:", review)
    setShowReviewForm(false)
  }

  const handleLikeClick = () => {
    if (isLoggedIn) {
      setIsLiked(!isLiked)
      toast({
        title: !isLiked ? "Following Business Name" : "Unfollowed Business Name",
        description: !isLiked ? "You are now following this business" : "You have unfollowed this business",
      })
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setIsLoggedIn(true)
      setShowLoginDialog(false)
      setEmail("")
      setPassword("")
      toast({
        title: "Welcome back!",
        description: "You are now logged in as a VIP member",
      })
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerName && registerEmail && registerPassword) {
      setTimeout(() => {
        setIsLoggedIn(true)
        setShowLoginDialog(false)
        setRegisterName("")
        setRegisterEmail("")
        setRegisterPassword("")
        toast({
          title: "Account Created!",
          description: `Welcome to the VIP club, ${registerName}!`,
        })
      }, 500)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowDropdown(false)
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  const verifySellerCode = async (
    code: string,
    phoneNumber: string,
  ): Promise<{ success: boolean; message: string; businessData?: BusinessData }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code === "123456") {
          resolve({
            success: true,
            message: "Verification successful!",
            businessData: {
              name: "Business Name",
              category: "Category",
              owner: "DEVON LANE",
              phone: "041810000",
              address: {
                street: "03/24 VAL ST",
                postcode: "2000",
                city: "SYD",
                country: "AU",
              },
            },
          })
        } else {
          resolve({ success: false, message: "Invalid verification code." })
        }
      }, 500)
    })
  }

  const updateBusinessData = async (data: BusinessData): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Updated data:", data)
        resolve({ success: true })
      }, 500)
    })
  }

  const handleVerification = async () => {
    const result = await verifySellerCode(verificationCode, "041810000")
    toast({
      title: result.success ? "Verification Successful" : "Verification Failed",
      description: result.message,
    })

    if (result.success && result.businessData) {
      setIsVerified(true)
      setEditData(result.businessData)
      setShowSellerCode(false)
      setVerificationCode("")
    }
  }

  const handleSave = async () => {
    if (!editData) return

    setIsSaving(true)
    const result = await updateBusinessData(editData)
    setIsSaving(false)

    if (result.success) {
      setIsEditing(false)
      toast({
        title: "Changes Saved",
        description: "Your business information has been updated",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to save changes",
      })
    }
  }

  const renderSearchIcon = () => (
    <div className="bg-white p-1 rounded-full relative">
      <MapPin size={20} className="text-gray-700" />
      <button
        onClick={() => setIsAdminMode(!isAdminMode)}
        className={`absolute -top-1 -right-1 rounded-full p-1 transition-colors ${
          isAdminMode ? "bg-blue-500" : "bg-gray-400"
        }`}
        title="Toggle Admin Mode"
      >
        <Pencil size={12} className="text-white" />
      </button>
      {isVerified && (
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute -bottom-1 -right-1 bg-amber-400 rounded-full p-1"
        >
          {isEditing ? <Check size={12} className="text-white" /> : <Pencil size={12} className="text-white" />}
        </button>
      )}
    </div>
  )

  const EditableField = ({
    value,
    onChange,
    label,
    disabled = !isEditing,
    className = "",
  }: {
    value: string
    onChange: (value: string) => void
    label: string
    disabled?: boolean
    className?: string
  }) => (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`
        ${
          disabled
            ? "bg-transparent border-0 p-0 h-auto text-white resize-none"
            : "bg-white/95 border border-gray-300 text-gray-900 placeholder:text-gray-500 text-xs h-6 px-2 py-1 rounded shadow-sm"
        } 
        ${className}
      `}
      placeholder={label}
    />
  )

  const toggleSection = (sectionName: string) => {
    setActiveSection(activeSection === sectionName ? null : sectionName)
  }

  const renderBusinessInfo = () => {
    if (editData) {
      return (
        <div className="space-y-1 max-w-[200px]">
          <EditableField
            value={editData.name}
            onChange={(value) => setEditData({ ...editData, name: value })}
            label="Business Name"
            className="font-semibold"
          />
          <EditableField
            value={editData.category}
            onChange={(value) => setEditData({ ...editData, category: value })}
            label="Category"
          />
          <div className="mt-2 space-y-1">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3 text-white flex-shrink-0" />
              <EditableField
                value={editData.owner}
                onChange={(value) => setEditData({ ...editData, owner: value })}
                label="Owner Name"
              />
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="w-3 h-3 text-white flex-shrink-0" />
              <EditableField
                value={editData.phone}
                onChange={(value) => setEditData({ ...editData, phone: value })}
                label="Phone"
              />
            </div>
            <div className="flex items-start space-x-1">
              <MapPin className="w-3 h-3 text-white flex-shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1 max-w-[160px]">
                <EditableField
                  value={editData.address.street}
                  onChange={(value) =>
                    setEditData({
                      ...editData,
                      address: { ...editData.address, street: value },
                    })
                  }
                  label="Street"
                />
                <div className="flex space-x-1">
                  <EditableField
                    value={editData.address.postcode}
                    onChange={(value) =>
                      setEditData({
                        ...editData,
                        address: { ...editData.address, postcode: value },
                      })
                    }
                    label="Code"
                    className="w-12"
                  />
                  <EditableField
                    value={editData.address.city}
                    onChange={(value) =>
                      setEditData({
                        ...editData,
                        address: { ...editData.address, city: value },
                      })
                    }
                    label="City"
                    className="w-16"
                  />
                  <EditableField
                    value={editData.address.country}
                    onChange={(value) =>
                      setEditData({
                        ...editData,
                        address: { ...editData.address, country: value },
                      })
                    }
                    label="Country"
                    className="w-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <h2 className="text-white text-2xl font-bold">Business Name</h2>
        <p className="text-white text-sm">Category</p>
        <div className="mt-3 space-y-[5px] text-white">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>DEVON LANE</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            <span className="text-[13px]">041810000</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-[13px]">
              03/24 VAL ST
              <br />
              2000, SYD, AU
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[414px] mx-auto font-sans fixed top-0 left-1/2 -translate-x-1/2 mt-[10px]">
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg w-[414px]">
        {/* Top Navigation Bar */}
        <div className="bg-gray-100 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {renderSearchIcon()}
            {isLoggedIn ? (
              <div ref={dropdownRef} className="relative">
                <div
                  className="bg-amber-400 p-1 rounded-full cursor-pointer hover:bg-amber-500 transition-colors"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <User size={20} className="text-white" />
                </div>
                {showDropdown && (
                  <div
                    className="fixed mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-[9999]"
                    style={{ top: "50px", right: "20px" }}
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
          {isLoggedIn ? (
            <button className="px-4 py-1 rounded-full text-sm font-medium bg-amber-400 text-white hover:bg-amber-500 transition-colors">
              VIP Dashboard
            </button>
          ) : (
            <button
              className="px-4 py-1 rounded-full text-sm font-medium bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={() => setShowLoginDialog(true)}
            >
              Follow [ Business Name ]
            </button>
          )}
        </div>

        {/* Main Card Content */}
        <div className="bg-amber-400 p-4 relative rounded-[10px] h-[220px] min-w-[320px] max-w-[414px]">
          {/* Business Info */}
          <div className="flex justify-between">
            <div>{renderBusinessInfo()}</div>
            {/* Credit Card Circles */}
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-600"></div>
              <div className="w-10 h-10 rounded-full bg-red-500 opacity-90"></div>
            </div>
          </div>

          {isEditing && (
            <div className="absolute top-2 right-2 flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="bg-red-500/80 hover:bg-red-600/80 text-white h-6 px-2 text-xs"
              >
                <X className="w-3 h-3 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="bg-green-500/80 hover:bg-green-600/80 text-white h-6 px-2 text-xs"
              >
                {isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Save
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Services Icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/3 bg-amber-300/50 pt-3 pr-3 pl-3 pb-1.5 rounded-lg backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-2">
              <div
                className={`flex items-center cursor-pointer transition-opacity duration-200 ${
                  !hasJobOffers ? "opacity-50" : "hover:opacity-80"
                }`}
                onClick={() => hasJobOffers && toggleSection("jobs")}
                title={hasJobOffers ? "Click to view job offers" : "No job offers available"}
              >
                <Handshake className="w-6 h-6 text-white" />
                <span className="text-xs text-white ml-1">{hasJobOffers ? "01" : "00"}</span>
              </div>
              <div
                className="flex items-center cursor-pointer transition-opacity duration-200 hover:opacity-80"
                onClick={() => toggleSection("products")}
                title="Click to view products"
              >
                <ShoppingCart className="w-6 h-6 text-white" />
                <span className="text-xs text-white ml-1">01</span>
              </div>
              <div className="flex items-center">
                <Gift className="w-6 h-6 text-white" />
                <span className="text-xs text-white ml-1">01</span>
              </div>
              <div className="flex items-center">
                <Home className="w-6 h-6 text-white" />
                <span className="text-xs text-white ml-1">01</span>
              </div>
              <div className="flex items-center">
                <Percent className="w-6 h-6 text-white" />
                <span className="text-xs text-white ml-1">01</span>
              </div>
              <div className="flex items-center">
                <Coffee className="w-6 h-6 text-white" />
                <span className="text-xs text-white ml-1">01</span>
              </div>
            </div>
          </div>

          {/* Bottom Icons */}
          <div className="absolute bottom-2 right-4 flex">
            <div className="bg-white p-1 rounded-full mr-2">
              <Info size={16} className="text-amber-500" />
            </div>
            <div className="bg-white p-1 rounded-full">
              <Globe size={16} className="text-amber-500" />
            </div>
          </div>
        </div>

        {/* Card Stats */}
        <div className="bg-gray-800 text-white p-2 flex justify-between items-center rounded-t-[5px] min-w-[320px] max-w-[414px]">
          <div className="flex items-center space-x-2">
            <span className="text-xs">{viewCount}</span>
            <span className="text-[10px] capitalize">Views</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-xs">G</div>
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-xs">f</div>
              <div className="w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center text-xs">in</div>
              <div className="w-4 h-4 rounded-full bg-blue-300 flex items-center justify-center text-xs">t</div>
            </div>
            {isLoggedIn ? (
              <button className="ml-2" onClick={handleLikeClick}>
                <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
              </button>
            ) : (
              <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
                <DialogTrigger asChild>
                  <button className="ml-2">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Become a VIP</DialogTitle>
                    <DialogDescription>Follow Business Name and get exclusive VIP benefits!</DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Login
                        </Button>
                        <div className="mt-2 text-center">
                          <a
                            href="#"
                            className="text-sm text-amber-600 hover:text-amber-700 hover:underline"
                            onClick={(e) => {
                              e.preventDefault()
                              setShowLoginDialog(false)
                              setShowSellerCode(true)
                            }}
                          >
                            Login as a Seller
                          </a>
                        </div>
                      </form>
                    </TabsContent>
                    <TabsContent value="register">
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="reg-name">Full Name</Label>
                          <Input
                            id="reg-name"
                            type="text"
                            placeholder="Enter your full name"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-email">Email</Label>
                          <Input
                            id="reg-email"
                            type="email"
                            placeholder="Enter your email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-password">Password</Label>
                          <Input
                            id="reg-password"
                            type="password"
                            placeholder="Create a password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                          Create Account
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="flex items-center">
            <span className="text-xs mr-1">{calculateAverageRating()} Stars - (2)</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Number(calculateAverageRating()) ? "fill-yellow-400 text-yellow-400" : "text-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Seller Code Form */}
        {showSellerCode && (
          <div className="bg-gray-800 p-4 animate-slide-down">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">Send Verification Code</h3>
                <button onClick={() => setShowSellerCode(false)} className="text-gray-400 hover:text-white">
                  X
                </button>
              </div>
              <p className="text-sm text-gray-300">Enter the code to verify your seller account for: 041810000</p>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Button onClick={handleVerification} className="bg-amber-500 hover:bg-amber-600 text-white">
                  Verify
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="relative bg-gray-700 text-white flex justify-between p-2 min-w-[320px] max-w-[414px] h-[30px]">
          <button
            className="flex items-center hover:text-amber-400 transition-colors transform-gpu scale-95 text-[12px]"
            onClick={() => setShowInviteForm(!showInviteForm)}
          >
            <Users className="w-5 h-5 mr-1" /> Invite
          </button>
          <button
            className="flex items-center hover:text-amber-400 transition-colors transform-gpu scale-95 text-[12px]"
            onClick={() => {
              setShowReviews(!showReviews)
              if (!showReviews) {
                setShowReviewForm(false)
              }
            }}
          >
            <span className="mr-1">Reviews</span>
          </button>
          <button className="flex items-center hover:text-amber-400 transition-colors transform-gpu scale-95 text-[12px]">
            <Share2 className="w-5 h-5 mr-1" /> Share
          </button>
        </div>

        {/* Invite Form */}
        {showInviteForm && <EmailInviteForm onClose={() => setShowInviteForm(false)} />}

        {/* Reviews Section */}
        {showReviews && (
          <div className="min-w-[320px] max-w-[414px]">
            {!showReviewForm && (
              <div className="bg-gray-800 p-4 border-t border-gray-700 min-w-[320px] max-w-[414px]">
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg flex items-center justify-between px-4"
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    <span className="font-medium">VIP</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Write a Review
                  </div>
                </button>
              </div>
            )}

            {showReviewForm && (
              <ReviewForm
                onSubmit={handleReviewSubmit}
                onClose={() => setShowReviewForm(false)}
                isLoggedIn={isLoggedIn}
              />
            )}

            <ReviewsList />
          </div>
        )}

        {/* VIPs Section */}
        {isLoggedIn && (
          <div className="bg-gray-700 text-white p-9 flex items-center min-w-[320px] max-w-[414px] max-h-[29px]">
            <span className="mr-4">{isLiked ? vipCount + 1 : vipCount}</span>
            <span className="mr-4 text-[13px]">VIP'S</span>
            <div className="flex -space-x-2">
              {(() => {
                if (!isLiked) {
                  return (
                    <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                      <span className="text-xs">...</span>
                    </div>
                  )
                }

                const vipList = [
                  currentUser,
                  ...Array(vipCount)
                    .fill(null)
                    .map((_, i) => ({
                      id: `vip-${i}`,
                      avatar: "/placeholder.svg?height=32&width=32",
                    })),
                ]

                return (
                  <>
                    {vipList.slice(0, vipCount + 1).map((vip) => (
                      <div
                        key={vip.id}
                        className="w-8 h-8 rounded-full bg-gray-500 border border-gray-700 overflow-hidden"
                      >
                        <img
                          src={vip.avatar || "/placeholder.svg"}
                          alt={vip.id === "current" ? "Your profile" : `VIP ${vip.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {vipCount > 0 && (
                      <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                        <span className="text-xs">...</span>
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          </div>
        )}

        {/* Promo and Services */}
        {isAdminMode && (
          <div className="bg-gray-100 p-4 flex justify-between max-w-[414px]">
            <div>
              <h3 className="text-gray-500 font-bold tracking-widest text-[11px]">PROMO</h3>
            </div>
            <div>
              <h3 className="text-gray-500 font-bold tracking-widest flex items-center text-[11px]">
                <Plus size={16} className="mr-1" /> SERVICES
              </h3>
            </div>
          </div>
        )}

        {/* Jobs Section */}
        {activeSection === "jobs" && hasJobOffers && (
          <div className="bg-gray-50 p-4 animate-slide-up">
            <h3 className="text-gray-500 font-bold tracking-widest text-[11px] mb-4">JOBS</h3>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h4 className="font-medium text-gray-900 mb-2">Senior Developer</h4>
              <p className="text-gray-600 text-sm mb-3">
                We are looking for an experienced developer to join our team.
              </p>
              <div className="flex items-center text-gray-500 text-xs">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Sydney, AU</span>
                <span className="mx-2">-</span>
                <span>Full-time</span>
              </div>
              <Button className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white" size="sm">
                Apply
              </Button>
            </div>
          </div>
        )}

        {/* Products Section */}
        {activeSection === "products" && (
          <div className="bg-gray-50 p-4 animate-slide-up">
            <h3 className="text-gray-500 font-bold tracking-widest text-[11px] mb-4">PRODUCTS</h3>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h4 className="font-medium text-gray-900 mb-2">Premium Package</h4>
              <p className="text-gray-600 text-sm mb-3">High-quality product with exclusive features and benefits.</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-amber-600 font-bold text-lg">$49.99</span>
                <span className="text-gray-500 text-xs">In Stock</span>
              </div>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white" size="sm">
                Add to Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
