import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BranchData, INITIAL_BRANCHES, MenuItemData, PortionData } from './data'

export interface CartItem {
  cartItemId: string // unique combination of id + portion + spice + addons
  id: string
  name: string
  nameBn?: string
  image: string
  portion: PortionData
  unitPrice: number
  quantity: number
  spiceLevel?: string
  addons?: { name: string; price: number }[]
  instructions?: string
}

export interface AppliedCoupon {
  code: string
  discount: number
  type: 'fixed' | 'percent'
}

interface ToastState {
  show: boolean
  title: string
  description: string
  type: 'success' | 'info' | 'error'
}

interface RestaurantStore {
  // Cart
  cart: CartItem[]
  isCartOpen: boolean
  isCheckoutOpen: boolean
  appliedCoupon: AppliedCoupon | null
  
  // Customizer Modal
  customizerItem: MenuItemData | null
  isCustomizerOpen: boolean

  // Fulfillment & Branch
  fulfillmentMode: 'delivery' | 'takeaway'
  selectedBranch: BranchData
  
  // Toast
  toast: ToastState

  // Language
  language: 'en' | 'bn'

  // Actions
  addToCart: (item: MenuItemData, portion: PortionData, options?: { spiceLevel?: string; addons?: { name: string; price: number }[]; instructions?: string; quantity?: number }) => void
  addDirectCartItem: (cartItem: CartItem) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, delta: number) => void
  clearCart: () => void
  
  // Coupon
  applyCoupon: (coupon: AppliedCoupon) => void
  removeCoupon: () => void

  // Modals
  setCartOpen: (open: boolean) => void
  setCheckoutOpen: (open: boolean) => void
  openCustomizer: (item: MenuItemData) => void
  closeCustomizer: () => void

  // Settings
  setFulfillmentMode: (mode: 'delivery' | 'takeaway') => void
  setSelectedBranch: (branch: BranchData) => void
  setLanguage: (lang: 'en' | 'bn') => void
  
  // Toast
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void
  hideToast: () => void

  // Computations
  getSubtotal: () => number
  getDiscountAmount: () => number
  getDeliveryFee: () => number
  getTotal: () => number
  getItemCount: () => number
}

export const useStore = create<RestaurantStore>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      isCheckoutOpen: false,
      appliedCoupon: null,

      customizerItem: null,
      isCustomizerOpen: false,

      fulfillmentMode: 'delivery',
      selectedBranch: INITIAL_BRANCHES[0],

      toast: {
        show: false,
        title: '',
        description: '',
        type: 'success',
      },

      language: 'en',

      addToCart: (item, portion, options = {}) => {
        const quantity = options.quantity || 1
        const spiceLevel = options.spiceLevel
        const addons = options.addons || []
        const instructions = options.instructions || ''

        const addonsKey = addons.map((a) => a.name).sort().join('|')
        const cartItemId = `${item.id}-${portion.label}-${spiceLevel || 'default'}-${addonsKey}`
        
        const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0)
        const unitPrice = portion.price + addonsTotal

        const currentCart = get().cart
        const existingIndex = currentCart.findIndex((i) => i.cartItemId === cartItemId)

        if (existingIndex > -1) {
          const updated = [...currentCart]
          updated[existingIndex].quantity += quantity
          set({ cart: updated })
        } else {
          const newItem: CartItem = {
            cartItemId,
            id: item.id,
            name: item.name,
            nameBn: item.nameBn,
            image: item.image,
            portion,
            unitPrice,
            quantity,
            spiceLevel,
            addons,
            instructions,
          }
          set({ cart: [...currentCart, newItem] })
        }

        get().showToast(
          `${item.name} (${portion.label})`,
          `Added ${quantity}x to your feast at ৳${unitPrice * quantity}`
        )
      },

      addDirectCartItem: (cartItem) => {
        const currentCart = get().cart
        const existingIndex = currentCart.findIndex((i) => i.cartItemId === cartItem.cartItemId)
        if (existingIndex > -1) {
          const updated = [...currentCart]
          updated[existingIndex].quantity += cartItem.quantity
          set({ cart: updated })
        } else {
          set({ cart: [...currentCart, cartItem] })
        }
      },

      removeFromCart: (cartItemId) => {
        set({ cart: get().cart.filter((item) => item.cartItemId !== cartItemId) })
      },

      updateQuantity: (cartItemId, delta) => {
        const currentCart = get().cart
        const updated = currentCart
          .map((item) => {
            if (item.cartItemId === cartItemId) {
              const newQty = item.quantity + delta
              return newQty > 0 ? { ...item, quantity: newQty } : null
            }
            return item
          })
          .filter(Boolean) as CartItem[]

        set({ cart: updated })
      },

      clearCart: () => set({ cart: [], appliedCoupon: null }),

      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
      removeCoupon: () => set({ appliedCoupon: null }),

      setCartOpen: (open) => set({ isCartOpen: open }),
      setCheckoutOpen: (open) => set({ isCheckoutOpen: open }),

      openCustomizer: (item) => set({ customizerItem: item, isCustomizerOpen: true }),
      closeCustomizer: () => set({ isCustomizerOpen: false, customizerItem: null }),

      setFulfillmentMode: (mode) => set({ fulfillmentMode: mode }),
      setSelectedBranch: (branch) => set({ selectedBranch: branch }),
      setLanguage: (lang) => set({ language: lang }),

      showToast: (title, description = '', type = 'success') => {
        set({ toast: { show: true, title, description, type } })
      },

      hideToast: () => {
        set((state) => ({ toast: { ...state.toast, show: false } }))
      },

      getSubtotal: () => {
        return get().cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal()
        const coupon = get().appliedCoupon
        if (!coupon) return 0
        if (coupon.type === 'percent') {
          return Math.round((subtotal * coupon.discount) / 100)
        }
        return Math.min(coupon.discount, subtotal)
      },

      getDeliveryFee: () => {
        if (get().fulfillmentMode === 'takeaway') return 0
        if (get().cart.length === 0) return 0
        return get().selectedBranch.deliveryFee || 60
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const discount = get().getDiscountAmount()
        const deliveryFee = get().getDeliveryFee()
        return Math.max(0, subtotal - discount + deliveryFee)
      },

      getItemCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'flame-feast-storage',
      partialize: (state) => ({
        cart: state.cart,
        fulfillmentMode: state.fulfillmentMode,
        selectedBranch: state.selectedBranch,
        language: state.language,
      }),
    }
  )
)
