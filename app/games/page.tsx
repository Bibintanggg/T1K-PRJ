"use client"

import { useState, useEffect } from "react"
import DarkVeil from "@/components/DarkVeil"
import StaggeredMenu from "@/components/StaggeredMenu"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// Flower types
type Flower = {
  id: string
  name: string
  emoji: string
  color: string
}

const AVAILABLE_FLOWERS: Flower[] = [
  { id: '1', name: 'Rose', emoji: '🌹', color: '#ff6b9d' },
  { id: '2', name: 'Sunflower', emoji: '🌻', color: '#ffd93d' },
  { id: '3', name: 'Tulip', emoji: '🌷', color: '#ff69b4' },
  { id: '4', name: 'Blossom', emoji: '🌸', color: '#ffb3d9' },
  { id: '5', name: 'Hibiscus', emoji: '🌺', color: '#ff1744' },
  { id: '6', name: 'Lotus', emoji: '🪷', color: '#ffc1e3' },
  { id: '7', name: 'Daisy', emoji: '🌼', color: '#fff9c4' },
  { id: '8', name: 'Lavender', emoji: '💐', color: '#b39ddb' },
]

// Draggable Flower Component
function DraggableFlower({ flower }: { flower: Flower }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: flower.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group cursor-grab active:cursor-grabbing"
    >
      <div className="relative aspect-square flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
        <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
          {flower.emoji}
        </span>
      </div>
      <p className="text-center text-xs text-white/60 mt-2 font-medium">{flower.name}</p>
    </div>
  )
}

// Flower in Garden
function GardenFlower({ flower, onRemove }: { flower: Flower; onRemove: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: flower.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group cursor-grab active:cursor-grabbing"
    >
      <div className="aspect-square flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-200">
        <span className="text-4xl">{flower.emoji}</span>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
      >
        ×
      </button>
    </div>
  )
}

export default function FlowerGame() {
  const [garden, setGarden] = useState<Flower[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('flower-garden')
    if (saved) {
      try {
        setGarden(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load garden:', e)
      }
    }
    setMounted(true)
  }, [])

  // Save to localStorage whenever garden changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('flower-garden', JSON.stringify(garden))
    }
  }, [garden, mounted])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const menuItems = [
    {
      label: "Home",
      ariaLabel: "Go to home",
      link: "/",
      onClick: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    {
      label: "Games",
      ariaLabel: "View games",
      link: "/games",
      onClick: () => {
        const section = document.querySelector('section:nth-of-type(4)')
        section?.scrollIntoView({ behavior: 'smooth' })
      }
    },
  ]

  const socialItems = [
    { label: "Instagram", link: "https://instagram.com/@bintang.ydha_" },
    { label: "TikTok", link: "https://tiktok.com/@bintangyudha_" }
  ]

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    // If dragging from flower palette to garden
    if (over.id === 'garden-dropzone') {
      const flower = AVAILABLE_FLOWERS.find(f => f.id === active.id)
      if (flower && garden.length < 16) {
        setGarden([...garden, { ...flower, id: `${flower.id}-${Date.now()}` }])
      }
    }

    // If rearranging within garden
    if (active.id !== over.id && garden.some(f => f.id === active.id)) {
      setGarden((items) => {
        const oldIndex = items.findIndex(f => f.id === active.id)
        const newIndex = items.findIndex(f => f.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const removeFlower = (id: string) => {
    setGarden(garden.filter(f => f.id !== id))
  }

  const clearGarden = () => {
    setGarden([])
  }

  const activeFlower = activeId 
    ? AVAILABLE_FLOWERS.find(f => f.id === activeId) || garden.find(f => f.id === activeId)
    : null

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="relative min-h-screen">
          <div className="fixed inset-0 -z-20">
            <DarkVeil
              hueShift={67}
              noiseIntensity={0.13}
              scanlineIntensity={0.86}
              speed={2.8}
              scanlineFrequency={4}
              warpAmount={5}
            />
          </div>

          <div className="fixed inset-0 bg-black/60 -z-10" />
          
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#B19EEF"
            changeMenuColorOnOpen={true}
            colors={['#1a1a1a', '#2d2d2d', '#3d3d3d']}
            accentColor="#B19EEF"
            isFixed={true}
            closeOnClickAway={true}
          />

          <div className="max-w-6xl mx-auto px-6 py-16">
            {/* Header */}
            <div className="mb-16">
              <h1 className="text-5xl font-bold text-white mb-3">
                Flower Garden
              </h1>
              <p className="text-white/50 text-lg">
                Drag and drop flowers to create your garden
              </p>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center gap-6 mb-10 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-white/50">Total:</span>
                <span className="text-white font-semibold">{garden.length} / 16</span>
              </div>
              {garden.length > 0 && (
                <button
                  onClick={clearGarden}
                  className="text-white/50 hover:text-white transition-colors underline underline-offset-4"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Garden Area */}
            <div className="mb-16">
              <SortableContext items={garden.map(f => f.id)} strategy={rectSortingStrategy}>
                <div
                  id="garden-dropzone"
                  className="min-h-[400px] rounded-2xl bg-white/5 backdrop-blur-sm border-2 border-dashed border-white/20 p-8 transition-colors hover:border-white/30"
                >
                  {garden.length === 0 ? (
                    <div className="h-[384px] flex flex-col items-center justify-center">
                      <div className="text-6xl mb-4 opacity-20">🌱</div>
                      <p className="text-white/30">Drop flowers here</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                      {garden.map((flower) => (
                        <GardenFlower
                          key={flower.id}
                          flower={flower}
                          onRemove={() => removeFlower(flower.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>

            {/* Flower Palette */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Available Flowers</h2>
              <SortableContext items={AVAILABLE_FLOWERS.map(f => f.id)}>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                  {AVAILABLE_FLOWERS.map((flower) => (
                    <DraggableFlower key={flower.id} flower={flower} />
                  ))}
                </div>
              </SortableContext>
            </div>

            {/* Instructions */}
            <div className="mt-16 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-white font-semibold mb-3">How it works</h3>
              <ul className="text-white/50 text-sm space-y-2">
                <li>• Drag flowers from the palette to your garden</li>
                <li>• Rearrange flowers by dragging them within the garden</li>
                <li>• Hover over flowers and click × to remove them</li>
                <li>• Your garden is automatically saved</li>
              </ul>
            </div>
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeFlower ? (
              <div className="aspect-square w-16 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl">
                <span className="text-4xl">{activeFlower.emoji}</span>
              </div>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </>
  )
}