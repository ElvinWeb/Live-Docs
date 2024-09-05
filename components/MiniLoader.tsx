import Image from "next/image";

export default function MiniLoader() {
  return (
    <div className="loader">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={10}
        height={10}
        className="animate-spin"
      />
      Loading...
    </div>
  );
}
