# Dabba by Sukhadyam 🍽️

A mobile-first food ordering system for office-goers. Simple, reliable, everyday meals.

## 🏗️ Architecture

### Backend (NestJS)
- **Location**: `apps/api`
- **Port**: 3001 (default)
- **APIs**:
  - `GET /dabba/today` - Today's menu with items
  - `GET /dabba/tomorrow` - Tomorrow's menu teaser (theme only)
  - `GET /dabba/status` - Ordering window status
  - `POST /dabba/orders` - Create new order

### Frontend (Next.js)
- **Location**: `apps/web`
- **Port**: 3000 (default)
- **Routes**:
  - `/` - Home page
  - `/dabba` - Today's menu & ordering
  - `/kal-ka-dabba` - Tomorrow's teaser
  - `/how-dabba-works` - How it works
  - `/contact` - Contact information

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- pnpm 9.0.0

### Backend Setup

```bash
cd apps/api
pnpm install
pnpm dev
```

Backend will run on `http://localhost:3001`

### Frontend Setup

```bash
cd apps/web
pnpm install
pnpm dev
```

Frontend will run on `http://localhost:3000`

### Environment Variables

Create `.env.local` in `apps/web`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📋 Core Features

### Ordering Window
- **Menu visible**: 11:00 AM - 12:30 PM
- **Orders close**: Strictly at 12:30 PM
- **Delivery**: 1:00 PM - 3:00 PM

### Backend Validation
- Backend is the **single source of truth** for time
- Orders are rejected if placed after 12:30 PM
- Menu availability is checked server-side

### Order Rules
- Max 4 items per order
- No customisation
- Items may have quantity limits

## 🎨 Design Principles

- **Mobile-first**: Optimized for 360-430px screens
- **Warm colors**: Orange, amber, yellow palette
- **Hinglish tone**: Friendly, cute, trustworthy
- **Minimal**: No hype, just simple food ordering

## 📦 Database Models

Currently using in-memory storage. In production, replace with:
- PostgreSQL
- MongoDB
- Or your preferred database

Models:
- `DabbaMenu` - Daily menu
- `DabbaItem` - Menu items
- `DabbaOrder` - Customer orders

## 🔧 Development

### Backend Structure
```
apps/api/src/
├── dabba-menu/
│   ├── entities/
│   ├── dabba-menu.controller.ts
│   ├── dabba-menu.service.ts
│   └── dabba-menu.module.ts
├── dabba-order/
│   ├── entities/
│   ├── dto/
│   ├── dabba-order.controller.ts
│   ├── dabba-order.service.ts
│   └── dabba-order.module.ts
└── app.module.ts
```

### Frontend Structure
```
apps/web/
├── app/
│   ├── page.tsx (Home)
│   ├── dabba/page.tsx
│   ├── kal-ka-dabba/page.tsx
│   ├── how-dabba-works/page.tsx
│   └── contact/page.tsx
├── components/dabba/
│   ├── sticky-cta.tsx
│   └── menu-item-card.tsx
└── lib/
    ├── api/dabba.ts
    └── utils/time.ts
```

## 🚫 Not Included

- Login/signup
- Payment gateway
- Admin UI
- User accounts

## 📝 Notes

- Backend time validation is critical - never trust client time
- Menu data is seeded in `DabbaMenuService.seedData()`
- In production, add proper database and admin panel
- CORS is enabled for localhost:3000 by default

## 🎯 Production Checklist

- [ ] Replace in-memory storage with database
- [ ] Add environment-specific configs
- [ ] Set up proper CORS for production domain
- [ ] Add error logging and monitoring
- [ ] Implement admin panel for menu management
- [ ] Add order tracking
- [ ] Set up SMS/WhatsApp notifications
- [ ] Add analytics

---

**Office ka apna Dabba — roz ka, reliable, sorted.** 😊

