# Professional Music Platform

A modern, premium platform connecting musicians with venues, built with Next.js 14, TypeScript, and Tailwind CSS.

## Dynamic Routes & Shared Components

### Profile System

#### Musician Profiles (`/profile/[id]`)
```typescript
// Example URL: /profile/crystal-waves
export default function Profile() {
    const [musician, setMusician] = useState<Musician | null>(null);
    // Fetches musician data and renders:
    return (
        <main>
            <Hero {...musicianHeroProps} />
            <StatsCards stats={musician.stats} />
            <FeaturedTracks tracks={musician.featuredTracks} />
            <SocialConnections links={musician.socialLinks} />
        </main>
    );
}
```

#### Venue Profiles (`/venue/[id]`)
```typescript
// Example URL: /venue/electric-room
export default function VenueProfile() {
    const [venue, setVenue] = useState<Venue | null>(null);
    // Fetches venue data and renders:
    return (
        <main>
            <Hero {...venueHeroProps} />
            <VenueStats stats={venue.stats} />
            <UpcomingEvents events={venue.upcomingEvents} />
            <VenueFeatures features={venue.features} />
        </main>
    );
}
```

### Shared Components

#### 1. Hero Component
```typescript
// components/shared/Hero.tsx
type HeroProps = {
    name: string;
    isVerified: boolean;
    location: string;
    subtitle: string;
    profileImage: string;
    coverImage: string;
    actions: ActionButton[];
};
```
- Used in both musician and venue profiles
- Handles image loading states with Suspense
- Consistent styling across profile types
- Customizable action buttons

#### 2. Loading States
```typescript
// venue/[id]/loading.tsx & profile/[id]/loading.tsx
export default function LoadingProfile() {
    return (
        <main>
            <SkeletonHero />
            <SkeletonStats />
            <SkeletonContent />
        </main>
    );
}
```
- Matching skeleton structures for both profile types
- Maintains layout consistency during data fetch
- Smooth transitions with animations

### Data Flow

1. **Route Access**
   ```typescript
   // User visits /profile/crystal-waves or /venue/electric-room
   const params = useParams();
   const id = params.id;
   ```

2. **Data Fetching**
   ```typescript
   // API calls to respective endpoints
   const response = await fetch(`/api/${type}?id=${id}`);
   const data = await response.json();
   ```

3. **Component Rendering**
   ```typescript
   // Shared components receive type-specific props
   <Hero 
     name={data.name}
     isVerified={data.isVerified}
     // ... other props
   />
   ```

### Key Features

#### Profile Header System
- Consistent header layout across profile types
- Verified badge system
- Dynamic action buttons
- Responsive image handling

#### Content Organization
- Grid-based layout system
- Consistent card styling
- Type-specific content sections
- Interactive elements

#### Performance Optimizations
- Image lazy loading
- Suspense boundaries
- Loading state management
- Smooth transitions

### Technical Implementation

#### Shared Types
```typescript
type SharedProfileProps = {
    id: string;
    name: string;
    isVerified: boolean;
    location: string;
    profileImage: string;
    coverImage: string;
};

type Musician = SharedProfileProps & {
    genre: string;
    stats: MusicianStats;
    // ... musician-specific fields
};

type Venue = SharedProfileProps & {
    type: string;
    stats: VenueStats;
    // ... venue-specific fields
};
```

#### Route Protection
- Client-side data fetching
- Loading state management
- Error boundaries
- Type safety with TypeScript

### Best Practices

1. **Component Reusability**
   - Shared components for common UI patterns
   - Type-safe props
   - Consistent styling

2. **Performance**
   - Optimized image loading
   - Skeleton loading states
   - Smooth transitions

3. **Type Safety**
   - TypeScript interfaces
   - Prop validation
   - API type checking

4. **User Experience**
   - Consistent layouts
   - Smooth transitions
   - Responsive design
   - Loading states
