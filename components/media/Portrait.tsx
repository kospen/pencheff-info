import Image from "next/image";

/**
 * Portrait in a 4:5 frame with the Cyan Editorial geometry:
 * a pastel cyan field behind the top-left corner and a thin cyan rule on the right.
 */
export function Portrait({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  geometry = true,
  className = "",
  objectPosition = "50% 30%",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  geometry?: boolean;
  className?: string;
  objectPosition?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {geometry && (
        <>
          <span aria-hidden className="absolute -top-6 -left-6 h-[60%] w-[58%] bg-pastel md:-top-11 md:-left-11" />
          <span aria-hidden className="absolute top-[45%] -right-4 h-[38%] w-px bg-cyan md:-right-6" />
        </>
      )}
      <div className="relative aspect-[4/5] overflow-hidden border border-line bg-frame">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          quality={85}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      </div>
    </div>
  );
}
