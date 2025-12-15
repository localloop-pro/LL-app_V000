"use server"

type BusinessData = {
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
  services: {
    jobs: number
    shop: number
    gifts: number
    properties: number
    deals: number
    cafe: number
  }
}

export async function updateBusinessData(data: Partial<BusinessData>) {
  try {
    // Here you would typically update your database
    // For demo, we'll simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true, message: "Business data updated successfully" }
  } catch (error) {
    return { success: false, message: "Failed to update business data" }
  }
}

export async function verifySellerCode(code: string, phoneNumber: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const isValid = code === "123456" // Demo validation

    if (!isValid) {
      return { success: false, message: "Invalid verification code", verified: false }
    }

    return {
      success: true,
      message: "Verification successful",
      verified: true,
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
        services: {
          jobs: 1,
          shop: 1,
          gifts: 1,
          properties: 1,
          deals: 1,
          cafe: 1,
        },
      },
    }
  } catch (error) {
    return { success: false, message: "An error occurred during verification", verified: false }
  }
}
