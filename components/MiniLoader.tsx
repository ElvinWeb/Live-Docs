import Image from "next/image";

export default function MiniLoader() {
  return (
    <div className="loader">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={15}
        height={15}
        className="animate-spin"
      />
    </div>
  );
}
