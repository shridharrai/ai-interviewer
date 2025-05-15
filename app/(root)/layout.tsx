import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
       <div className="flex w-screen bg-[#230839]">
          <img
            src="https://clarissa-ams-bucket.s3.ap-southeast-2.amazonaws.com/funlogos/floatingghostleft.png"
            width={200}
            height={80}
          />
        </div>
      {/* <nav>
       
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-primary-100">InterviewIQ</h2>
        </Link>
      </nav> */}

      {children}
    </div>
  );
};
export default RootLayout;
