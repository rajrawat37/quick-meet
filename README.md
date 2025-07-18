# Quick Meet - Next.js Video Calling Application

A modern, full-featured video calling application built with Next.js 15, Stream Video SDK, and Clerk authentication. Quick Meet provides seamless video conferencing capabilities with a beautiful, responsive interface.

## Features

### Core Video Calling
- **Instant Meetings**: Start video calls immediately  
- **Scheduled Meetings**: Plan and schedule future meetings  
- **Personal Room**: Each user gets a dedicated meeting room  
- **Meeting Join**: Join meetings via link or meeting ID  

## Application Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Main application pages
│   │   ├── (home)/        # Dashboard and meeting pages
│   │   └── meeting/       # Video call interface
│   └── layout.tsx         # Root layout with providers
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── CallList.tsx      # Meeting list component
│   ├── MeetingCard.tsx   # Individual meeting display
│   └── MeetingModal.tsx  # Meeting creation modal
├── hooks/                # Custom React hooks
├── providers/            # Context providers
├── actions/              # Server actions
└── constants/            # Application constants
```


## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Clerk account for authentication
- Stream account for video calling

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stream Video
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000


### Installation

1. ** Clone the repository**
   ```bash
   git clone https://github.com/rajrawat37/quick-meet-nextjs.git
   cd quick-meet-nextjs
   ```

2. ** Install dependencies**
   ```bash
   npm install
   ```

3. ** Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your Clerk and Stream credentials

4. ** Run the development server**
   ```bash
   npm run dev
   ```

5. ** Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)
