import Image from "next/image";

function Loader() {
  return (
    <div className="loader">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={50}
        height={50}
        className="animate-spin"
      />
    </div>
  );
}

export default Loader;
