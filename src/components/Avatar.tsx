import Image from "next/image";
import { BsPersonFill } from "react-icons/bs";

interface AvatarProps {
    image?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({image}) => {
  return (
    image ? (
            <div className="border w-fit rounded-full text-white">
                <Image
                    src={image}
                    alt="avatar"
                    width={24}
                    height={24}
                    className="rounded-full"
                />
            </div>
        ) : (
            <div className="bg-slate-900  w-fit  rounded-full p-1 text-white"><BsPersonFill /></div>
        )
  )
}

export default Avatar
