
export default function BreathingVisualizer() {
    return (
        <div className="flex flex-col items-center justify-center mt-6">
            {/* Circle */}
            <div className="h-32 w-32 rounded-full bg-blue-300 animate-pulse"></div>


            {/* Text (optional, synced by animation-duration) */}
            <p className="mt-4 text-lg font-medium text-gray-700">Breathe...</p>
        </div>
    );
}



