# Dabba by Sukhadyam 🍽️

A mobile-first food ordering system for office-goers. Simple, reliable, everyday meals.

## 🏗️ Architecture

### Backend (Next.js API Routes + Cloudflare D1)
- **Location**: `apps/web/app/api`
- **Database**: Cloudflare D1 (SQLite)
- **APIs**:
  - `GET /api/dabba/today` - Today's menu with items
  - `GET /api/dabba/tomorrow` - Tomorrow's menu teaser (theme only)
  - `GET /api/dabba/status` - Ordering window status
  - `POST /api/dabba/orders` - Create new order

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
- Cloudflare account (for D1 database)

### Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Frontend will run on `http://localhost:3000`

## 🗄️ Database Setup (Cloudflare D1)

### Create D1 Database

```bash
cd apps/web
pnpm exec wrangler d1 create office_dabba_db
```

Update `wrangler.toml` with your database ID.

### Run Migrations

```bash
cd apps/web
pnpm exec wrangler d1 migrations apply office_dabba_db --local
```

### Seed Data

```bash
cd apps/web
pnpm exec wrangler d1 execute office_dabba_db --local --file=./db/seed.sql
```

## 📁 Project Structure

```
apps/web/
├── app/
│   ├── api/              # Next.js API routes (automatically handled by Cloudflare Pages)
│   │   └── dabba/
│   ├── dabba/            # Ordering page
│   ├── kal-ka-dabba/     # Tomorrow's teaser
│   ├── how-dabba-works/  # How it works page
│   └── contact/          # Contact page
├── components/           # React components
├── lib/
│   ├── api/              # API client
│   ├── dabba-menu/       # Menu service & entities
│   ├── dabba-order/      # Order service & entities
│   └── database/         # D1 database service
└── wrangler.toml         # Cloudflare Workers/Pages config
```

## 🚢 Deployment

### Cloudflare Pages

1. Connect your repository to Cloudflare Pages
2. Set build command: `pnpm build`
3. Set output directory: `apps/web/.next`
4. Configure D1 database binding in Cloudflare dashboard
5. Deploy!

The API routes in `app/api/` are automatically converted to Cloudflare Workers functions.

## 📝 Notes

- **Ordering Window**: 11:00 AM - 12:30 PM (enforced by backend)
- **Delivery Window**: 1:00 PM - 3:00 PM
- **Max Items**: 4 items per order
- **No Customization**: Fixed daily menu, no modifications
- **Server Time**: Frontend relies on backend for time-based logic
