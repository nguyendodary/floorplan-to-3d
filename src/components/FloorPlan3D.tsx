interface FloorPlan3DProps {
  imageUrl: string;
}

export const FloorPlan3D = ({ imageUrl }: FloorPlan3DProps) => {
  return (
    <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="grid grid-cols-2 gap-0">
        <div className="border-r border-gray-700">
          <p className="text-xs text-gray-400 p-2 text-center bg-gray-800">Original</p>
          <img src={imageUrl} alt="Original" className="w-full h-auto" />
        </div>
        <div>
          <p className="text-xs text-indigo-400 p-2 text-center bg-indigo-900/50">3D Render</p>
          <img
            src={imageUrl}
            alt="3D"
            className="w-full h-auto"
            style={{
              filter: 'contrast(1.4) saturate(0.5) brightness(1.2) sepia(0.3) hue-rotate(-10deg)',
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-2 left-2 px-2 py-1 bg-indigo-600 rounded text-xs text-white font-bold">
        3D
      </div>
    </div>
  );
};
