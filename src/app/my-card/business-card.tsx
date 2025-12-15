"use client"

import type React from "react"

import { useState } from "react"
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
  Package,
  Tag,
  CreditCard,
  Zap,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EmailInviteForm } from "./email-invite-form"
import { ReviewForm } from "./review-form"
import { ReviewsList } from "./reviews-list"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  const [viewCount] = useState(127) // Simulated view count
  const [showJobs, setShowJobs] = useState(false)
  const [hasJobOffers] = useState(true) // Simulated state for job availability
  const [vipCount, setVipCount] = useState(31)
  const [showServices, setShowServices] = useState(false)
  const [showAddService, setShowAddService] = useState(false)
  const [serviceType, setServiceType] = useState("")
  const [serviceName, setServiceName] = useState("")
  const [serviceDescription, setServiceDescription] = useState("")
  const [servicePrice, setServicePrice] = useState("")
  const [showPromo, setShowPromo] = useState(false)
  const [showAddPromo, setShowAddPromo] = useState(false)
  const [promoType, setPromoType] = useState("")
  const [promoTitle, setPromoTitle] = useState("")
  const [promoDescription, setPromoDescription] = useState("")
  const [promoValue, setPromoValue] = useState("")
  const [promos, setPromos] = useState<
    Array<{
      id: string
      type: string
      title: string
      description: string
      value: string
      icon: React.ReactNode
    }>
  >([])
  const [services, setServices] = useState<
    Array<{
      id: string
      type: string
      name: string
      description: string
      price: string
      icon: React.ReactNode
    }>
  >([])

  const currentUser = {
    id: "current",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const calculateAverageRating = () => {
    const reviews = [
      { rating: 5 }, // Sarah's review
      { rating: 4 }, // Michael's review
    ]
    const total = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (total / reviews.length).toFixed(1)
  }

  const handleReviewSubmit = (review: { rating: number; text: string }) => {
    console.log("Review submitted:", review)
    setShowReviewForm(false)
    // Here you would typically send the review to your backend
  }

  const handleLikeClick = () => {
    if (isLoggedIn) {
      setIsLiked(!isLiked)
      toast({
        title: !isLiked ? "Following Business Name" : "Unfollowed Business Name",
        description: !isLiked ? "You are now following this business" : "You have unfollowed this business",
        variant: "success",
      })
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Fake login logic
    if (email && password) {
      setIsLoggedIn(true)
      setShowLoginDialog(false)
      setEmail("")
      setPassword("")
      toast({
        title: "Welcome back!",
        description: "You are now logged in as a VIP member",
        variant: "success",
      })
    }
  }

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (serviceType && serviceName && serviceDescription && servicePrice) {
      const getServiceIcon = (type: string) => {
        switch (type) {
          case "physical":
            return <Package className="w-5 h-5" />
          case "voucher":
            return <Gift className="w-5 h-5" />
          case "discount":
            return <Percent className="w-5 h-5" />
          default:
            return <Tag className="w-5 h-5" />
        }
      }

      const newService = {
        id: Date.now().toString(),
        type: serviceType,
        name: serviceName,
        description: serviceDescription,
        price: servicePrice,
        icon: getServiceIcon(serviceType),
      }

      setServices([...services, newService])
      setServiceType("")
      setServiceName("")
      setServiceDescription("")
      setServicePrice("")
      setShowAddService(false)

      toast({
        title: "Service Added!",
        description: `${serviceName} has been added to your services`,
        variant: "success",
      })
    }
  }

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoType && promoTitle && promoDescription && promoValue) {
      const getPromoIcon = (type: string) => {
        switch (type) {
          case "meter-ad":
            return <Tag className="w-5 h-5" />
          case "offer":
            return <Percent className="w-5 h-5" />
          default:
            return <Gift className="w-5 h-5" />
        }
      }

      const newPromo = {
        id: Date.now().toString(),
        type: promoType,
        title: promoTitle,
        description: promoDescription,
        value: promoValue,
        icon: getPromoIcon(promoType),
      }

      setPromos([...promos, newPromo])
      setPromoType("")
      setPromoTitle("")
      setPromoDescription("")
      setPromoValue("")
      setShowAddPromo(false)

      toast({
        title: "Promo Added!",
        description: `${promoTitle} is now live`,
        variant: "success",
      })
    }
  }

  return (
    <div className="w-[414px] mx-auto font-sans fixed top-0 left-1/2 -translate-x-1/2 mt-[10px]">
      {/* Card Container */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg w-[414px]">
        {/* Top Navigation Bar */}
        <div className="bg-gray-100 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-1 rounded-full">
              <MapPin size={20} className="text-gray-700" />
            </div>
            {isLoggedIn ? (
              <div className="bg-amber-400 p-1 rounded-full">
                <User size={20} className="text-white" />
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
                    03/24 VAL ST,
                    <br />
                    2000, SYD, AU
                  </span>
                </div>
              </div>
            </div>

            {/* Credit Card Circles */}
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-600"></div>
              <div className="w-10 h-10 rounded-full bg-red-500 opacity-90"></div>
            </div>
          </div>

          {/* Services Icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/3 bg-amber-300/50 pt-3 pr-3 pl-3 pb-1.5 rounded-lg backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-2">
              <div
                className={`flex items-center cursor-pointer transition-opacity duration-200 ${
                  !hasJobOffers ? "opacity-50" : "hover:opacity-80"
                }`}
                onClick={() => hasJobOffers && setShowJobs(!showJobs)}
                title={hasJobOffers ? "Click to view job offers" : "No job offers available"}
              >
                <Handshake className="w-6 h-6 text-white" />
                <span className="text-xs text-white ml-1">{hasJobOffers ? "01" : "00"}</span>
              </div>
              <div className="flex items-center">
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
                      </form>
                    </TabsContent>
                    <TabsContent value="register">
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500">
                          Create a new account to become a VIP member and get exclusive benefits.
                        </p>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => {
                            // Here you would typically navigate to registration page
                            console.log("Navigate to registration page")
                          }}
                        >
                          Create Account
                        </Button>
                      </div>
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
            <span className="mr-1">🔊</span> Reviews
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

            {showReviewForm && <ReviewForm onSubmit={handleReviewSubmit} onClose={() => setShowReviewForm(false)} />}

            <ReviewsList />
          </div>
        )}

        {/* VIPs Section */}
        {isLoggedIn && (
          <div className="bg-gray-700 text-white p-9 flex items-center min-w-[320px] max-w-[414px] max-h-[29px]">
            <span className="mr-4">{isLiked ? vipCount + 1 : vipCount}</span>
            <span className="mr-4 text-[13px]">VIP'S</span>
            <div className="flex -space-x-2">
              {isLiked && (
                <div className="w-8 h-8 rounded-full bg-gray-500 border border-gray-700 overflow-hidden">
                  <img
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt="Your profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((vip) => (
                <div key={vip} className="w-8 h-8 rounded-full bg-gray-500 border border-gray-700 overflow-hidden">
                  <img
                    src={`/ceholder-svg-key-r5ltq.jpg?key=r5ltq&height=32&width=32`}
                    alt={`VIP ${vip}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                <span className="text-xs">...</span>
              </div>
            </div>
          </div>
        )}

        {/* Promo and Services */}
        <div className="bg-gray-100 p-4 flex justify-between max-w-[414px]">
          <div>
            <h3
              className="text-gray-500 font-bold tracking-widest text-[11px] cursor-pointer hover:text-amber-500 transition-colors flex items-center"
              onClick={() => setShowPromo(!showPromo)}
            >
              <Plus size={16} className="mr-1" /> PROMO
            </h3>
          </div>
          <div>
            <h3
              className="text-gray-500 font-bold tracking-widest flex items-center text-[11px] cursor-pointer hover:text-amber-500 transition-colors"
              onClick={() => setShowServices(!showServices)}
            >
              <Plus size={16} className="mr-1" /> SERVICES
            </h3>
          </div>
        </div>

        {/* Promo Section with dropdown functionality */}
        {showPromo && (
          <div className="bg-gray-50 p-4 animate-slide-down">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-bold tracking-widest text-[11px]">LIVE PROMOS</h3>
              <Button
                onClick={() => setShowAddPromo(!showAddPromo)}
                size="sm"
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Promo
              </Button>
            </div>

            {/* Add Promo Form */}
            {showAddPromo && (
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Create Live Promo</h4>
                <form onSubmit={handlePromoSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="promoType">Promo Type</Label>
                    <Select value={promoType} onValueChange={setPromoType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select promo type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meter-ad">
                          <div className="flex items-center">
                            <Tag className="w-4 h-4 mr-2" />
                            Meter Ad
                          </div>
                        </SelectItem>
                        <SelectItem value="offer">
                          <div className="flex items-center">
                            <Percent className="w-4 h-4 mr-2" />
                            Special Offer
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="promoTitle">Title</Label>
                    <Input
                      id="promoTitle"
                      value={promoTitle}
                      onChange={(e) => setPromoTitle(e.target.value)}
                      placeholder="Enter promo title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="promoDescription">Description</Label>
                    <Textarea
                      id="promoDescription"
                      value={promoDescription}
                      onChange={(e) => setPromoDescription(e.target.value)}
                      placeholder="Describe your promo"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="promoValue">Value / Discount</Label>
                    <Input
                      id="promoValue"
                      value={promoValue}
                      onChange={(e) => setPromoValue(e.target.value)}
                      placeholder="e.g., 20% OFF or $50 Value"
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white">
                      Create Promo
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddPromo(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Promos List */}
            <div className="space-y-3">
              {promos.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Zap className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No live promos yet</p>
                  <p className="text-sm">Click "Add Promo" to create a live promotion</p>
                </div>
              ) : (
                promos.map((promo) => (
                  <div key={promo.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <div className="text-amber-500 mr-2">{promo.icon}</div>
                        <div>
                          <h4 className="font-medium text-gray-900">{promo.title}</h4>
                          <p className="text-xs text-gray-500 capitalize">
                            {promo.type === "meter-ad" ? "Meter Ad" : "Special Offer"}
                          </p>
                        </div>
                      </div>
                      <span className="text-amber-600 font-bold text-lg">{promo.value}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{promo.description}</p>
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Live Now</span>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        View Stats
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Jobs Section */}
        {showJobs && hasJobOffers && (
          <div className="bg-gray-50 p-4 animate-slide-down">
            <h3 className="text-gray-500 font-bold tracking-widest text-[11px] mb-4">JOBS</h3>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h4 className="font-medium text-gray-900 mb-2">Senior Developer</h4>
              <p className="text-gray-600 text-sm mb-3">
                We are looking for an experienced developer to join our team.
              </p>
              <div className="flex items-center text-gray-500 text-xs">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Sydney, AU</span>
                <span className="mx-2">•</span>
                <span>Full-time</span>
              </div>
              <Button className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white" size="sm">
                Apply
              </Button>
            </div>
          </div>
        )}

        {/* Services Section with dropdown functionality */}
        {showServices && (
          <div className="bg-gray-50 p-4 animate-slide-down">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-bold tracking-widest text-[11px]">SERVICES</h3>
              <Button
                onClick={() => setShowAddService(!showAddService)}
                size="sm"
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Service
              </Button>
            </div>

            {/* Add Service Form */}
            {showAddService && (
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Add New Service/Promotion</h4>
                <form onSubmit={handleServiceSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">
                          <div className="flex items-center">
                            <Package className="w-4 h-4 mr-2" />
                            Physical Item
                          </div>
                        </SelectItem>
                        <SelectItem value="voucher">
                          <div className="flex items-center">
                            <Gift className="w-4 h-4 mr-2" />
                            Gift Voucher
                          </div>
                        </SelectItem>
                        <SelectItem value="discount">
                          <div className="flex items-center">
                            <Percent className="w-4 h-4 mr-2" />
                            Discount Offer
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="serviceName">Service Name</Label>
                    <Input
                      id="serviceName"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      placeholder="Enter service name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="serviceDescription">Description</Label>
                    <Textarea
                      id="serviceDescription"
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      placeholder="Describe your service or promotion"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="servicePrice">Price</Label>
                    <Input
                      id="servicePrice"
                      value={servicePrice}
                      onChange={(e) => setServicePrice(e.target.value)}
                      placeholder="$0.00"
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white">
                      Add Service
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddService(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Services List */}
            <div className="space-y-3">
              {services.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No services added yet</p>
                  <p className="text-sm">Click "Add Service" to get started</p>
                </div>
              ) : (
                services.map((service) => (
                  <div key={service.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center mb-2">
                        <div className="text-amber-500 mr-2">{service.icon}</div>
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                      </div>
                      <span className="text-amber-600 font-semibold">{service.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                        {service.type === "physical"
                          ? "Physical Item"
                          : service.type === "voucher"
                            ? "Gift Voucher"
                            : "Discount Offer"}
                      </span>
                      <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                        <CreditCard className="w-4 h-4 mr-1" />
                        Purchase
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
