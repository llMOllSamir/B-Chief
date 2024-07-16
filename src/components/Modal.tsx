import React, { useEffect } from 'react'
import { createPortal } from 'react-dom';
import { IoMdClose } from "react-icons/io";




type Props = {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}
export default function Modal({ isOpen, onClose, children }: Props) {


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        }
        return () => { document.body.style.overflow = "visible" }
    }, [isOpen])

    if (!isOpen) return null;

    return createPortal(
        <section className=" fixed inset-0  bg-gray-600 bg-opacity-70  z-40  flex justify-center items-center " onClick={onClose}>
            <div className="w-11/12 md:w-3/4 lg:w-2/4 aspect-video  relative shadow-sky-800  shadow-2xl " onClick={(e) => e.stopPropagation()}>
                <button className="size-10 bg-white bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 flex justify-center items-center rounded-full absolute end-0 top-0 " onClick={onClose}>
                    <IoMdClose size={"1.5rem"} />
                </button>
                {children}
            </div>
        </section>,
        document.getElementById('modal') as HTMLDivElement
    );
}
