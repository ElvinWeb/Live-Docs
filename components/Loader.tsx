import Image from "next/image";

function Loader() {
  return (
    <div className="loader text-2xl">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={55}
        height={55}
        className="animate-spin"
      />
      Loading...
    </div>
  );
}

export default Loader;
