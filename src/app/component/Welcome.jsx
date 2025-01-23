import Link from "next/link";

export default function Welcome() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      {/* Container */}
      <div className="max-w-3xl text-center space-y-6">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#007BFF]">
          Welcome to KEWL<span className="text-4xl">.com</span>!
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400">
          Discover amazing deals and exclusive products. Start shopping now!
        </p>

        {/* Call-to-action Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            href="/products"
            className="px-6 py-3 bg-[#00D1FF] text-black font-semibold rounded-md hover:bg-[#00A8CC] transition"
          >
            Shop Now
          </Link>
          <button className="px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-md hover:bg-[#E65A29] transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
