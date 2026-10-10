import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Check, Move } from 'lucide-react';

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset transforms when a new image is loaded
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      setImgLoaded(false);
    }
  }, [isOpen, imageSrc]);

  // Touch & Mouse handlers for panning
  const handlePointerDown = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Perform canvas crop
  const handleSave = useCallback(() => {
    if (!imgRef.current) return;
    const img = imgRef.current;

    // Viewport box is 320x320 px (or responsive equivalent)
    const boxSize = 320;
    const outputSize = 1000; // High-resolution export
    const scale = outputSize / boxSize;

    const canvas = document.createElement('canvas');
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Smooth rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Calculate natural draw dimensions
    const displayWidth = img.width * zoom;
    const displayHeight = img.height * zoom;

    // Image center relative to container center
    const centerX = boxSize / 2 + position.x;
    const centerY = boxSize / 2 + position.y;

    // Draw to scaled output canvas
    ctx.save();
    ctx.translate(centerX * scale, centerY * scale);
    ctx.drawImage(
      img,
      (-displayWidth / 2) * scale,
      (-displayHeight / 2) * scale,
      displayWidth * scale,
      displayHeight * scale
    );
    ctx.restore();

    const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.95);
    onCropComplete(croppedDataUrl);
  }, [zoom, position, onCropComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080E2F]/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0C1645] border border-[rgba(212,175,55,0.40)] rounded-none shadow-2xl text-[#FFFEFA] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[rgba(212,175,55,0.25)] bg-[#141651]">
          <div>
            <h3 className="text-lg font-heading font-normal text-[#FFFEFA]">
              Crop & Position Founder Portrait
            </h3>
            <p className="text-xs text-[#DCDBE1] font-light flex items-center gap-1.5 mt-0.5">
              <Move className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Drag to position · Zoom slider to adjust framing</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#DCDBE1] hover:text-[#FFFEFA] hover:bg-[#1f2370] transition-colors cursor-pointer"
            aria-label="Close cropper"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Viewport Area */}
        <div className="p-6 flex flex-col items-center justify-center bg-[#080E2F]">
          <div
            ref={containerRef}
            className="relative w-[320px] h-[320px] overflow-hidden border-2 border-[#D4AF37] shadow-xl select-none cursor-grab active:cursor-grabbing touch-none bg-[#05081C]"
            onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
            onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={(e) => {
              if (e.touches.length === 1) {
                handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length === 1) {
                handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onTouchEnd={handlePointerUp}
          >
            {/* The Image being adjusted */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Adjustment preview"
              draggable={false}
              onLoad={() => setImgLoaded(true)}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.05s ease-out',
                maxWidth: 'none',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: imgRef.current ? -imgRef.current.height / 2 : 0,
                marginLeft: imgRef.current ? -imgRef.current.width / 2 : 0,
                pointerEvents: 'none',
              }}
              className="select-none"
            />

            {/* Subtle Rule-of-Thirds Grid Guide */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
              <div className="border-r border-b border-[#D4AF37]" />
              <div className="border-r border-b border-[#D4AF37]" />
              <div className="border-b border-[#D4AF37]" />
              <div className="border-r border-b border-[#D4AF37]" />
              <div className="border-r border-b border-[#D4AF37]" />
              <div className="border-b border-[#D4AF37]" />
              <div className="border-r border-[#D4AF37]" />
              <div className="border-r border-[#D4AF37]" />
              <div />
            </div>

            {/* Frame outline highlight */}
            <div className="absolute inset-0 border border-[#D4AF37]/50 pointer-events-none" />
          </div>

          <p className="text-3xs text-[#DCDBE1]/60 font-light mt-2">
            Framing box: Square half-body / executive bust crop
          </p>
        </div>

        {/* Controls: Zoom & Reset */}
        <div className="p-5 border-t border-[rgba(212,175,55,0.25)] bg-[#141651] space-y-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setZoom((prev) => Math.max(0.6, prev - 0.1))}
              className="p-1.5 border border-[#D4AF37]/40 text-[#DCDBE1] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="flex-1 flex items-center gap-3">
              <span className="text-xs font-label-btn text-[#DCDBE1] w-12">Zoom</span>
              <input
                type="range"
                min="0.6"
                max="3.0"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer h-1.5 bg-[#080E2F] rounded-none"
              />
              <span className="text-xs font-mono text-[#D4AF37] w-12 text-right">
                {Math.round(zoom * 100)}%
              </span>
            </div>
            <button
              onClick={() => setZoom((prev) => Math.min(3.0, prev + 0.1))}
              className="p-1.5 border border-[#D4AF37]/40 text-[#DCDBE1] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setPosition({ x: 0, y: 0 });
              }}
              className="px-4 py-2 text-xs font-label-btn border border-[rgba(212,175,55,0.30)] text-[#DCDBE1] hover:text-[#FFFEFA] hover:border-[#D4AF37] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-label-btn text-[#DCDBE1] hover:text-[#FFFEFA] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2.5 text-xs btn-main cursor-pointer flex items-center gap-1.5 font-medium"
              >
                <Check className="w-4 h-4" />
                <span>Apply & Save Crop</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
