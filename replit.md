# Body Shop Supply Hub

A streamlined inventory replenishment application designed for wall-mounted tablets in high-traffic auto body shop environments. Features a McDonald's kiosk-style interface for quick, touch-friendly operation.

## Overview

This application allows technicians to quickly flag supplies that are running low by tapping large category buttons. The manager can view a consolidated "order list" in real-time without constant interruptions.

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS, Shadcn/UI components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter

## Application Routes

- `/` - Main Menu (Department selection + theme settings)
- `/body-shop` - Technician View for Body Shop (Kiosk Mode with large category buttons)
- `/manager` - Manager Dashboard (PIN protected)
- `/mechanics` - Mechanics Department (Coming soon)
- `/assembly` - Assembly Department (Coming soon)
- `/office` - Office Department (Coming soon)

## Departments

The application supports multiple departments, each with their own supply tracking:

1. **Боди Шоп (Body Shop)** - Active - Paints, primers, sandpaper, masking supplies
2. **Механика (Mechanics)** - Coming soon - Tools and parts for mechanics
3. **Сборка (Assembly)** - Coming soon - Assembly line materials
4. **Офис (Office)** - Coming soon - Office supplies and stationery

## Key Features

### Technician Interface (Kiosk Mode)
- **McDonald's kiosk-style UI** with large touch-friendly category buttons
- Industrial dark theme with amber/orange accents for high visibility
- Categories expand to show variants (e.g., Block Paper → 40, 80, 180, 240, 320)
- Single-item categories request directly with one tap
- Visual "Requested" badges on items that have been flagged
- Real-time sync via 5-second polling

### Manager Dashboard
- PIN-protected access (default: 1234)
- View all pending restock requests with group name + variant
- Timestamps showing when items were requested
- Mark individual items as ordered or clear all requests
- Back navigation to technician view

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/groups` | Fetch all groups with their items |
| GET | `/api/items` | Fetch all items (flat list) |
| POST | `/api/items` | Create new item |
| POST | `/api/items/:id/request` | Request restock for an item |
| POST | `/api/items/:id/clear` | Clear request for an item |
| POST | `/api/items/clear-all` | Clear all pending requests |
| POST | `/api/auth/validate-pin` | Validate manager PIN |

## Database Schema

### Item Groups Table
- `id` (varchar, UUID, primary key)
- `name` (text, required) - e.g., "Block Paper", "DA Paper"
- `icon` (text, default "package")
- `sortOrder` (integer)
- `isSingleItem` (boolean) - true for items like "Filler Bondo" that don't have variants

### Items Table
- `id` (varchar, UUID, primary key)
- `name` (text, required) - e.g., "40", "80", "Red", "Grey"
- `groupId` (varchar, foreign key to item_groups)
- `sortOrder` (integer)
- `isRequested` (boolean, default false)
- `requestedAt` (timestamp, nullable)

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (auto-configured)
- `MANAGER_PIN` - Manager access PIN (default: 1234)

## Inventory Categories

The database is seeded with these groups:

1. **Block Paper** → 40, 80, 180, 240, 320
2. **Scuff Roll** → Red, Grey
3. **DA Paper** → 40, 80, 180, 240, 320, 400, 600
4. **Primer** → Dimension DP 840, Super Build 4:1, Finish Sand 4:1, Bulldog
5. **Filler Bondo** (single item)
6. **Glaze** (single item)
7. **Wax & Grease** (single item)
8. **Lacquer Thinner** (single item)
9. **Yellow Tape** (single item)
10. **Plastic Sheet** (single item)
11. **Spray Cans** → Adhesive Remover, Etch Primer
12. **Parts** → Fender, Innerstructer, Doors, Cargo door, Extender
13. **Gloves** → S, M, L, XL
14. **Wishlist** (single item)

## Development Commands

```bash
npm run dev        # Start development server
npm run db:push    # Push schema changes to database
```

## Project Structure

```
├── client/src/
│   ├── components/
│   │   ├── group-button.tsx       # Large kiosk-style category button
│   │   ├── variant-selector.tsx   # Bottom sheet for selecting variants
│   │   ├── header.tsx             # App header with settings menu
│   │   ├── category-icons.tsx     # Custom SVG icons for each category
│   │   ├── manager-pin-dialog.tsx # PIN entry for manager access
│   │   ├── empty-state.tsx        # Empty state messages
│   │   └── loading-skeleton.tsx   # Loading placeholders
│   ├── pages/
│   │   ├── main-menu.tsx          # Department selection menu
│   │   ├── technician-view.tsx    # Kiosk grid interface
│   │   └── manager-dashboard.tsx  # Request management
│   └── App.tsx
├── server/
│   ├── db.ts             # Database connection
│   ├── routes.ts         # API endpoints
│   └── storage.ts        # Database operations
└── shared/
    └── schema.ts         # Drizzle schema definitions
```

## Theming System

The app features a customizable theme system with 4 base themes and multiple accent colors per theme:

### Base Themes
1. **Dark Workshop** - Deep black base (default)
   - Accents: Orange, White, Red, Cyan
2. **Midnight Blue** - Navy blue base
   - Accents: Cyan, White, Orange, Green
3. **Industrial Slate** - Charcoal gray base
   - Accents: Green, Orange, Purple, Yellow
4. **Workshop Light** - Warm light theme
   - Accents: Orange, Blue, Green, Red

### Theme Files
- `client/src/providers/theme-provider.tsx` - Theme context and state management
- `client/src/components/theme-switcher.tsx` - Theme selection UI
- `client/src/index.css` - CSS variables for all themes and accents
- `client/index.html` - Inline script for FOUC prevention

### Theme Persistence
- Theme and accent stored in localStorage (`supply-hub-theme`, `supply-hub-accent`)
- Inline script applies theme before React hydration to prevent flash

## Design Guidelines

- Large touch targets (minimum 140px square buttons)
- Inter font family for readability
- No shadows (overhead lighting in workshops)
- 2-column grid on mobile, 3-4 columns on tablet/desktop
